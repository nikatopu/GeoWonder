import prisma from "@/lib/prisma";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";

type ArticlePageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// Create a single, server-side instance of the sanitizer
const window = new JSDOM("").window;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DOMPurify = createDOMPurify(window as any);

export async function generateStaticParams() {
  const articles = await prisma.article.findMany({ select: { slug: true } });
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
  });

  if (!article) {
    return { title: "Article Not Found" };
  }

  const description = article.content
    .replace(/<[^>]*>?/gm, "")
    .substring(0, 160);

  return {
    title: article.title,
    description: description.trim() + "...",
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
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
