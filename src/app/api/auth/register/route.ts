import { connectDB } from "@/db";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
     await connectDB(); 

     try {
          const { name, email, password } = await request.json();

          // Check if the user already exists
          const existUser = await User.findOne({ email });

          if (existUser) {
               return NextResponse.json(
                    { success: false, message: "User already exists" },
                    { status: 400 }
               );
          }

          // Hash the password
          const hashedPassword = await bcrypt.hash(password, 10);

          // Create a new user with default values for status, type, permissions, and role
          const user = await User.create({
               name,
               email,
               password: hashedPassword,
               status: "active",
               type: "user",
               role: null,
               permissions: {
                    create: false,
                    read: false,
                    edit: false,
                    remove: false,
               },
          });

          return NextResponse.json({
               success: true,
               message: "User registered successfully",
               data: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    type: user.type,
                    status: user.status,
                    role: user.role,
                    permissions: user.permissions,
               },
          });
     } catch (error) {
          console.error("Error creating user:", error);
          return NextResponse.json(
               { success: false, message: "Error creating user" },
               { status: 500 }
          );
     }
}
