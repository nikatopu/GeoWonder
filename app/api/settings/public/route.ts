import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const settings = await prisma.settings.findUnique({
      where: { id: 1 },
    });
    if (!settings) {
      return NextResponse.json(
        { error: "Settings not found." },
        { status: 404 }
      );
    }
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
