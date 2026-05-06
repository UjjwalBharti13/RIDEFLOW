
import { Response, Request, NextFunction } from "express";
import { clerkClient } from "@clerk/clerk-sdk-node";

export interface AuthRequest extends Request {
     userId?: string;
     clerkId?: string;
}

export const authenticate = async(
     req : AuthRequest,
     res : Response,
     next : NextFunction,

) => {
     const token = req.headers.authorization?.split(" ")[1];

      if(!token){
         return res.status(401).json({
             success : false,
             message : "Unauthorised",
         });
      }
      try {
        const payload = await clerkClient.verifyToken(token);
        req.clerkId = payload.sub;
        next(); 
      } catch (error) {
        
        return res.status(401).json({
             success : false,
             message : "invalid token",
        });
      }
};
