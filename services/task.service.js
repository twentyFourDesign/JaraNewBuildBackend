const Task = require("../models/task.schema");

const createTask = async (taskData) => {
  const task = new Task(taskData);
  await task.save();
  return task;
};

const getTasks = async () => {
  return await Task.find();
};

const updateTask = async (taskId, taskData) => {
  return await Task.findByIdAndUpdate(taskId, taskData, { new: true });
};

const deleteTask = async (taskId) => {
  return await Task.findByIdAndDelete(taskId);
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
