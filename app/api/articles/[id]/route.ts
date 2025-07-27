import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

type RouteContext = {
  params: {
    id: string;
  };
};

export async function PUT(req: NextRequest, { params }: RouteContext) {
  try {
    const { title, content } = await req.json();

    if (!title || !content) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // The logic inside the function remains the same.
    const updatedArticle = await prisma.article.update({
      where: { id: params.id },
      data: { title, content },
    });

    return NextResponse.json(updatedArticle);
  } catch (error) {
    console.error("PUT Error:", error);
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
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
