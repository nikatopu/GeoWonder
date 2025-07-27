// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

export async function middleware(req: NextRequest) {
  const session = req.cookies.get("session")?.value;

  // If no session token, redirect to login
  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Verify the token
  try {
    await jwtVerify(session, secret);
    // If token is valid, continue to the requested page
    return NextResponse.next();
  } catch (error) {
    // If token is invalid, redirect to login
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// Specify which paths the middleware should apply to
export const config = {
  matcher: "/admin/:path*",
};
