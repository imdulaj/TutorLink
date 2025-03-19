import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import TryCatch from "../middleware/TryCatch.js";

export const register = TryCatch(async (req, res) => {
  const { email, name, password, registrationNumber, contactNumber, stream } = req.body;

  let user = await User.findOne({ email });
  if (user)
    return res.status(400).json({
      message: "User already exists",
    });

  const hashPassword = await bcrypt.hash(password, 10);

  user = await User.create({
    name,
    email,
    password: hashPassword,
    registrationNumber,
    contactNumber,
    stream,
  });

  res.status(201).json({
    message: "User registered successfully",
    user,
  });
});

export const loginUser = TryCatch(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user)
    return res.status(400).json({
      message: "No user found with this email",
    });

  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword)
    return res.status(400).json({
      message: "Wrong password",
    });

  const token = jwt.sign({ _id: user._id }, process.env.Jwt_Sec, {
    expiresIn: "15d",
  });

  res.json({
    message: `Welcome back ${user.name}`,
    token,
    user,
  });
});

export const myProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);

  res.json({ user });
});
