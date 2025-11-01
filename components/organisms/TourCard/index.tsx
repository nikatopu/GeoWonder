"use client";

import Image from "next/image";
import Heading from "@/components/atoms/Title";
import Paragraph from "@/components/atoms/Paragraph";
import styles from "./TourCard.module.scss";
import type { Tour } from "@prisma/client";
import { motion } from "framer-motion";

type TourCardProps = {
  tour: Pick<Tour, "title" | "shortDescription" | "featureImageUrl">;
  onClick: () => void;
  delay?: number;
};

const TourCard = ({ tour, onClick, delay = 0 }: TourCardProps) => {
  return (
    <motion.div
      className={styles.card}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      role="button"
      tabIndex={0}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay }}
      exit={{ opacity: 0 }}
      viewport={{ once: true }}
    >
      <div className={styles.imageContainer}>
        <Image
          src={tour.featureImageUrl}
          alt={tour.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className={styles.content}>
        <Heading level={3}>{tour.title}</Heading>
        <Paragraph>{tour.shortDescription}</Paragraph>
        <div className={styles.readMore}>Read More →</div>
      </div>
    </motion.div>
  );
};

export default TourCard;
