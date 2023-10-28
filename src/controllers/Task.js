const Task = require("../../starter/models/Task");
const asyncWrapper = require("../middleware/async");
const {createCustomError} = require('../errors/custom-error');

const getAllTaks = asyncWrapper(async (_req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    console.log('func ');
    return next(createCustomError(`No task with id : ${taskID}`,404));
  }
  res.status(200).json({ task });
});

const createTask = asyncWrapper(async (req, res) => {
  const newTask = await Task.create(req.body);
  res.status(201).json({ newTask });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`,404));
  }
  res.status(200).json({ task: null, status: "sucess" });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findByIdAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`,404));
  }
  res.status(200).json({ task });
});

const editTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findByIdAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
    overwrite: true,
  });
  if (!task) {
    return res.status(404).json({ msg: `No task with id: ${taskID}` });
  }
  res.status(200).json({ task });
});

module.exports = {
  getAllTaks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  editTask,
};
