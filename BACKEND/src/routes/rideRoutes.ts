import express from "express";
const router = express.Router();

import {
     createRide,
     getRidesByUserId,
     getRideById,
     updateRide,
     deleteRide,
     updateRideStatus,
     verifyRideOTP, 

} from "../controllers/ridecontroller.js";
import { authenticate } from "../middlewares/authMiddleware.js";


// CREATE RIDE
router.post("/", createRide);       

// GET RIDE BY USER CLERK_
router.get("/user/:userId", getRidesByUserId);

// GET RIDE BY ID
router.get("/:id", getRideById);

// UPDATE RIDE
router.put("/:id", updateRide);         
// DELETE RIDE
router.delete("/:id", deleteRide);


router.patch("/:id/status", authenticate, updateRideStatus);

router.post("/verify-otp", authenticate, verifyRideOTP);


export default router;

 

