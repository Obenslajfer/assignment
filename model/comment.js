const mongoose = require("mongoose");


const schemaComment = new mongoose.Schema(
    {
        text: {type:String, required:true, minlength:5},
        date: { type: Date,  default: Date.now },
        author: {type:String, required:true}
    }
)

const Comment = mongoose.model("Comment", schemaComment);

module.exports = Comment;
