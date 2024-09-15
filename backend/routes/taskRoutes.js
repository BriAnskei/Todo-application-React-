import express from "express";
import auth from "../middleware/auth.js";
import {
  addTask,
  getTask,
  editTask,
  dropTask,
  toggleTask,
} from "../controller/taskController.js";

const taskRouter = express.Router();

taskRouter.post("/addtask", auth, addTask);
taskRouter.post("/edittask", auth, editTask);
taskRouter.post("/drop", auth, dropTask);
taskRouter.post("/toggle", auth, toggleTask);

taskRouter.post("/gettask", auth, getTask); // get method to get all tasks

export default taskRouter;
