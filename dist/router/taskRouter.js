"use strict";

var express = require("express");
var Task = require("../model/task");

var router = express.Router();

// Setting up a task following the rules applied.
router.post("/createtask", async function (req, res) {
  var task = new Task({
    todo: req.body.todo,
    priority: req.body.priority
  });
  await task.save(function (error, success) {
    if (error) {
      console.log(error);
      res.send("Too few letters");
    } else res.redirect("/task");
  });
});

//redering the tasks shown on the /task page.
var items = 3;
router.get("/task", async function (req, res) {

  var page = req.query.page;
  var tasks = await Task.find().skip((page - 1) * items).limit(items);

  res.render("task", {
    tasks: tasks
  });
});
// setting up a route able to take in the specified id for that task, then deleting it
router.get("/delete/:id", async function (req, res) {
  await Task.deleteOne({
    _id: req.params.id
  });

  res.redirect("/task");
});

// rendering the edit page, to change an exising task
router.get("/update/:id", async function (req, res) {

  var response = await Task.findById({
    _id: req.params.id
  });

  res.render("edit", { response: response });
});

// setting up a route able to take in the specified id for that task, then updating it
router.post("/update/:id", async function (req, res) {

  await Task.updateOne({ _id: req.body._id }, {
    $set: {
      todo: req.body.todo,
      priority: req.body.priority
    }
  }, {
    runValidators: true
  });
  res.redirect("/task");
});

module.exports = router;