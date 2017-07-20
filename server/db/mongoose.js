// var mongoose = require('mongoose');

// mongoose.Promise = global.Promise;  //tell mongoose which promise library to use
// mongoose.connect(process.env.MONGODB_URI, {
//     useMongoClient: true
// },(err,db) => {
//     console.log(db)
//     if(err){
//         return console.log("Could not connect to db.")
//    }
//     return console.log("Connected to db.")
// });

// module.exports = {
//     mongoose,
// }
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;  //tell mongoose which promise library to use
mongoose.connect(process.env.MONGODB_URI, {useMongoClient:true}, (err,db)=>{
    if(err) {
        return console.log(err)
    }
    return console.log("Connected to db")
});

module.exports = {
    mongoose,
}