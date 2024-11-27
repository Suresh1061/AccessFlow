import { connectDB } from "@/db";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
     await connectDB();

     try {
          const { id } = params;
          const { name, email, role, status, permissions }: UserData = await request.json();

          // Update the user
          const user = await User.findByIdAndUpdate(
               id,
               { name, email, role, status, permissions },
               { new: true } // Return the updated document
          );

          if (!user) {
               return NextResponse.json({ success: false, message: `User with ID ${id} not found` }, { status: 404 });
          }

          return NextResponse.json({ success: true, message: "User updated successfully", data: user }, { status: 200 });
     } catch (error) {
          console.error("Error updating user: ", error);
          return NextResponse.json({ success: false, message: "Error updating user" }, { status: 500 });
     }
}