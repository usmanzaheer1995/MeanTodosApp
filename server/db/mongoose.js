var mongoose = require("mongoose");

mongoose.Promise = global.Promise; //tell mongoose which promise library to use
mongoose.connect(
  process.env.MONGODB_URI,
  { useMongoClient: true },
  (err, db) => {
    if (err) {
      return console.log(err);
    }
    return console.log("Connected to db");
  }
);

module.exports = {
  mongoose
};
