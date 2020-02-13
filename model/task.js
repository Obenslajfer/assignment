const mongoose = require("mongoose");


const schemaTask = new mongoose.Schema(
    {
        todo: {type:String, required:true, minlength:2},
        date: { type: Date,  default:Date.now },
        priority: {type:String, required:true}
    }
)

const Task = mongoose.model("Task", schemaTask);

module.exports = Task;
