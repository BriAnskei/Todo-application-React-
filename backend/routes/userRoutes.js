import express from "express";
import { signupUser, loginUser } from "../controller/userController.js";

// Create a new mini-instance of a router. This router can then handle requests separately from the main app.
const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);

export default router;
