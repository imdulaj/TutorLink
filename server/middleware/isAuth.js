import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

// Middleware to check if user is authenticated
export const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(403).json({ message: "Please login first." });
    }

    // Verify the token
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from DB
    const user = await User.findById(decodedData.id);

    if (!user) {
      return res.status(401).json({ message: "User not found. Please register." });
    }

    // Attach user to request object
    req.user = user;

    console.log("Authenticated User:", user.email, "| Role:", user.role); // Debugging log

    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

// Middleware to check if user is an admin
export const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access Denied! Admins only." });
  }

  console.log("Admin Access Granted:", req.user.email);
  next();
};
