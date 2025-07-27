import { getArticles, getArticleBySlug } from "@/lib/articles";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown"; // if you're using it

type PageProps = {
  params: {
    slug: string;
  };
};

// This generates a page for each article at build time
export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// SEO metadata for each article
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);

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
export default async function ArticlePage({ params }: PageProps) {
  const article = await getArticleBySlug(params.slug);

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
