import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

export const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract Bearer token

    if (!token) {
      return res.status(403).json({ message: "Please Login" });
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET); // Ensure correct env variable

    req.user = await User.findById(decodedData.id); // Fix `_id` issue

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "You are not an admin" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
