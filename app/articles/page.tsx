import type { Metadata } from "next";
import Link from "next/link";
import { getArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Our Blog",
  description:
    "Articles and guides about traveling in Georgia, from local culture to hidden gems.",
};

export default function BlogPage() {
  const articles = getArticles();

  return (
    <div>
      <h1>GeoWonder Blog</h1>
      <p>Tips, stories, and guides to help you plan your Georgian adventure.</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {articles.map((article) => (
          <div key={article.slug}>
            <h2>
              <Link href={`/articles/${article.slug}`}>{article.title}</Link>
            </h2>
            <p>{article.description}</p>
            <Link href={`/articles/${article.slug}`}>Read more →</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
