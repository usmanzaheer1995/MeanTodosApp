require("./config/config");

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
// const { ObjectID } = require('mongodb');
// const _ = require('lodash');

// var { mongoose } = require('./db/mongoose');
// var { Users } = require('./models/Users');

const { router } = require("./routes/routes");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "./../dist")));

app.use("/routes", router);
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./../dist/index.html"));
});

const port = process.env.PORT || "3000";
app.set("port", port);

const server = http.createServer(app);
server.listen(port, () => {
  console.log(__dirname);
  console.log(`Server listening at port ${port}`);
});
