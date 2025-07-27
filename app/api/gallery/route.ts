// app/api/gallery/route.ts
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { url, altText } = await req.json();
    if (!url || !altText) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const image = await prisma.galleryImage.create({
      data: { url, altText },
    });

    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
