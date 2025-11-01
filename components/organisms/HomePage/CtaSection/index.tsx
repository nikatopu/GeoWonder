"use client";

import styles from "./CtaSection.module.scss";
import Heading from "@/components/atoms/Title";
import Paragraph from "@/components/atoms/Paragraph";
import Button from "@/components/atoms/Button";
import { motion } from "framer-motion";

const CtaSection = () => {
  return (
    <section className={styles.section}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        viewport={{ once: true }}
      >
        <Heading level={2}>Your Georgian Story Begins Here.</Heading>
        <Paragraph>
          We look forward to welcoming you to Georgia and making your journey
          truly unforgettable.
        </Paragraph>
        <Button as="a" href="/contact" variant="secondary">
          Plan Your Custom Tour
        </Button>
      </motion.div>
    </section>
  );
};
export default CtaSection;
