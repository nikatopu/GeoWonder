// app/api/articles/route.ts
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { title, slug, content } = await req.json();

    // Basic server-side validation
    if (!title || !slug || !content) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Check if slug is unique
    const existingArticle = await prisma.article.findUnique({
      where: { slug },
    });
    if (existingArticle) {
      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 409 }
      );
    }

    const article = await prisma.article.create({
      data: {
        title,
        slug,
        content,
      },
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error("Failed to create article:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
