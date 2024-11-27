'use client';

import React, { useState, useTransition } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useForm } from "react-hook-form";
import { Button } from '@/components/ui/button';
import InputField from '@/components/input-field';
import { useRouter } from 'next/navigation';
import FormError from '@/components/form-error';
import FormSuccess from '@/components/form-success';
import { registerSchema } from '@/schemas';
import * as z from "zod";
import Link from 'next/link';
import axios, { AxiosError } from 'axios';
import { generateToken } from '@/app/lib';

const Register = () => {
     const [status, setStatus] = useState<{ error?: string; success?: string }>({});
     const [isPending, startTransition] = useTransition()
     const router = useRouter();

     const form = useForm<z.infer<typeof registerSchema>>({
          resolver: zodResolver(registerSchema),
          defaultValues: {
               name: "",
               email: "",
               password: "",
          },
     });

     const submitForm = (data: z.infer<typeof registerSchema>) => {
          startTransition(async() => {
               try {
                    const {data: res} = await axios.post<ApiResponse>("/api/auth/register", data)
                    if(res.success) {
                         setStatus({success: res.message})
                         await generateToken(res.data)
                         if (res.data.type === "admin") {
                              router.push("/admin-dashboard/users")
                         } else {
                              router.push("/dashboard")
                         }
                    } else {
                         setStatus({error: res.message})
                    }
               } catch (error) {
                    const axiosError = error as AxiosError<ApiResponse>;
                    setStatus({ error: axiosError.response?.data?.message || "Error while registering. Please try again later." });
               }
          })
     }

          return (
               <Card className="w-full max-w-md mx-auto shadow-lg">
                    <CardHeader className='text-center'>
                         <CardTitle className="text-3xl font-bold flex justify-center items-center">Register</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <Form {...form}>
                              <form onSubmit={form.handleSubmit(submitForm)} className="space-y-3">
                                   <InputField
                                        name="name"
                                        label="Full Name"
                                        placeholder="Enter your full name"
                                        control={form.control}
                                   />
                                   <InputField
                                        name="email"
                                        label="Email"
                                        placeholder="Enter your email address"
                                        control={form.control}
                                   />
                                   <InputField
                                        name="password"
                                        type="password"
                                        label="Password"
                                        placeholder="Enter password"
                                        control={form.control}
                                   />
                                   {status.error && <FormError message={status.error} />}
                                   {status.success && <FormSuccess message={status.success} />}
                                   <Button disabled={isPending} type="submit" className="w-full">
                                        {isPending ? "Registering..." : "Register"}
                                   </Button>
                              </form>
                         </Form>
                    </CardContent>
                    <CardFooter className='w-full justify-center text-muted-foreground text-sm'>
                         Already have an account?
                         <Link href="/login" className="text-primary pl-2">Login</Link>
                    </CardFooter>
               </Card>
          );
     };

     export default Register;
