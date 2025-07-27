import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

type Params = {
  params: {
    id: string;
  };
};

// PUT - Update article
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const { title, content } = await req.json();
    if (!title || !content) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const updatedArticle = await prisma.article.update({
      where: { id: params.id },
      data: { title, content },
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
export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    await prisma.article.delete({
      where: { id: params.id },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
