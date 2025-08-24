import React from "react";
import Image from "next/image";
import styles from "./HeroSection.module.scss";
import Heading from "@/components/atoms/Title";
import Button from "@/components/atoms/Button";

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.videoContainer}>
        <video
          autoPlay
          loop
          muted
          playsInline
          webkit-playsinline
          poster="/placeholder.jpg"
          className={styles.backgroundVideo}
        >
          <source src="/videos/georgia-hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <Image
            src="/geowonder-text-only.png"
            alt="GeoWonder Logo"
            width={434}
            height={55}
            priority
          />
        </div>
        <Heading level={2} className={styles.tagline}>
          Georgia is not a country you visit.
          <br />
          It's an experience you live.
        </Heading>
        <Button as="a" href="/tours" variant="primary">
          Begin Your Journey
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
