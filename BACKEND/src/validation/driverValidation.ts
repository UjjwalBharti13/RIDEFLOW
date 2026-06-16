import { z } from "zod";

export const createDriverSchema = z.object({
     first_name : z.string().min(1),
     last_name : z.string().min(1),
     profile_image_url : z.string().url(),
     car_image_url : z.string().url(),
     car_seats : z.number().int().min(1).max(10),
     car_name : z.string().optional(),
     car_number : z.string().min(3),
     car_model : z.string().min(1),
     music_system_available : z.boolean().optional(),
     ac_availbale : z.boolean().optional(),
     pet_friendly : z.boolean().optional(),
     rating : z.number().min(0).max(5).optional,

});
