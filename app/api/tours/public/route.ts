import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tours = await prisma.tour.findMany({
      orderBy: {
        position: "asc",
      },
      include: {
        galleryImages: true,
      },
    });
    return NextResponse.json(tours);
  } catch (error) {
    console.error("Failed to fetch tours:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
