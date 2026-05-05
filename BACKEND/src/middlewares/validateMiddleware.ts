import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const validateRequest = (
     req : Request,
     res : Response,
     next : NextFunction,
) => {
     const error = validationResult(req);
     if(!error.isEmpty()){
         return res.status(400).json({
             success : false,
                message : "Validation Error",
                errors : error.array(),
         });
     }
     next();
}