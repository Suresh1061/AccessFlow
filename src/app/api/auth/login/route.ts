import { connectDB } from "@/db"
import User from "@/models/user"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
     connectDB()
     try {
          const {email, password} = await request.json()

          if(!email || !password) {
               return NextResponse.json({success: false, message: "All fields are required"}, {status: 400})
          }

          const user = await User.findOne({email})

          if(!user) {
               return NextResponse.json({success: false, message: "User not found"}, {status: 404})
          }

          const isMatch = await bcrypt.compare(password, user.password)

          if(!isMatch) {
               return NextResponse.json({success: false, message: "Incorrect password"}, {status: 401})
          }

          return NextResponse.json({success: true, message: "User logged in successfully", data: user})
     } catch (error) {
          console.log("Error logged in user: ", error);
          return NextResponse.json({success: false, message: "Error logged in user"}, {status: 500})
     }
}