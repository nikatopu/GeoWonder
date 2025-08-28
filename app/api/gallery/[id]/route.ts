import prisma from "@/lib/prisma";
import { del } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    // Step 1: Find the image record in the database to get its URL.
    const imageToDelete = await prisma.galleryImage.findUnique({
      where: { id },
    });

    if (!imageToDelete) {
      return NextResponse.json({ message: "Image not found" }, { status: 404 });
    }

    // Step 2: Delete the file from Vercel Blob storage.
    await del(imageToDelete.url);

    // Step 3: Delete the image record from the database.
    await prisma.galleryImage.delete({ where: { id } });

    // Step 4: Return a success response.
    return new NextResponse(null, { status: 204 }); // 204 No Content
  } catch (error) {
    console.error("DELETE Gallery Image Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
