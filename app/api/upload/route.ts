// app/api/upload/route.ts
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  if (!filename) {
    return NextResponse.json(
      { message: "No filename provided." },
      { status: 400 }
    );
  }
  if (!request.body) {
    return NextResponse.json(
      { message: "No file body found." },
      { status: 400 }
    );
  }

  const bodyAsBlob = await request.blob();

  const blob = await put(filename, bodyAsBlob, {
    access: "public",
    addRandomSuffix: true,
  });

  return NextResponse.json(blob);
}
