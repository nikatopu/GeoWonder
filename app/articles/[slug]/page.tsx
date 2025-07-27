import prisma from "@/lib/prisma";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import createDOMPurify from "dompurify";
import {JSDOM} from "jsdom";

// This is the most robust way to type page props in a dynamic route.
// It explicitly defines the shape Next.js expects.
type ArticlePageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// Create a single, server-side instance of the sanitizer
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window as any);

// Generate static pages for all articles at build time. This part is correct.
export async function generateStaticParams() {
  const articles = await prisma.article.findMany({ select: { slug: true } });
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// Generate dynamic metadata for SEO using the robust props type.
export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
  });

  if (!article) {
    return { title: "Article Not Found" };
  }

  // Create a clean description for metadata by stripping HTML tags
  const description = article.content
    .replace(/<[^>]*>?/gm, "")
    .substring(0, 160);

  return {
    title: article.title,
    description: description.trim() + "...",
  };
}

// The actual article page component, also using the robust props type.
export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
  });

  if (!article) {
    notFound();
  }

  // Sanitize the HTML content before rendering it. This is a crucial security step.
  const sanitizedContent = DOMPurify.sanitize(article.content);

  return (
    <article className="prose">
      {/* 
        This renders the HTML string directly from your database.
        It uses the sanitized version for security.
      */}
      <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
    </article>
  );
}
