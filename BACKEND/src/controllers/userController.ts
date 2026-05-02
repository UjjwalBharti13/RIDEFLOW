import { Request, Response } from "express";
import User from "../models/user.js";

// CREATE USER

export const createUser = async (req : Request, res : Response) => {
     
    try {
        const {name, email, clerkId } = req.body;
          
        if(!name || !email || !clerkId){
             return res.status(400).json({
                 message : "All fields are required",
             });

        }
        const existingUser = await User.findOne({ email });
         if(existingUser){
             return res.status(200).json({
                 existingUser
             });
         }
         const newUser = await User.create({
             name,
             email,
            clerkId,
            });
            return res.status(201).json({
                success  : true,
                message : "User created successfully",
                 newUser
            })
    } catch (error) {
         
         console.error("Error creating user:", error);
            return res.status(500).json({
                 message : "Internal Server Error",

            });

    }
};

// GET ALL USERS


export const getAllUsers = 