import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop(); // or use url.searchParams if you use query

  if (!id) {
    return NextResponse.json({ error: "Missing ID" }, { status: 400 });
  }

  try {
    const { title, content } = await req.json();

    if (!title || !content) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const updatedArticle = await prisma.article.update({
      where: { id },
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

/* -------- DELETE /api/articles/[id] -------- */
export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json({ error: "Missing ID" }, { status: 400 });
  }

  try {
    await prisma.article.delete({
      where: { id },
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
