"use client";

import styles from "./ExperiencesSection.module.scss";
import Title from "@/components/atoms/Title";
import Paragraph from "@/components/atoms/Paragraph";
import { motion } from "framer-motion";

export default function ExperiencesSection() {
  return (
    <motion.section
      className={styles.section}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      viewport={{ once: true }}
    >
      <div className={styles.backgroundImage}>
        <img src="/background.jpg" alt="Dramatic Landscape" />
      </div>
      <div className={styles.content}>
        <Title level={2} className={styles.dropShadowFilter}>
          Immerse Yourself in the Best of Georgia
        </Title>
        <div className={styles.textColumns}>
          <Paragraph className={styles.dropShadowFilter}>
            From majestic mountains, waterfalls, and lakes to hiking trails, ski
            resorts, and the Black Sea coast. Adventure lovers can enjoy
            ziplining, paragliding, rafting, quad biking, horse riding, and boat
            trips.
          </Paragraph>
          <Paragraph className={styles.dropShadowFilter}>
            For culture and leisure, we offer sightseeing tours of iconic
            landmarks, traditional performances, and gastronomic tours to taste
            authentic Georgian dishes. Of course, you’ll also enjoy tastings of
            world-famous wines.
          </Paragraph>
        </div>
      </div>
    </motion.section>
  );
}
