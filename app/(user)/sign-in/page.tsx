"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"


import { useRouter } from "next/navigation"
import axios from 'axios'
import { signInSchema } from "@/schemas/signin.schema"



type ProfileFormValues = z.infer<typeof signInSchema>

function SignInForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      
      email: "",
      password: "",
    
    },
  })

  const router = useRouter();

  const onSubmit = async (data: ProfileFormValues) => {
    console.log("Form Data:", data)
    
    console.log("email", data.email);
    console.log("password", data.password);
   
    try {
    
      const res = await axios.post('/api/user/sign-in', {
        email: data.email,
        password: data.password
      });;

      console.log("Signup success:", res.data);

      if (res.data?.success) {
        await router.push(`/`);
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
        className="space-y-6 border-2 p-6 rounded-lg w-[90%] md:w-[40%] mx-auto"
      >
       

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

        

        {/* Submit */}
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  )
}

export default SignInForm
