import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod/v3";
import {  validationResult } from "express-validator";
import { success } from "zod";

export const validate = (schema : AnyZodObject) => async(  
     req : Request,
     res : Response,
     next : NextFunction,
) => {
    try {
        await schema.parseAsync(req.body);
        next();
    } catch (error) {
        if (error instanceof ZodError){
             return res.status(400).json({
                 success : false,
                 errors : error.errors
             });
        } 
        next(error);
    }
     
};
