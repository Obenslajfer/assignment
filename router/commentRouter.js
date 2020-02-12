const express = require("express");
const Comment = require("../model/comment")

const router = express.Router();


router.post("/createcomment", async (req, res)=>
{

    //req.body.allanameproperties
const comment = new Comment({
        text: req.body.text,
        author:req.body.author
    })
 await comment.save( (error, success)=>{
     if(error) {
         console.log(error);
   res.send("Du har för få ord i din TASK")
     }
   else
   res.redirect("/comment")

 });
})

const items = 3;
router.get("/comment", async (req, res) => {
// const sorted = req.query.sort
// .find().sort({author:sorted}); detta ska sättas efter rad 47
const page = req.query.page;
const comments = await Comment
.find()
.skip((page-1)*items)
.limit(items)

 res.render("comment", {comments});

})

router.get("/delete/:id", async (req, res)=>{
    console.log(req.params.id);
    await Comment.deleteOne({_id:req.params.id});
    //res.send("It works");
    res.redirect("/comment")
})
//fråga varför har vi inte använt post request för delete?

// router
router.get("/update/:id",async (req, res)=>{
  //vill hämta bara en data från databas
  const response = await Comment.findById({_id:req.params.id});
  console.log(response)
  //sen skicka den till edit sidan
  res.render("edit", {response})
})

router.post("/update/:id", async (req, res)=>{
//använd updateOne metoden för att kunna redigera comment
  await Comment.updateOne({_id:req.body._id},
  {$set: {text: req.body.text, author:req.body.author}}, {runValidators:true})
  res.redirect("/comment");


 })


module.exports = router;
