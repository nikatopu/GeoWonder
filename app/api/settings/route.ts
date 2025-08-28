// app/api/settings/route.ts
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// This route should be protected by your admin middleware
export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const updatedSettings = await prisma.settings.update({
      where: { id: 1 },
      data: {
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone,
        instagramUrl: data.instagramUrl,
        facebookUrl: data.facebookUrl,
        tiktokUrl: data.tiktokUrl,
      },
    });
    return NextResponse.json(updatedSettings);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
