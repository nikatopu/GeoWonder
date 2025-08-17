import styles from "./BeyondTourSection.module.scss";
import Heading from "@/components/atoms/Title";
import Paragraph from "@/components/atoms/Paragraph";

export default function BeyondTourSection() {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <Heading level={2}>More Than Just a Tour</Heading>
        <Paragraph>
          If desired, we can arrange medical tourism services, including
          dentistry and hair transplantation at trusted clinics. Whatever your
          wishes, we carefully consider every detail to ensure your perfect
          vacation.
        </Paragraph>
      </div>
    </section>
  );
}
