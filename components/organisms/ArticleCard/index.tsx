import Link from "next/link";
import Title from "@/components/atoms/Title";
import Paragraph from "@/components/atoms/Paragraph";
import styles from "./ArticleCard.module.scss";
import type { Article } from "@prisma/client";

type ArticleCardProps = {
  article: Article;
};

const ArticleCard = ({ article }: ArticleCardProps) => {
  const plainTextContent = article.content.replace(/<[^>]*>?/gm, "");
  const excerpt = plainTextContent.substring(0, 150) + "...";

  return (
    <Link href={`/articles/${article.slug}`} className={styles.card}>
      <div className={styles.content}>
        <Title level={3} className={styles.title}>
          {article.title}
        </Title>
        <Paragraph className={styles.excerpt}>{excerpt}</Paragraph>
        <div className={styles.readMore}>Read Article</div>
      </div>
    </Link>
  );
};

export default ArticleCard;
