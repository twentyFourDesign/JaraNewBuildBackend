const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  tasks: [
    {
      title: {
        type: String,
        required: true,
      },
    },
  ],
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
