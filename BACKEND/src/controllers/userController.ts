import { Request, Response } from "express";
import User from "../models/user.js";
import { count } from "node:console";
import user from "../models/user.js";

// CREATE USER

export const createUser = async (
    req : Request, 
    res : Response,
): Promise<Response> => {
     
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


export const getAllUsers = async (
     req : Request,
     res : Response,
): Promise<Response> => {
     
    try {
         const users = await User.find();
            
            return res.status(200).json({
                success : true,
                count : users.length,
                message : "Users retrieved successfully",
                users,
            });

    } catch (error) {
        console.log("Get Users Error:", error);
         
         return res.status(500).json({
             success : false,
             message : "Internal Server Error",
         });
    }
};

// GET SINGLE USER 

 export const getUserById = async(
     req : Request,
     res : Response,
 ): Promise<Response> => {
     try { 
          const user = await User.findById(req.params.id);
            
          if(!user){
             return res.status(404).json({
                 success : false,
                 message : "User not found",

             });
          } 

          return res.status(200).json({
             success : true,
             message : "User fetched successfully",
             user,
          });
         
     } catch (error) {
           console.log("Get User By ID Error:", error);
            
            return res.status(500).json({
                 success : false,
                 message : "Internal Server Error",
            });
     }
 };

 // UPDATE USER

 export const updateUser = async(
     req : Request,
     res : Response,
 ): Promise<Response> =>{
     try {
          
         const updateUser = await User.findByIdAndUpdate(
             req.params.id,
             req.body,
              {
                new : true,
              }
         );
         if(!updateUser){
             return res.status(404).json({
                 success : false,
                 message : "User not found",
             });
         }
         return res.status(200).json({
             success : true,
             message : "User updated successfully",
             updateUser,
         });
     } catch (error) {
         console.log("Update User Error:", error);
          
          return res.status(500).json({
             success : false,
             message : "Internal Server Error",
          });
        
     }
 };
 
 // DELETE USER

 export const deleteUser = async(
    req : Request,
    res : Response,
 ): Promise<Response> => {
     try {
         const user = await User.findByIdAndDelete(req.params.id);

         if(!user){
             return res.status(404).json({
                 success : false,
                 message : "User not found",
             });
         }
         return res.status(200).json({
             success : true,
                message : "User deleted successfully",
         });

     } catch (error) {
          console.log("Delete User Error:", error);

           return res.status(500).json({
             success : false,
                message : "Internal Server Error",
           });
     }
 };
 