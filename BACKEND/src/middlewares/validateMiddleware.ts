import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError, success } from "zod";


export const validate = (schema : ZodSchema) => async(  
     req : Request,
     res : Response,
     next : NextFunction,
) => {
     try {
         req.body = await schema.parseAsync(req.body);
           
         next();
          
     } catch (error) {
        if(error instanceof ZodError){
             return res.status(400).json({
                 success : false,
                 errors : error.issues,

             });
        }
        next(error);
         
     }
};