import { getArticles, getArticleBySlug } from "@/lib/articles";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

type PageProps = {
  params: {
    slug: string;
  };
};

// This function can remain async because Next.js supports it,
// but the internal call is now synchronous.
export async function generateStaticParams() {
  const articles = getArticles(); // REMOVED await
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// SEO metadata for each article
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const article = getArticleBySlug(params.slug); // REMOVED await

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
    },
  };
}

// The actual article page
export default function ArticlePage({ params }: PageProps) {
  // REMOVED async
  const article = getArticleBySlug(params.slug); // REMOVED await

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
        <ReactMarkdown>{article.content}</ReactMarkdown>
      </div>
    </article>
  );
}
