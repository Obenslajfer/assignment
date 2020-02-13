const express = require("express");
const mongoose = require("mongoose");
const taskRouter = require("./router/taskRouter");
const config = require("./config/config");
const sassMiddleware = require("node-sass-middleware");
const path = require("path");
const app = express();


app.use(express.urlencoded({
  extended: true
}))

//Enabling Scss
app.use(sassMiddleware({
  src: path.join(__dirname, "scss"),
  dest: path.join(__dirname, "public")
}))

//find my static css file "public"
app.use(express.static(path.join(__dirname, "public")));

//declaing the ejs views
app.set("view engine", "ejs");

app.use(taskRouter);

//listening to chosen port
const port = process.env.PORT || 3045;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true
}

// Connecting to my specific MongoDBm and hiding the databaseURL in another file.
mongoose.connect(config.databaseURL, options).then(() => {
  console.log("Successful")
  app.listen(port);
})
