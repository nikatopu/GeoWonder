import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// This route should be protected by your admin middleware
export async function POST(req: NextRequest) {
  try {
    const { orderedIds } = await req.json();

    if (!Array.isArray(orderedIds)) {
      return NextResponse.json(
        { error: "Invalid data format" },
        { status: 400 }
      );
    }

    // Use a Prisma transaction to update all positions in one go
    const updatePromises = orderedIds.map((id, index) =>
      prisma.tour.update({
        where: { id: id },
        data: { position: index }, // The index in the array becomes the new position
      })
    );

    await prisma.$transaction(updatePromises);

    return NextResponse.json({ message: "Tour order updated successfully" });
  } catch (error) {
    console.error("Reorder Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
