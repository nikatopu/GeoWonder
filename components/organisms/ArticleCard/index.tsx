"use client";

import Title from "@/components/atoms/Title";
import Paragraph from "@/components/atoms/Paragraph";
import styles from "./ArticleCard.module.scss";
import type { Article } from "@prisma/client";
import { motion } from "framer-motion";

type ArticleCardProps = {
  article: Article;
  delay?: number;
};

const ArticleCard = ({ article, delay = 0 }: ArticleCardProps) => {
  const plainTextContent = article.content.replace(/<[^>]*>?/gm, "");
  const excerpt = plainTextContent.substring(0, 150) + "...";

  return (
    <motion.a
      href={`/articles/${article.slug}`}
      className={styles.card}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay }}
      exit={{ opacity: 0 }}
      viewport={{ once: true }}
    >
      <div className={styles.content}>
        <Title level={3} className={styles.title}>
          {article.title}
        </Title>
        <Paragraph className={styles.excerpt}>{excerpt}</Paragraph>
        <div className={styles.readMore}>Read Article</div>
      </div>
    </motion.a>
  );
};

export default ArticleCard;
