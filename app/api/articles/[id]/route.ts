// app/api/articles/[id]/route.ts
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

type RouteContext = {
  params: {
    id: string;
  };
};

// PUT - Update article
export async function PUT(req: NextRequest, { params }: RouteContext) {
  try {
    const { title, content } = await req.json();
    if (!title || !content) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const updatedArticle = await prisma.article.update({
      where: { id: params.id },
      data: { title, content }, // Slug is not updated on edit to preserve links
    });

    return NextResponse.json(updatedArticle);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// DELETE - Delete article
export async function DELETE(req: NextRequest, { params }: RouteContext) {
  try {
    await prisma.article.delete({
      where: { id: params.id },
    });
    return new NextResponse(null, { status: 204 }); // 204 No Content
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
