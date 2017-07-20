var mongoose = require('mongoose');

//model of Todo with properties.
var Todo = mongoose.model('Todo', {
   text: {
    type: String,
    required:true,
    minlength: 1,
    trim: true,
   } ,
   completed: {
    type: Boolean,
    default: false,
   },

   completedAt: {
    type: Number,
    default: null,
   },
   _creator: {
       required: true,
       type: mongoose.Schema.Types.ObjectId,
   }
});

// var newTodo = new Todo({
//     text: "  Go to Gym   "
// });

// //save this to the database
// newTodo.save().then((doc) => {
//     console.log('Saved Todo', doc);
// }, (err) => {
//     console.log('Unable to save Todo ', err);
// });

module.exports = {Todo};