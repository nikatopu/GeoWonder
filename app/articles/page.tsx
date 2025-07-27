// app/blog/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { TArticle } from "@/lib/types";

export const metadata: Metadata = {
  title: "Our Blog",
  description:
    "Articles and guides about traveling in Georgia, from local culture to hidden gems.",
};

// Revalidate this page every hour
export const revalidate = 3600;

export default async function BlogPage() {
  const articles: TArticle[] = await prisma.article.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <h1>GeoWonder Blog</h1>
      <p>Tips, stories, and guides to help you plan your Georgian adventure.</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {articles.map((article) => (
          <div key={article.id}>
            <h2>
              <Link href={`/articles/${article.slug}`}>{article.title}</Link>
            </h2>
            {/* We could add a short description/excerpt field to the model later */}
            <p>{article.content.substring(0, 150)}...</p>
            <Link href={`/articles/${article.slug}`}>Read more →</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
