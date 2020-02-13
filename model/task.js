const mongoose = require("mongoose");


const schemaTask = new mongoose.Schema(
    {
        text: {type:String, required:true, minlength:5},
        date: { type: Date,  default: Date.now },
        author: {type:String, required:true}
    }
)

const Task = mongoose.model("Task", schemaTask);

module.exports = Task;
