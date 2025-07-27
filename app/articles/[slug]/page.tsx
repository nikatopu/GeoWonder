import { getArticles, getArticleBySlug } from "@/lib/articles";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

// This generates a page for each article at build time
export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// This generates the metadata for each article page (great for SEO)
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: article.title,
    description: article.description,
    // You can add more specific OpenGraph data here
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
    },
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);

  // If no article is found for the slug, show a 404 page
  if (!article) {
    notFound();
  }

  return (
    <article>
      <h1>{article.title}</h1>
      <p>
        <em>{article.description}</em>
      </p>
      <hr style={{ margin: "2rem 0" }} />
      <div>
        {/* In a real app, you would use a library like 'react-markdown' to render this */}
        {article.content}
      </div>
    </article>
  );
}
