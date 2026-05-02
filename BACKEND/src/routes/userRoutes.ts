import express from "express";
const router = express.Router();
import { createUser } from "../controllers/userController.js";


// @desc    Create new user
// @route   POST /api/users
// @access  Public

router.post("/", createUser);

export default router;
