import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "./lib/getUser";

const protectedRoutes = ["/profile", "/planner", "/uploaded-materials", "/upload"];
const publicRoutes = ["/", "/about", "/contact", "/login", "/register"];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute =
    protectedRoutes.includes(path) || path.startsWith("/summary");
  const isPublicRoute = publicRoutes.includes(path);

  const user = await getAuthUser();
  const userId = user?.userId;

  if (isProtectedRoute && !userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isPublicRoute && userId) {
    return NextResponse.redirect(new URL("/upload", req.nextUrl));
  }

  return NextResponse.next(); // allow request to continue
}
