"use client";

import styles from "./CtaSection.module.scss";
import Heading from "@/components/atoms/Title";
import Paragraph from "@/components/atoms/Paragraph";
import Button from "@/components/atoms/Button";

const CtaSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <Heading level={2}>Your Georgian Story Begins Here.</Heading>
        <Paragraph>
          We look forward to welcoming you to Georgia and making your journey
          truly unforgettable.
        </Paragraph>
        <Button as="a" href="/contact" variant="secondary">
          Plan Your Custom Tour
        </Button>
      </div>
    </section>
  );
};
export default CtaSection;
