"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signUpSchema } from "@/schemas/signup.schema"
import { useRouter } from "next/navigation"
import axios from 'axios'
import Link from "next/link"

// ✅ Define full validation schema
// const formSchema = z.object({
//   name: z.string().min(2, { message: "Name must be at least 2 characters." }),
//   email: z.string().email({ message: "Enter a valid email." }),
//   password: z.string().min(6, { message: "Password must be at least 6 characters." }),
//   phone: z.string().min(10, { message: "Enter a valid phone number." }),
//   address: z.string().min(3, { message: "Address must be at least 3 characters." }),
//   role: z.enum(["Admin", "Employee", "Worker"], { message: "Please select a role." }),
//   profileImage: z.any().optional(), // file upload is optional
// })

type ProfileFormValues = z.infer<typeof signUpSchema>

function SignUpForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      role: "Employee", // default role
      profileImage: undefined,
    },
  })

  const router = useRouter();

  const onSubmit = async (data: ProfileFormValues) => {
    console.log("Form Data:", data)
    console.log("name", data.name);
    console.log("email", data.email);
    console.log("password", data.password);
    console.log("address", data.address);
    console.log("phone", data.phone);
    console.log("role", data.role);
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("address", data.address);
      formData.append("phone", data.phone);
      formData.append("role", data.role);

      // If you have file upload in your form
      if (data.profileImage instanceof File) {
        formData.append("profileImage", data.profileImage);
      }
      const res = await axios.post("/api/user/sign-up", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Signup success:", res.data);

      if (res.data?.success) {
        router.push(`/`);
      }
    } catch (error: unknown) {
      if (error instanceof Error)
        console.error("Signup error:", error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 border-2 p-6 rounded-lg w-[90%] md:w-[35%] "
      >
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormDescription>Your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="9876543210" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Address */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="123, Green Street" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Role Select */}
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>Choose a role</SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Employee">Employee</SelectItem>
                    <SelectItem value="Worker">Worker</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* File Upload */}
        <div>
          <Label htmlFor="file">Upload Profile Image</Label>
          <Controller
            name="profileImage"
            control={form.control}
            render={({ field }) => (
              <Input
                type="file"
                id="file"
                accept="image/*"
                onChange={(e) => field.onChange(e.target.files?.[0])}
              />
            )}
          />
        </div>

        {/* Submit */}
        <Button type="submit" className="w-full">
          Submit
        </Button>
         <p>Already have an account?<Link href="/sign-in"> <span className="text-blue-500">Login</span></Link></p>
      </form>
    </Form>
  )
}

export default SignUpForm
