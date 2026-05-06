import { Request, Response } from "express";
import Stripe  from "stripe";
import dotenv from "dotenv";
import { success } from "zod";

dotenv.config();


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const createPaymentIntent = async (
     req : Request,
     res : Response,
) => {
     try {
         const { amount, currency = "usd", rideId } = req.body();
         const paymentIntent = await stripe.paymentIntents.create({
             amount : Math.round(amount * 100), // cent
             currency,
             metadata : { rideId }, 
         });
         return res.status(200).json({
             success : true,
             message : "Payment Successfull",
             clientSecret : paymentIntent.client_secret,

         });
     } catch (error) {
        
        return res.status(500).json({
             success : false,
             message : " Internal Server Error ",
        });
     }
};
