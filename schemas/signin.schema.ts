import { z} from 'zod';

export const signInSchema = z.object({
    email: z.string()
        .email({ message: "Invalid email address" }),
    password: z.string()
        .min(8, { message: "Password must be at least 8 character long" })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/, { message: "password must contain at least one capital letter , on small letter and one number and a a special character" }),
})

export type signinInput = z.infer<typeof signInSchema >