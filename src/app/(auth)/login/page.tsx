'use client';

import React, { useState, useTransition } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import InputField from '@/components/input-field';
import { useRouter } from 'next/navigation';
import { LoginSchema } from '@/schemas';
import FormError from '@/components/form-error';
import FormSuccess from '@/components/form-success';
import * as z from "zod";
import axios, { AxiosError } from 'axios';
import { generateToken } from '@/app/lib';
import Link from 'next/link';



const Login = () => {
     const [status, setStatus] = useState<{ error?: string; success?: string }>({});
     const [isPending, startTransition] = useTransition()
     const router = useRouter()

     const form = useForm<z.infer<typeof LoginSchema>>({
          resolver: zodResolver(LoginSchema),
          defaultValues: {
               email: "",
               password: "",
          }
     });

     const submitForm = async (data: z.infer<typeof LoginSchema>) => {
          startTransition(async () => {
               try {
                    const { data: res } = await axios.post<ApiResponse>("/api/auth/login", data)
                    if (res.success) {
                         setStatus({ success: res.message })
                         await generateToken(res.data)
                         if (res.data.type === "admin") {
                              router.push("/admin-dashboard/users")
                         } else {
                              router.push("/dashboard")
                         }
                    } else {
                         setStatus({ error: res.message })
                    }
               } catch (error) {
                    const axiosError = error as AxiosError<ApiResponse>;
                    setStatus({ error: axiosError.response?.data?.message || "Error while registering. Please try again later." });
               }
          })
     };

     return (
          <Card className="w-full max-w-md mx-auto shadow-lg">
               <CardHeader className='text-center'>
                    <CardTitle className="text-3xl font-bold flex justify-center items-center">Login</CardTitle>
               </CardHeader>
               <CardContent>
                    <Form {...form}>
                         <form onSubmit={form.handleSubmit(submitForm)} className='space-y-5'>
                              <InputField
                                   name='email'
                                   label='Email'
                                   placeholder='Your email address'
                                   control={form.control}
                              />
                              <InputField
                                   name='password'
                                   type='password'
                                   label='Password'
                                   placeholder='Enter password'
                                   control={form.control}
                              />
                              {status.error && <FormError message={status.error} />}
                              {status.success && <FormSuccess message={status.success} />}
                              <Button disabled={isPending} type='submit' className='w-full'>
                                   {isPending ? "Logging in..." : "Login"}
                              </Button>
                         </form>
                    </Form>
               </CardContent>
               <CardFooter className='w-full justify-center text-muted-foreground text-sm'>
                         Don&apos;t have an account?
                         <Link href="/register" className="text-primary pl-2">register</Link>
                    </CardFooter>
          </Card>
     );
};

export default Login;
