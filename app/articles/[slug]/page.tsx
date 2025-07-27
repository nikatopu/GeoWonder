// app/blog/[slug]/page.tsx
import prisma from "@/lib/prisma";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import Image from "next/image"; // For optimized images in markdown

// Generate static pages for all articles at build time
export async function generateStaticParams() {
  const articles = await prisma.article.findMany({ select: { slug: true } });
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// Generate dynamic metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
  });

  if (!article) {
    return { title: "Article Not Found" };
  }

  return {
    title: article.title,
    // Create a description from the first 160 chars of content
    description: article.content.substring(0, 160).trim() + "...",
  };
}

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
  });

  if (!article) {
    notFound();
  }

  return (
    <article className="prose">
      {" "}
      {/* Add a class for potential styling */}
      <h1>{article.title}</h1>
      <p style={{ color: "#666", marginTop: "-1rem", marginBottom: "2rem" }}>
        Published on: {new Date(article.createdAt).toLocaleDateString()}
      </p>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // Use next/image for optimized images
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
          // Custom styling for other elements if needed
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
