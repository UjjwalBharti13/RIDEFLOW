import { Request, Response } from "express";
import Stripe from "stripe";
import Ride from "../models/ride.js";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const stripeWebhook = async (
  req: Request,
  res: Response
) => {
  const sig = req.headers["stripe-signature"] as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Webhook Error",
    });
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;

    const rideId = paymentIntent.metadata.rideId;

    await Ride.findByIdAndUpdate(rideId, {
      payment_status: "completed",
    });
  }

  res.json({
    received: true,
  });
};