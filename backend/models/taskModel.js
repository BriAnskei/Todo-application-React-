import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  userId: { type: String, requeried: true, ref: "User" },
  name: { type: String, requeried: true },
  level: { type: String, requeried: true },
  time: { type: String, requeried: true },
  description: { type: String, requeried: true },
  status: { type: Boolean, default: false },
});

const Task = mongoose.model.task || mongoose.model("Task", taskSchema);

export default Task;
