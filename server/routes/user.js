// routes/user.js
import express from "express";
import { register, loginUser, myProfile, getProfile, updateProfile, deleteProfile, uploadProfilePicture } from "../controllers/user.js";
import { isAuth } from "../middleware/isAuth.js";
import { uploadFiles } from "../middleware/multer.js"; // ✅ import multer config

const router = express.Router();

// User Registration Route
router.post("/user/register", register);

// User Login Route
router.post("/user/login", loginUser);

// Get User Profile (Protected Route)
router.get("/user/me", isAuth, myProfile);

// Get User Profile
router.get("/profile", isAuth, getProfile);

// Update User Profile (Protected)
router.put("/profile", isAuth, updateProfile);

// Delete Profile
router.delete("/profile", isAuth, deleteProfile);

// Upload Profile Picture
router.post("/profile/upload", isAuth, uploadFiles, uploadProfilePicture); // ✅ use imported multer

export default router;
