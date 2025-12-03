import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl.clone();
  const sessionCookie = req.cookies.get("partnerNetSession");
  const signinFlowCookie = req.cookies.get("signinFlow");
  const path = url.pathname;

  // Public routes that anyone can access
  const publicRoutes = [
    "/partner-net", 
    // "/partner-net/signin",
    "/partner-net/set-password",
    "/partner-net/compare-password"
  ];

  // Protected routes that need final session
  const protectedRoutes = [
    "/partner-net/videos",
    // "/partner-net/dashboard",
    // ... other protected routes
  ];

  // Password pages logic
  if (path === "/partner-net/set-password" || path === "/partner-net/compare-password") {
    // Allow access if:
    // 1. User has signinFlow cookie (coming from signin) OR
    // 2. User doesn't have final session yet
    
    if (sessionCookie && !signinFlowCookie) {
      // User already has session and not in signin flow, redirect to videos
      return NextResponse.redirect(new URL("/partner-net/videos", req.url));
    }
    
    if (!signinFlowCookie) {
      // No signin flow cookie, redirect to signin
      return NextResponse.redirect(new URL("/partner-net", req.url));
    }
    
    // All good, allow access to password page
    return NextResponse.next();
  }

  // Protected routes logic
  if (protectedRoutes.includes(path) && !sessionCookie) {
    return NextResponse.redirect(new URL("/partner-net", req.url));
  }

  // Public routes - always allow
  if (publicRoutes.includes(path)) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/partner-net/:path*"],
};