// app/api/gallery/route.ts
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const IMAGES_PER_PAGE = 12;

// GET handler for fetching paginated images
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page")
    ? parseInt(searchParams.get("page") as string, 10)
    : 1;

  if (isNaN(page) || page < 1) {
    return NextResponse.json({ error: "Invalid page number" }, { status: 400 });
  }

  try {
    const images = await prisma.galleryImage.findMany({
      take: IMAGES_PER_PAGE,
      skip: (page - 1) * IMAGES_PER_PAGE,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// You can keep your POST handler for uploads in the same file
export async function POST(req: NextRequest) {
  try {
    const imagesData = await req.json();
    if (!Array.isArray(imagesData) || imagesData.length === 0) {
      return NextResponse.json(
        { error: "Invalid or empty data provided." },
        { status: 400 }
      );
    }
    const result = await prisma.galleryImage.createMany({
      data: imagesData,
      skipDuplicates: true,
    });
    return NextResponse.json(
      { message: `${result.count} images saved successfully.` },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to save gallery images:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
