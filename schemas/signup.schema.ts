import { z } from 'zod';

export const signUpSchema = z.object({
    name: z.string()
        .min(3, { message: "Name must be at least 3 characters long" })
        .regex(/^[A-Za-z\s]+$/, { message: "Name must contain only letters" }),
    email: z.string()
        .email({ message: "Invalid email address" }),
    password: z.string()
        .min(8, { message: "Password must be at least 8 character long" })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/, { message: "password must contain at least one capital letter , on small letter and one number and a a special character" }),
    //comfirm password
    address: z.string(),
    phone: z.string()
        .max(10, { message: "phone number must be 10 digits" }),
    role: z.enum(["employee", "worker"]),
    profileImage: z
        .instanceof(File, { message: "Profile image is required" })
        .refine((file) => file.size > 0, "File cannot be empty")
        .refine(
            (file) => ["image/jpeg", "image/png"].includes(file.type),
            "Only JPG or PNG images are allowed"
        ),
})