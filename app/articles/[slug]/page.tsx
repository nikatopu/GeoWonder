import prisma from "@/lib/prisma";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import { TArticle } from "@/lib/types";

// Server-only DOMPurify instance
const window = new JSDOM("").window;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DOMPurify = createDOMPurify(window as any);

export async function generateStaticParams() {
  const articles: TArticle[] = await prisma.article.findMany({
    select: { slug: true },
  });

  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
  });

  if (!article) return { title: "Not Found" };

  const description = article.content
    .replace(/<[^>]*>?/gm, "")
    .substring(0, 160)
    .trim();

  return {
    title: article.title,
    description: description + "...",
  };
}

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
  });

  if (!article) {
    notFound();
  }

  const sanitizedContent = DOMPurify.sanitize(article.content);

  return (
    <article className="prose">
      <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
    </article>
  );
}
