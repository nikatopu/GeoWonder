import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { del } from "@vercel/blob";

// GET a single tour for the edit page
export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  try {
    const tour = await prisma.tour.findUnique({
      where: { id: id },
      include: { galleryImages: true },
    });
    if (!tour) {
      return NextResponse.json({ error: "Tour not found" }, { status: 404 });
    }
    return NextResponse.json(tour);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params;
  try {
    // First, find the tour to get the URLs of all images to be deleted
    const tourToDelete = await prisma.tour.findUnique({
      where: { id },
      include: { galleryImages: true },
    });

    if (!tourToDelete) {
      return NextResponse.json({ error: "Tour not found" }, { status: 404 });
    }

    // Create an array of all image URLs (feature image + gallery images)
    const imageUrls = [
      tourToDelete.featureImageUrl,
      ...tourToDelete.galleryImages.map((img) => img.url),
    ];

    // Delete the images from Vercel Blob storage
    if (imageUrls.length > 0) {
      await del(imageUrls);
    }

    // Then, delete the tour record from the database.
    // The `onDelete: Cascade` in your schema will handle deleting the TourImage records.
    await prisma.tour.delete({ where: { id } });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// PUT (Update) a tour. This is the most complex one.
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  try {
    // Note: For simplicity, this example assumes text data is updated.
    // A full implementation would handle new image uploads, and deleting old ones.
    const { title, shortDescription, longDescription } = await req.json();

    const updatedTour = await prisma.tour.update({
      where: { id: id },
      data: {
        title,
        shortDescription,
        longDescription,
      },
    });

    return NextResponse.json(updatedTour);
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
