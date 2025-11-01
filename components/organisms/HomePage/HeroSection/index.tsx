"use client";

import React from "react";
import styles from "./HeroSection.module.scss";
import Heading from "@/components/atoms/Title";
import Button from "@/components/atoms/Button";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <motion.section
      className={styles.hero}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      viewport={{ once: true }}
    >
      <div className={styles.videoContainer}>
        <video
          autoPlay
          loop
          muted
          playsInline
          webkit-playsinline="true"
          poster="/placeholder.jpg"
          className={styles.backgroundVideo}
        >
          <source src="/videos/georgia-hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <img
            src="/geowonder-text-only.png"
            alt="GeoWonder Logo"
            className={styles.logo}
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
    </motion.section>
  );
};

export default HeroSection;
