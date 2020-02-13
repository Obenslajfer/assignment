const express = require("express");
const Task = require("../model/task")

const router = express.Router();


router.post("/createtask", async (req, res) => {

  const task = new Task({
    todo: req.body.todo,
    priority: req.body.priority
  })
  await task.save((error, success) => {
    if (error) {
      console.log(error);
      res.send("Du har för få ord i din TASK")
    } else
      res.redirect("/task")

  });
})

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

router.get("/delete/:id", async (req, res) => {
  console.log(req.params.id);
  await Task.deleteOne({
    _id: req.params.id
  });

  res.redirect("/task")
})

router.get("/update/:id", async (req, res) => {

  const response = await Task.findById({
    _id: req.params.id
  });
  console.log(response)

  res.render("edit", {
    response
  })
})

router.post("/update/:id", async (req, res) => {

  await Task.updateOne({
    _id: req.body._id
  }, {
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
