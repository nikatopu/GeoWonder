import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma"; // Import your Prisma client instance

const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: "Username and password are required" },
        { status: 400 }
      );
    }

    // 1. Find the user in the database
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    // 2. If no user is found, return the same generic error
    //    This prevents attackers from guessing which usernames exist.
    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // 3. Compare the provided password with the stored hash
    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);

    // 4. If the password matches, create the session token
    if (isPasswordCorrect) {
      const token = await new SignJWT({})
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("2h") // Token expires in 2 hours
        .setSubject(user.username) // Use username from the database
        .sign(secret);

      (await cookies()).set("session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 2, // 2 hours
        path: "/",
      });

      return NextResponse.json({ message: "Login successful" });
    }

    // If password does not match, return the same generic error
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "An internal server error occurred" },
      { status: 500 }
    );
  }
}
