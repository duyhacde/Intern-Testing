const mongoose = require("mongoose");

module.exports = mongoose.model("Task", {
    title: { type: String },
    description: { type: String },
    priority: { type: String },
    dueDate: { type: Date },
});
