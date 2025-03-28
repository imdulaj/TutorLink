import express from "express";
import { register, loginUser, myProfile } from "../controllers/user.js";
import { isAuth } from "../middleware/isAuth.js"; 

const router = express.Router();

// User Registration Route
router.post("/user/register", register);

// User Login Route
router.post("/user/login", loginUser);

// Get User Profile (Protected Route)
router.get("/user/me", isAuth, myProfile);

export default router;
