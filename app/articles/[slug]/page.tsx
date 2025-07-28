import prisma from "@/lib/prisma";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import Title from "@/components/atoms/Title";
import Paragraph from "@/components/atoms/Paragraph";
import styles from "./Article.module.scss";

// This setup is for the sanitizer
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

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const article = await prisma.article.findUnique({
    where: { slug },
  });

  if (!article) notFound();

  const sanitizedContent = DOMPurify.sanitize(article.content);

  return (
    <div className={styles.articleContainer}>
      <header className={styles.articleHeader}>
        <Title level={1} className={styles.title}>
          {article.title}
        </Title>
        <Paragraph className={styles.meta}>
          Published on{" "}
          {new Date(article.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Paragraph>
      </header>

      <div
        className={styles.articleContent}
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
    </div>
  );
}
