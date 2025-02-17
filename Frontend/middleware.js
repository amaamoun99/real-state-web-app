import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(request) {
  // Get the pathname
  const path = request.nextUrl.pathname;

  // Check if the path starts with /superadmin
  if (path.startsWith("/superadmin")) {
    // Get the token from cookies
    const token = request.cookies.get("jwt")?.value;

    if (!token) {
      // Redirect to login if no token
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    try {
      // Decode the token
      const decodedToken = jwtDecode(token);

      // Check if user is superadmin
      if (decodedToken.role !== "superadmin") {
        // Redirect to dashboard if not superadmin
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    } catch (error) {
      // If token is invalid, redirect to login
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: "/superadmin/:path*",
};
