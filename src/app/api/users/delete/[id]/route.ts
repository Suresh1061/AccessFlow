import { connectDB } from "@/db";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: any) {
     await connectDB();
     try {
          const { id } = params;

          await User.findByIdAndDelete(id);

          return NextResponse.json({ success: true, message: "User deleted successfully" });
     } catch (error) {
          console.log("Error deleting user: ", error);
          return NextResponse.json({ success: false, message: "Error deleting user" }, { status: 500 });
     }
}
