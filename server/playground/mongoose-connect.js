//const mongoose = require('mongoose')
require('./../config/config')
const { Users } = require('./../models/Users');
const { Todo } = require('./../models/Todo');
const {mongoose} = require('./../db/mongoose')
let todo = new Todo({
    text: "Walk the dog",
    _creator: "596ca8c71b7fce2438f0acf3"
})
todo.save().then((doc)=>console.log("saved"))

//Users.findOne({email:"ahmad@example.com"}).then(doc=>console.log(doc))