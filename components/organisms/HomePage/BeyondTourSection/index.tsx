"use client";

import styles from "./BeyondTourSection.module.scss";
import Heading from "@/components/atoms/Title";
import Paragraph from "@/components/atoms/Paragraph";
import { motion } from "framer-motion";

export default function BeyondTourSection() {
  return (
    <section className={styles.section}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        viewport={{ once: true }}
      >
        <Heading level={2}>More Than Just a Tour</Heading>
        <Paragraph>
          If desired, we can arrange medical tourism services, including
          dentistry and hair transplantation at trusted clinics. Whatever your
          wishes, we carefully consider every detail to ensure your perfect
          vacation.
        </Paragraph>
      </motion.div>
    </section>
  );
}
