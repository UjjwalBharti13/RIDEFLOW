import express from "express";
const router = express.Router();
import {
     createUser,
     getAllUsers,
     getUserById,
     updateUser,
     deleteUser,
    } from "../controllers/userController.js";


// CREATE 
router.post("/", createUser);


//READ ALL
router.get("/", getAllUsers);

//READ SINGLE USER
router.get("/:id", getUserById);

// UPDATE USER
router.put("/:id", updateUser);

// DELETE USER
router.delete("/:id", deleteUser);

export default router;

