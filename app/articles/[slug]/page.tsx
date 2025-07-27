import prisma from "@/lib/prisma";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import { TArticle } from "@/lib/types";

const window = new JSDOM("").window;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DOMPurify = createDOMPurify(window as any);

export async function generateStaticParams() {
  const articles: { slug: string }[] = await prisma.article.findMany({
    select: { slug: true },
  });

  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await prisma.article.findUnique({
    where: { slug },
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

/* -------- Article Page Component -------- */
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const article = await prisma.article.findUnique({
    where: { slug },
  });

  if (!article) {
    notFound();
  }

  const sanitizedContent = DOMPurify.sanitize(article.content);

  return (
    <article>
      <h1>{article.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
    </article>
  );
}
