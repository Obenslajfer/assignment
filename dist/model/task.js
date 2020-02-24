"use strict";

var mongoose = require("mongoose");

var schemaTask = new mongoose.Schema({
    todo: { type: String, required: true, minlength: 2 },
    date: { type: Date, default: Date.now },
    priority: { type: String, required: true }
});

var Task = mongoose.model("Task", schemaTask);

module.exports = Task;