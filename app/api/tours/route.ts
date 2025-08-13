import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Use a Prisma transaction to create the Tour and its related images in one go
    const newTour = await prisma.tour.create({
      data: {
        title: data.title,
        shortDescription: data.shortDescription,
        longDescription: data.longDescription,
        featureImageUrl: data.featureImageUrl,
        galleryImages: {
          createMany: {
            data: data.galleryImages, // Expects an array of { url, title, description }
          },
        },
      },
      include: {
        galleryImages: true, // Include the created images in the response
      },
    });

    return NextResponse.json(newTour, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
