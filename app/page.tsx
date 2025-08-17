import React from "react";
import styles from "./Home.module.scss";
import AboutUsSection from "@/components/organisms/HomePage/AboutUsSection";
import ServicesSection from "@/components/organisms/HomePage/ServicesSection";
import ExperiencesSection from "@/components/organisms/HomePage/ExperiencesSection";
import BeyondTourSection from "@/components/organisms/HomePage/BeyondTourSection";
import CtaSection from "@/components/organisms/HomePage/CtaSection";
import HeroSection from "@/components/organisms/HomePage/HeroSection";

export default function HomePage() {
  return (
    <main className={styles.main}>
      <HeroSection />
      <AboutUsSection />
      <ServicesSection />
      <ExperiencesSection />
      <BeyondTourSection />
      <CtaSection />
    </main>
  );
}
