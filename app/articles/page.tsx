// app/blog/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import prisma from "@/lib/prisma";
import type { Article } from "@prisma/client";

export const metadata: Metadata = {
  title: "Our Blog",
  description:
    "Articles and guides about traveling in Georgia, from local culture to hidden gems.",
};

// Revalidate this page every hour
export const revalidate = 3600;

export default async function BlogPage() {
  const articles: Article[] = await prisma.article.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <h1>GeoWonder Blog</h1>
      <p>Tips, stories, and guides to help you plan your Georgian adventure.</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {articles.map((article) => {
          const plainTextContent = article.content.replace(/<[^>]*>?/gm, "");
          const excerpt = plainTextContent.substring(0, 150) + "...";

          return (
            <div key={article.id}>
              <h2>
                <Link href={`/articles/${article.slug}`}>{article.title}</Link>
              </h2>
              {/* 3. Render the clean excerpt. */}
              <p>{excerpt}</p>
              <Link href={`/articles/${article.slug}`}>Read more →</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
