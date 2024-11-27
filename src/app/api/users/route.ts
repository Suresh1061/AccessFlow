import { connectDB } from "@/db";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
     await connectDB();

     try {
          const url = new URL(request.url);

          // Get query parameters, defaulting to appropriate values
          const page = Number(url.searchParams.get("page")) || 1;
          const searchValue = url.searchParams.get("search") || "";
          const filterValue = url.searchParams.get("filter") || "all";

          // Pagination settings
          const limit = 10;
          const skip = (page - 1) * limit;

          // Base query for users with a valid role
          const query: Record<string, any> = { role: { $ne: null } };

          // Add search filter if searchValue exists
          if (searchValue) {
               const searchRegex = new RegExp(searchValue, "i"); // 'i' for case-insensitive search
               query.name = { $regex: searchRegex };
          }

          // Add additional filter if filterValue is not "all"
          if (filterValue !== "all") {
               query.$or = [{ status: filterValue }, { role: filterValue }];
          }

          // Fetch filtered/searched users with pagination
          const users = await User.find(query)
               .limit(limit)
               .skip(skip)
               .sort({ updatedAt: -1 }); // Most recently updated or created first

          // Total size and pages for the current filtered/searched query
          const filteredTotalSize = await User.countDocuments(query);
          const filteredTotalPages = Math.ceil(filteredTotalSize / limit);

          // Fixed counts for total users, active users, and inactive users
          const totalSize = await User.countDocuments({ role: { $ne: null } });
          const totalActiveUsers = await User.countDocuments({
               role: { $ne: null },
               status: "active",
          });
          const totalInActiveUsers = await User.countDocuments({
               role: { $ne: null },
               status: "inactive",
          });

          return NextResponse.json(
               {
                    data: users,
                    totalUsers: totalSize,
                    totalActiveUsers,
                    totalInActiveUsers,
                    currentPage: page,
                    totalPages: filteredTotalPages,
                    message: "Users fetched successfully",
                    success: true,
               },
               { status: 200 }
          );
     } catch (error) {
          console.error("Internal server error while getting all users:", error);
          return NextResponse.json(
               { success: false, message: "Internal server error while getting all users" },
               { status: 500 }
          );
     }
}
