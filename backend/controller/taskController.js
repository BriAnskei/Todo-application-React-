import taskModel from "../models/taskModel.js";

const addTask = async (req, res) => {
  try {
    const newTask = new taskModel({
      _id: req.body._id,
      userId: req.body.userId,
      name: req.body.name,
      level: req.body.level,
      time: req.body.time,
      description: req.body.description,
      status: req.body.status,
    });

    await newTask.save();
    res.json({ success: true, message: "Task added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something went wrong" });
  }
};

const editTask = async (req, res) => {
  try {
    const editTask = new taskModel({
      name: req.body.name,
      level: req.body.level,
      time: req.body.time,
      description: req.body.description,
      status: req.body.status,
    });
    await taskModel.findByIdAndUpdate(req.body._id, editTask);
    res.json({ success: true, message: "Task Edited" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const dropTask = async (req, res) => {
  try {
    await taskModel.findByIdAndDelete(req.body._id);
    res.json({ success: true, message: "Task removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const toggleTask = async (req, res) => {
  try {
    await taskModel.findByIdAndUpdate(req.body._id, { status: true });
    res.json({ success: true, message: "Task Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const getTask = async (req, res) => {
  try {
    const tasks = await taskModel.find({ userId: req.body.userId });
    res.json({ success: true, task: tasks });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something went wrong" });
  }
};

export { addTask, getTask, editTask, dropTask, toggleTask };
