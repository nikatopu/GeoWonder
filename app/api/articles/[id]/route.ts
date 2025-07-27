// app/api/articles/[id]/route.ts
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params; // Destructure params inside the function

  try {
    const { title, content } = await req.json();

    if (!title || !content) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const updatedArticle = await prisma.article.update({
      where: { id: id }, // Use the destructured id
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

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params; // Destructure params inside the function

  try {
    await prisma.article.delete({
      where: { id: id }, // Use the destructured id
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
