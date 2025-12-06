// Middleware disabled - using client-side protected routes instead
// See components/ProtectedRoute.jsx for route protection

import { NextResponse } from "next/server";

export function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
