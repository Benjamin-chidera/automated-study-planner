import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "./lib/getUser";

const protectedRoutes = ["/profile", "/planner", "/uploaded-materials", "/upload"];
// const publicRoutes = ["/", "/about", "/contact", "/login", "/register"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isProtectedRoute =
    protectedRoutes.includes(path) || path.startsWith("/summary");
  const isLoginOrRegister = path === "/login" || path === "/register";

  const user = await getAuthUser();
  const userId = user?.userId;

  // Block access to protected routes if not logged in
  if (isProtectedRoute && !userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // Redirect logged-in users away from login/register pages
  if (isLoginOrRegister && userId) {
    return NextResponse.redirect(new URL("/upload", req.nextUrl));
  }

  return NextResponse.next(); // Allow access
}
