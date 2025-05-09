import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import TryCatch from "../middleware/TryCatch.js";

export const register = async (req, res) => {
  try {
    const { email, name, password, registrationNumber, contactNumber, stream } = req.body;

    // Check for missing fields
    if (!email || !name || !password || !registrationNumber || !contactNumber || !stream) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    user = await User.create({
      name,
      email,
      password: hashedPassword,
      registrationNumber,
      contactNumber,
      stream,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};




export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Ensure role is sent
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role, // ✅ Ensure role is included
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



export const myProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);

  res.json({ user });
});




export const getProfile = async (req, res) => {
  try {
    const userId = req.user._id; // Extract user ID from the token (verified by the isAuth middleware)

    const user = await User.findById(userId).select('-password'); // Fetch the user from the DB
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user); // Send the user data as response
  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};





export const updateProfile = async (req, res) => {
  try {
      const userId = req.user._id;
      const { name, email, contactNumber } = req.body;

      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });

      user.name = name || user.name;
      user.email = email || user.email;
      user.contactNumber = contactNumber || user.contactNumber;

      await user.save();
      res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
      console.error("Update Profile Error:", error);
      res.status(500).json({ message: "Server error", error: error.message });
  }
};





export const deleteProfile = async (req, res) => {
  try {
    const userId = req.user._id; // Get the user ID from the JWT token (provided via middleware)

    // Find and delete the user from the database
    const user = await User.findByIdAndDelete(userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return success message after deletion
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Delete Profile Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const uploadProfilePicture = async (req, res) => {
  try {
    const user = req.user; // comes from isAuth middleware

    console.log("Received file:", req.file); // ✅ debug log

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    user.profilePicture = `/uploads/${req.file.filename}`;
    await user.save();

    res.json({
      name: user.name,
      email: user.email,
      registrationNumber: user.registrationNumber,
      contactNumber: user.contactNumber,
      stream: user.stream,
      profilePicture: user.profilePicture, // <---- make sure this key matches frontend
    });
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    res.status(500).json({ message: "Failed to upload profile picture" });
  }
};
