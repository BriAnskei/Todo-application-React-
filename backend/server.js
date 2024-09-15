import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

import "dotenv/config";

const app = express();
const port = 3000;

app.use(express.json()); // Parse the recieved send data.
app.use(cors());

connectDB();

app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
