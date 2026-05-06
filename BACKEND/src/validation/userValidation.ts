import { email, z }  from "zod";

export const createUserSchema = z.object({
     name : z.string().min(2, "Name must be at least 2 characters long"),
     email : z.string().email(),
     cleakId : z.string().min(1),
    });

export const updateUserSchema = z.object({
     name : z.string().min(2).optional(),
     email : z.string().email().optional(),

});

