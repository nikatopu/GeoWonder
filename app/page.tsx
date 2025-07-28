import React from "react";
import Image from "next/image";
import styles from "./Home.module.scss";
import Title from "@/components/atoms/Title";
import Paragraph from "@/components/atoms/Paragraph";
import Button from "@/components/atoms/Button";

const placeHolderImage = "/placeholder.jpg";

// A simple array for the featured tours section
const featuredTours = [
  {
    title: "Majestic Caucasus Trek",
    description:
      "An unforgettable 3-day adventure through the stunning Kazbegi region.",
    imageUrl: placeHolderImage,
  },
  {
    title: "Kakheti Wine & Culture",
    description: "Discover the 8,000-year-old tradition of qvevri winemaking.",
    imageUrl: placeHolderImage,
  },
  {
    title: "Secrets of Old Tbilisi",
    description:
      "Explore the vibrant history and hidden gems of the capital city.",
    imageUrl: placeHolderImage,
  },
];

export default function HomePage() {
  return (
    <div className={styles.main}>
      {/* SECTION 1: HERO */}
      <section className={`${styles.section} ${styles.hero}`}>
        <div className={styles.heroImage}>
          <Image
            src={placeHolderImage}
            alt="Hero Background"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className={styles.heroContent}>
          <div className={styles.logoContainer}>
            <Image
              src="/geowonder-text-only.png"
              alt="GeoWonder Logo"
              width={398}
              height={51}
              priority
            />
          </div>
          <Title level={2} className={styles.tagline}>
            Georgia is not a country you visit.
            <br />
            It's an experience you live.
          </Title>
          <Button as="a" href="/tours">
            Begin Your Journey
          </Button>
        </div>
      </section>

      {/* SECTION 2: ABOUT */}
      <section className={`${styles.section} ${styles.about}`}>
        <div className={styles.aboutText}>
          <Title level={2}>Crafted by Locals, Loved by Explorers.</Title>
          <Paragraph>
            At GeoWonder, we don't just offer tours; we share the soul of our
            homeland. We are a team of passionate Georgians dedicated to
            creating authentic, immersive journeys. From the soaring peaks of
            the Caucasus to the ancient wine cellars of Kakheti, we invite you
            to experience Georgia through our eyes.
          </Paragraph>
        </div>
        <div className={styles.aboutImage}>
          <Image
            src={
              placeHolderImage
            } /* TODO: ADD PHOTO OF A GEORGIAN CITY OR DETAIL (e.g., Tbilisi balcony) */
            alt="A vibrant street in Tbilisi with traditional balconies"
            fill
            sizes="50vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      </section>

      {/* SECTION 3: FEATURED JOURNEYS */}
      <section className={`${styles.section} ${styles.journeys}`}>
        <div className={styles.journeysContent}>
          <Title level={2}>Signature Journeys</Title>
          <div className={styles.journeysGrid}>
            {featuredTours.map((tour) => (
              <div key={tour.title} className={styles.journeyCard}>
                <div className={styles.journeyCardImage}>
                  <Image
                    src={tour.imageUrl}
                    /* TODO: ADD TOUR-SPECIFIC PHOTO */ alt={tour.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="33vw"
                  />
                </div>
                <Title level={3}>{tour.title}</Title>
                <Paragraph>{tour.description}</Paragraph>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: TESTIMONIAL */}
      <section className={`${styles.section} ${styles.testimonial}`}>
        <div className={styles.testimonialImage}>
          {/* TODO: ADD A WARM, INSPIRING PHOTO (e.g., a vineyard at sunset) */}
        </div>
        <div className={styles.testimonialContent}>
          <blockquote>
            "GeoWonder didn't just show us Georgia; they helped us feel its
            heartbeat. An unforgettable trip with true experts."
          </blockquote>
          <cite>— Alex & Jamie, World Travelers</cite>
        </div>
      </section>

      {/* SECTION 5: CALL TO ACTION */}
      <section className={`${styles.section} ${styles.cta}`}>
        <div className={styles.ctaContent}>
          <Title level={2}>Your Georgian Story Begins Here.</Title>
          <Paragraph>
            Ready to create your own memories? Let's plan the perfect adventure
            tailored just for you.
          </Paragraph>
          <Button as="a" href="/contact" className={styles.ctaButton}>
            Plan a Custom Tour
          </Button>
        </div>
      </section>
    </div>
  );
}
