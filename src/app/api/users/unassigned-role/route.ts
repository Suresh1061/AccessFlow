import { connectDB } from "@/db";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
     await connectDB();
     try {
          const url = new URL(req.url);
          const searchValue = url.searchParams.get("search") || "";

          // Build query object for users with null role and type as "user"
          const query: Record<string, any> = {
               role: null,       // Role must be null
               type: "user",     // Type must be "user"
          };

          // Add search condition if searchValue exists
          if (searchValue) {
               const searchRegex = new RegExp(searchValue, "i"); // 'i' for case-insensitive search
               query.name = { $regex: searchRegex };
          }

          // Fetch users and count total
          const users = await User.find(query);
          const totalUsers = await User.countDocuments(query);

          return NextResponse.json(
               {
                    data: users,
                    totalUsers,
                    message: "Null role users of type 'user' fetched successfully",
                    success: true,
               },
               { status: 200 }
          );
     } catch (error) {
          console.error("Internal server error while getting null role users:", error);
          return NextResponse.json(
               { message: "Internal server error while getting null role users", success: false },
               { status: 500 }
          );
     }
}
