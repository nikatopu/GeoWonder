// app/api/articles/route.ts
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

// POST - Create new article
export async function POST(req: NextRequest) {
  try {
    const { title, content } = await req.json();
    if (!title || !content) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Auto-generate slug
    let slug = slugify(title, { lower: true, strict: true });
    // Ensure slug is unique
    const existing = await prisma.article.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now()}`; // Append timestamp if slug exists
    }

    const article = await prisma.article.create({
      data: { title, content, slug },
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
