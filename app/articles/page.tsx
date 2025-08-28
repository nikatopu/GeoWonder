import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import Title from "@/components/atoms/Title";
import Paragraph from "@/components/atoms/Paragraph";
import ArticleCard from "@/components/organisms/ArticleCard";
import styles from "./Articles.module.scss";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles and guides about traveling in Georgia, from local culture to hidden gems.",
};
export const revalidate = 3600;

export default async function ArticlesPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className={styles.pageContainer}>
      <Title level={1} className={styles.title}>
        GeoWonder Journal
      </Title>
      <Paragraph className={styles.intro}>
        Tips, stories, and guides to help you plan your Georgian adventure,
        written by our local experts.
      </Paragraph>

      {articles.length === 0 && (
        <Paragraph className={styles.noArticles}>No articles found.</Paragraph>
      )}

      <div className={styles.grid}>
        {articles &&
          articles.length > 0 &&
          articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
      </div>
    </div>
  );
}
