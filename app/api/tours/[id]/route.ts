import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { del } from "@vercel/blob";

// GET a single tour for the edit page
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
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
  context: { params: Promise<{ id: string }> }
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

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    const {
      title,
      shortDescription,
      longDescription,
      featureImageUrl,
      galleryImages,
    } = await req.json();

    // Get the current state of the tour from the database
    const currentTour = await prisma.tour.findUnique({
      where: { id },
      include: { galleryImages: true },
    });

    if (!currentTour) {
      return NextResponse.json({ error: "Tour not found" }, { status: 404 });
    }

    // --- Image Cleanup Logic ---
    const existingImageUrls = currentTour.galleryImages.map((img) => img.url);
    const submittedImageUrls = galleryImages.map(
      (img: { url: string }) => img.url
    );
    // Find URLs that are in the database but were NOT submitted in the form (i.e., they were deleted)
    const urlsToDelete = existingImageUrls.filter(
      (url) => !submittedImageUrls.includes(url)
    );
    if (urlsToDelete.length > 0) {
      await del(urlsToDelete);
    }
    // Also delete old feature image if a new one was uploaded
    if (featureImageUrl !== currentTour.featureImageUrl) {
      await del(currentTour.featureImageUrl);
    }

    // --- Database Update Logic using a Transaction ---
    const updatedTour = await prisma.$transaction(async (tx) => {
      // 1. Delete all existing gallery images for this tour.
      // It's simpler to delete and recreate than to figure out which to update/create.
      await tx.tourImage.deleteMany({ where: { tourId: id } });

      // 2. Update the main tour data and recreate the gallery images with the new data.
      return tx.tour.update({
        where: { id },
        data: {
          title,
          shortDescription,
          longDescription,
          featureImageUrl,
          galleryImages: {
            createMany: {
              data: galleryImages.map(
                (img: { url: string; title: string; description: string }) => ({
                  url: img.url,
                  title: img.title,
                  description: img.description,
                })
              ),
            },
          },
        },
        include: { galleryImages: true },
      });
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
