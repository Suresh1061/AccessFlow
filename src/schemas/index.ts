import * as z from "zod"

export const LoginSchema = z.object({
     email: z.string().email({
          message: "Invalid email address"
     }),
     password: z.string().min(6, { message: "password must be at least 6 characters" })
})

export const registerSchema = z.object({
     name: z.string().min(1, "Name is required"),
     email: z.string().email({
          message: "Invalid email address"
     }),
     password: z.string()
          .min(6, { message: "Password must be at least 6 characters" })
          .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
          .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "Password must contain at least one special character" })
          .regex(/\d/, { message: "Password must contain at least one number" }),
});

export const productSchema = z.object({
     id: z.string(),
     _id: z.string(),
     image: z.string().url("Please provide a valid image URL"),
     productName: z.string().min(1, "Product name is required"),
     productDescription: z.string().min(1, "Product description is required"),
     department: z.string().min(1, "Department is required"),
     price: z.string()
          .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
               message: "Enter a valid number greater than 0 for the product price",
          }),
});

export const userFormSchema = z.object({
     name: z.string().min(2, {
          message: "Name must be at least 2 characters.",
     }),
     email: z.string().email({
          message: "Please enter a valid email address.",
     }),
     status: z.enum(['active', 'inactive']),
     role: z.enum(['manager', 'hr', 'developer', 'tester', 'analyst']),
     permissions: z
          .object({
               read: z.boolean(),
               create: z.boolean(),
               edit: z.boolean(),
               remove: z.boolean(),
          })
          .refine(
               (permissions) =>
                    Object.values(permissions).some((value) => value),
               { message: "At least one permission must be selected." }
          ),
});
