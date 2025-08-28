import Image from "next/image";
import styles from "./AboutUsSection.module.scss";
import Title from "@/components/atoms/Title";
import Paragraph from "@/components/atoms/Paragraph";

export default function AboutUsSection() {
  const countYears = new Date().getFullYear() - 2013;

  return (
    <section className={styles.section}>
      <div className={styles.imageContainer}>
        <Image
          src="https://www.geowonder.tours/_next/image?url=https%3A%2F%2Frbucnusnulj41l89.public.blob.vercel-storage.com%2FWhatsApp%2520Image%25202025-07-27%2520at%252016.42.02.jpeg&w=1080&q=75"
          alt="A beautiful Georgian landscape"
          fill
          sizes="50vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className={styles.content}>
        <Title level={2}>{countYears} Years of Unforgettable Journeys</Title>
        <Paragraph>
          Our travel agency is built on {countYears} years of experience and a
          passion for showing the beauty of Georgia. With a team of dedicated
          and professional staff, we take pride in creating unforgettable
          journeys tailored to your wishes. Our priority is your comfort,
          happiness, and the memories you take home.
        </Paragraph>
      </div>
    </section>
  );
}
