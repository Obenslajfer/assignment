const express = require("express");
const Task = require("../model/task")

const router = express.Router();



router.get("/", (req, res) => {
  res.redirect("/createtask")
})
// Setting up a task following the rules applied.
router.post("/createtask", async (req, res) => {
  const task = new Task({
    todo: req.body.todo,
    priority: req.body.priority
  })
  await task.save((error, success) => {
    if (error) {
      console.log(error);
      res.send("Too few letters")
    }
    else
      res.redirect("/task")
  });
})

//redering the tasks shown on the /task page.
const items = 3;
router.get("/task", async (req, res) => {

  const page = req.query.page;
  const tasks = await Task
    .find()
    .skip((page - 1) * items)
    .limit(items)

  res.render("task", {
    tasks
  });

})
// setting up a route able to take in the specified id for that task, then deleting it
router.get("/delete/:id", async (req, res) => {
  await Task.deleteOne({
    _id: req.params.id
  });

  res.redirect("/task")
})

// rendering the edit page, to change an exising task
router.get("/update/:id", async (req, res) => {

  const response = await Task.findById({
    _id: req.params.id
  });

  res.render("edit", {response})
})

// setting up a route able to take in the specified id for that task, then updating it
router.post("/update/:id", async (req, res) => {

  await Task.updateOne({_id: req.body._id}, {
    $set: {
      todo: req.body.todo,
      priority: req.body.priority
    }
  }, {
    runValidators: true
  })
  res.redirect("/task");


})

module.exports = router;
