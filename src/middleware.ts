import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getSession } from "@/app/lib";

// Define route groups
const publicPaths = ["/login", "/register"];
const adminPaths = ["/admin-dashboard, /admin-dashboard/users"];
const userPaths = ["/dashboard", "/status"];

// Helper function to determine type-based access
function getRedirectPath(type: string): string | null {
     if (type === "admin") return "/admin-dashboard/users";
     if (type === "user") return "/dashboard";
     return null;
}

export async function middleware(request: NextRequest) {
     const path = request.nextUrl.pathname;

     try {
          const session = await getSession();

          const isPublic = publicPaths.includes(path);
          const isAdminRoute = adminPaths.includes(path);
          const isUserRoute = userPaths.includes(path);

          // Handle unauthenticated users
          if (!isPublic && !session) {
               return NextResponse.redirect(new URL("/login", request.nextUrl));
          }

          // Handle authenticated users trying to access public routes
          if (isPublic && session) {
               const redirectPath = getRedirectPath(session?.user.type);
               if (redirectPath) {
                    return NextResponse.redirect(new URL(redirectPath, request.nextUrl));
               }
          }

          // Role-based route access
          if (session) {
               if (isAdminRoute && session?.user.type !== "admin") {
                    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
               }
               if (isUserRoute && session?.user.type !== "user") {
                    return NextResponse.redirect(new URL("/admin-dashboard/users", request.nextUrl));
               }
          }

          // Handle root route `/`
          if (path === "/") {
               if (session) {
                    const redirectPath = getRedirectPath(session?.user.type);
                    if (redirectPath) {
                         return NextResponse.redirect(new URL(redirectPath, request.nextUrl));
                    }
               } else {
                    return NextResponse.redirect(new URL("/login", request.nextUrl));
               }
          }

          // Allow access to the requested path
          return NextResponse.next();
     } catch (error) {
          console.error("Error in middleware:", error);
          return NextResponse.redirect(new URL("/login", request.nextUrl));
     }
}

// Matcher configuration with wildcards
export const config = {
     matcher: [
          "/",
          "/login",
          "/register",
          "/admin-dashboard",
          "/admin-dashboard/users",
          "/dashboard",
          "/status"
     ],
};
