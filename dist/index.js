"use strict";

var express = require("express");
var mongoose = require("mongoose");
var taskRouter = require("./router/taskRouter");
var config = require("./config/config");
var sassMiddleware = require("node-sass-middleware");
var path = require("path");
var app = express();

app.use(express.urlencoded({
  extended: true
}));

//Enabling Scss
app.use(sassMiddleware({
  src: path.join(__dirname, "scss"),
  dest: path.join(__dirname, "public")
}));

//find my static css file "public"
app.use(express.static(path.join(__dirname, "public")));

//declaing the ejs views
app.set("view engine", "ejs");

app.use(taskRouter);

//listening to chosen port
var port = process.env.PORT || 3045;
var options = {
  useUnifiedTopology: true,
  useNewUrlParser: true

  // Connecting to my specific MongoDBm and hiding the databaseURL in another file.
};mongoose.connect(config.databaseURL, options).then(function () {
  console.log("Successful");
  app.listen(port);
});