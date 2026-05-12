import corn from "node-cron";
import Ride from "../models/ride.js";

export const startScheduleRidesJob = () => {
      corn.schedule("* * * * *" , async() => { // every minute
         const now = new Date();

         const ridesToActivate = await Ride.find({
             is_schedule_ride : true,
             schedule_at : { $lte : now},
             ride_status : "pending",

         });

         for(const ride of ridesToActivate){
             ride.is_schedule_ride = false;
             // optionally notify driver user

             await ride.save();
             console.log(`Ride ${ride._id} activated from schedule`);
         }
      });
    };
    