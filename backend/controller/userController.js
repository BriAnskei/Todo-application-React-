import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const createTokin = (id) => {
  console.log(jwt.sign({ id }, process.env.JWT_SECRET));
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

export const signupUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    } else if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email" });
    } else if (password.length < 6) {
      return res.json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    } else {
      const exits = await userModel.findOne({ email });
      if (exits) {
        return res.json({ success: false, message: "User already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = userModel({
        name: name,
        email: email,
        password: hashedPassword,
      });

      const user = await newUser.save();

      const token = createTokin(user._id);
      res.json({ success: true, token });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Something went wrong" });
  }
};

export const loginUser = async (req, res) => {
  const { password, email } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = createTokin(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Something went wrong" });
  }
};
