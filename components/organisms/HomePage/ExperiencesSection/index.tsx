import styles from "./ExperiencesSection.module.scss";
import Title from "@/components/atoms/Title";
import Paragraph from "@/components/atoms/Paragraph";

export default function ExperiencesSection() {
  return (
    <section className={styles.section}>
      <div className={styles.backgroundImage}>
        <img src="/placeholder.jpg" alt="Dramatic Landscape" />
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
    </section>
  );
}
