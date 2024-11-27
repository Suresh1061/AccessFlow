'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import InputField from './input-field';
import SelectField from './select-field';
import { userFormSchema } from '@/schemas';
import PermissionFields from './premission-fields';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

interface UserFormProps {
     user: UserData;
     onUpdate: () => void
     onClose: () => void
}

const UserForm = ({ user, onUpdate, onClose }: UserFormProps) => {
     const [isSubmitting, setIsSubmitting] = useState(false);

     const form = useForm<z.infer<typeof userFormSchema>>({
          resolver: zodResolver(userFormSchema),
          defaultValues: {
               name: user?.name,
               email: user?.email,
               status: user?.status,
               role: user?.role ?? undefined,
               permissions: user?.permissions
          },
     });


     const handleSubmit = async (values: z.infer<typeof userFormSchema>) => {
          try {
               setIsSubmitting(true)
               const { data: res } = await axios.post<ApiResponse>(`/api/users/update-user/${user._id}`, values)
               if (res.success) {
                    toast.success(res.message)
                    onUpdate()
               }
          } catch (error) {
               const axiosError = error as AxiosError<ApiResponse>;
               toast.error(
                    axiosError.response?.data?.message || "Error while deleting user. Please try again later."
               );
          } finally {
               setIsSubmitting(false)
               onClose()
          }
     };

     return (
          <Form {...form}>
               <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
                    <InputField
                         name="name"
                         label="Full Name"
                         control={form.control}
                    />
                    <InputField
                         name="email"
                         label="Email"
                         control={form.control}
                    />
                    <SelectField
                         name="status"
                         label="Status"
                         control={form.control}
                         placeholder="Select user status"
                         selectOptions={['active', 'inactive']}
                    />
                    <SelectField
                         name="role"
                         label="Role"
                         control={form.control}
                         placeholder="Select user role"
                         selectOptions={['manager', 'hr', 'developer', 'tester', 'analyst']}
                    />
                    <PermissionFields
                         name="permissions"
                         control={form.control}
                    />
                    <Button type="submit" disabled={isSubmitting}>
                         {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </Button>
               </form>
          </Form>
     );
};

export default UserForm;
