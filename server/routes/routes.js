//require('./../config/config');

const express = require("express");
const router = express.Router();
const mongojs = require("mongojs");
const { ObjectID } = require("mongodb");
const _ = require("lodash");
var { URL } = require("url");

var { mongoose } = require("./../db/mongoose");
var { Users } = require("./../models/Users");
var { Todo } = require("./../models/Todo");
var { authenticate } = require("./../middleware/authenticate");

var db = mongojs(process.env.MONGODB_URI, ["todos"]);

router.get("/", (req, res) => {
  res.send("api works");
});

router.post("/findusers", async (request, response) => {
  try {
    const body = _.pick(request.body, ["email"]);
    let user;
    //console.log(body)
    user = await Users.findOne({ email: body.email });
    if (user) {
      console.log("Found, Sending error");
      response.status(400).send(user);
    } else {
      //console.log("Not found.")
      response.status(200).send();
    }
  } catch (error) {
    response.send("Server Not found.");
  }
});

//User login
router.post("/users/login", async (request, response) => {
  try {
    const body = _.pick(request.body.user, ["email", "password"]);
    const user = await Users.findByCredentials(body.email, body.password);
    let token = await user.generateAuthToken();
    response.header("x-auth", token).send(user);
  } catch (error) {
    console.log("error", error);
    response.status(400).send();
  }
});

//User Signup
router.post("/users", async (request, response) => {
  try {
    let body = _.pick(request.body, ["email", "password"]);
    let user = new Users(body);
    //console.log(user)
    //does not return a value so we do not store it
    await user.save();
    let token = user.generateAuthToken();

    //x- generates a custom header
    response.header("x-auth", token).send(user);
  } catch (error) {
    console.log("user not saved");
    response.status(400).send(error);
  }
});

router.post("/todos", authenticate, async (request, response) => {
  let body = _.pick(request.body, ["email", "_id"]);

  try {
    let todos = await Todo.find({ _creator: body._id });
    response.send(todos);
  } catch (err) {
    if (err) {
      response.status(400).send(err);
    }
  }
  // Todo.find({
  //     _creator: body._id
  // }).then((todos) => {
  //     response.send({ todos })
  // }, (err) => {
  //     if (err) {
  //         response.status(400).send(err);
  //     }
  // });
});

//Get Single Todos
router.get("/todos/:id", (req, res) => {
  db.todos.findOne(
    {
      _id: mongojs.ObjectId(req.params.id)
    },
    (err, todo) => {
      if (err) {
        res.send(err);
      } else {
        res.json(todo);
      }
    }
  );
});

//Save Todo
// router.post('/todos', (req, res, next) => {
//     let todo = req.body
//     if (!todo.text) {
//         res.status(400)
//         res.json({ "error": "Invalid Data" })
//     }
//     else {
//         db.todos.save(todo, (err, result) => {
//             if (err) { res.send(err) }
//             else {
//                 res.json(result)
//             }
//         })
//     }
// })
router.post("/savetodos", authenticate, (request, response) => {
  //let url_string = request.headers.referer    //to get the complete url
  //console.log(request.headers)
  let body = _.pick(request.body.user, ["_id"]);
  // var url = new URL(url_string);
  // let body = { _id: url.searchParams.get('_id'), email: url.searchParams.get('email') }
  //console.log(body);
  var todo = new Todo({
    text: request.body.newTodo.text,
    _creator: body._id
  });
  //console.log(todo)
  todo.save().then(
    doc => {
      response.send(doc);
    },
    err => {
      console.log(err);
      response.status(400).send(err);
    }
  );
});

router.post("/updatetodos/:id", authenticate, (request, response) => {
  //console.log("HERE")
  let id = request.params.id;
  //to specify which properties the user can update in the model
  var body = _.pick(request.body, [
    "text",
    "completed",
    "_creator",
    "completed"
  ]);

  //console.log(body)
  if (!ObjectID.isValid(id)) {
    return response.status(404).send();
  }
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = "false";
    body.completedAt = null;
  }

  Todo.findOneAndUpdate(
    { _id: id, _creator: body._creator },
    { $set: body },
    { new: true }
  )
    .then(todo => {
      if (!todo) {
        return response.status(404).send();
      }
      //console.log(todo)
      response.send(todo);
    })
    .catch(err => {
      response.status(400).send(err);
    });
});

//Delete Todo
// router.delete('/todo/:id', (req, res, next) => {
//     db.todos.remove({
//         _id: mongojs.ObjectId(req.params.id),
//     }, '', (err, result) => {
//         if (err) { res.send(err) }
//         else {
//             res.json(result)
//         }
//     })
// })
router.post("/deletetodos/:id", authenticate, (request, response) => {
  var id = request.params.id;

  let creatorId = request.body.user._id;

  if (!ObjectID.isValid(id)) {
    return response.status(404).send();
  }

  // let url_string = request.headers.referer    //to get the complete url
  // var url = new URL(url_string);
  // let creatorId = url.searchParams.get('_id')

  try {
    const todo = Todo.findOneAndRemove({
      _id: id,
      _creator: creatorId
    }).then(todo => {
      if (!todo) {
        return response.status(404).send();
      }
      response.send(todo);
    });
  } catch (error) {
    response.status(404).send();
  }
});

// router.delete('/todos/:id'/*, authenticate*/, async (request, response) => {
//     var id = request.params.id;
//     if (!ObjectID.isValid(id)) {
//         return response.status(404).send();
//     }

//     let url_string = request.headers.referer    //to get the complete url
//     var url = new URL(url_string);
//     let creatorId = url.searchParams.get('_id')

//     try {
//         const todo = Todo.findOneAndRemove({
//             _id: id,
//             _creator: creatorId,
//         })
//         if (!todo) {
//             return response.status(404).send();
//         }
//         response.send( todo );
//     } catch (error) {
//         response.status(404).send();
//     }
// })

//delete token on signuout
router.post("/users/delete/token", authenticate, async (request, response) => {
  // console.log(request.user)
  try {
    //we do not get a value back; as async await returns a promise
    await request.user.removeToken(request.token);
    response.status(200).send();
  } catch (error) {
    response.status(400).send();
  }
});

module.exports = {
  router
};
