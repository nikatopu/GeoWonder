import prisma from "@/lib/prisma";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import Image from "next/image";

type Props = {
  params: {
    slug: string;
  };
};

// Generate static pages for all articles at build time
export async function generateStaticParams() {
  const articles = await prisma.article.findMany({ select: { slug: true } });
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
  });

  if (!article) {
    return { title: "Article Not Found" };
  }

  return {
    title: article.title,
    description:
      article.content
        .substring(0, 160)
        .trim()
        .replace(/<[^>]*>?/gm, "") + "...", // Strips HTML for clean description
  };
}

export default async function ArticlePage({ params }: Props) {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
  });

  if (!article) {
    notFound();
  }

  return (
    <article className="prose">
      <h1>{article.title}</h1>
      <p style={{ color: "#666", marginTop: "-1rem", marginBottom: "2rem" }}>
        Published on: {new Date(article.createdAt).toLocaleDateString()}
      </p>

      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          img: (props) => (
            <Image
              src={typeof props.src === "string" ? props.src : ""}
              alt={props.alt || ""}
              width={700}
              height={400}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "auto",
                borderRadius: "8px",
              }}
            />
          ),
          h2: ({ node, ...props }) => (
            <h2 style={{ marginTop: "2.5rem" }} {...props} />
          ),
        }}
      >
        {article.content}
      </ReactMarkdown>
    </article>
  );
}
