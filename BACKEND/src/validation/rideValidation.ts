import { z } from "zod";
import mongoose  from "mongoose";

export const createRideSchema = z.object({
     user_id : z.string().refine((id) => mongoose.Types.ObjectId.isValid(id),{
         message : "Invaid User Id",
     }),
     driver_id : z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
         message : "Invalis Driver Id",
     }),
     origin_address : z.string().min(1),
     destination_address : z.string().min(1),
     origin_latitude : z.number(),
     origin_longitude : z.number(),
     destination_latitude : z.number(),
     destination_longitude : z.number(),
     fare_price : z.number().positive(),
     distance : z.number().positive(),
     estimated_arrival_time : z.number().int().positive(),
     otp : z.string().length(6).optional(),
     schedule_at : z.string().datetime().optional(),
     payment_status : z
         .enum(["pending", "completed" , "failed"])
         .default("pending"),
     ride_status : z
         .enum(["pending", "accepted", "ongoing", "completed", "cancelled"])
         .default("pending"),    
});


