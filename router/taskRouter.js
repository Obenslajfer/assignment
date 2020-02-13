const express = require("express");
const Task = require("../model/task")

const router = express.Router();


router.post("/createtask", async (req, res)=>
{

    //req.body.allanameproperties
const task = new Task({
        text: req.body.text,
        author:req.body.author
    })
 await task.save( (error, success)=>{
     if(error) {
         console.log(error);
   res.send("Du har för få ord i din TASK")
     }
   else
   res.redirect("/task")

 });
})

const items = 3;
router.get("/task", async (req, res) => {
// const sorted = req.query.sort
// .find().sort({author:sorted}); detta ska sättas efter rad 47
const page = req.query.page;
const tasks = await Task
.find()
.skip((page-1)*items)
.limit(items)

 res.render("task", {tasks});

})

router.get("/delete/:id", async (req, res)=>{
    console.log(req.params.id);
    await Task.deleteOne({_id:req.params.id});
    //res.send("It works");
    res.redirect("/task")
})
//fråga varför har vi inte använt post request för delete?

// router
router.get("/update/:id",async (req, res)=>{
  //vill hämta bara en data från databas
  const response = await Task.findById({_id:req.params.id});
  console.log(response)
  //sen skicka den till edit sidan
  res.render("edit", {response})
})

router.post("/update/:id", async (req, res)=>{
//använd updateOne metoden för att kunna redigera task
  await Task.updateOne({_id:req.body._id},
  {$set: {text: req.body.text, author:req.body.author}}, {runValidators:true})
  res.redirect("/task");


 })


module.exports = router;
