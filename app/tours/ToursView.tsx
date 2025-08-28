"use client";

import { useState, useEffect } from "react";
import Heading from "@/components/atoms/Title";
import Paragraph from "@/components/atoms/Paragraph";
import Button from "@/components/atoms/Button";
import TourCard from "@/components/organisms/TourCard";
import TourCardSkeleton from "@/components/organisms/TourCard/TourCardSkeleton";
import styles from "./Tours.module.scss";
import Modal from "@/components/atoms/Modal";
import ImageCarousel from "@/components/organisms/ImageCarousel";
import type { Tour, TourImage } from "@prisma/client";

export type TourWithGallery = Tour & {
  galleryImages: TourImage[];
};

export default function ToursView() {
  const [tours, setTours] = useState<TourWithGallery[]>([]);
  const [selectedTour, setSelectedTour] = useState<TourWithGallery | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/tours/public");
        if (!response.ok) throw new Error("Failed to fetch tours.");
        const data = await response.json();
        setTours(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTours();
  }, []);

  return (
    <>
      <div className={styles.pageContainer}>
        <Heading level={1} className={styles.title}>
          Our Tours
        </Heading>
        <Paragraph className={styles.intro}>
          Discover the best of Georgia with our expertly crafted tour packages.
          Each journey is designed to be an unforgettable experience.
        </Paragraph>

        <div className={styles.grid}>
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <TourCardSkeleton key={index} />
              ))
            : tours.map((tour) => (
                <TourCard
                  key={tour.id}
                  tour={tour}
                  onClick={() => setSelectedTour(tour)}
                />
              ))}
        </div>

        <section className={styles.ctaSection}>
          <Heading level={2}>Looking for something different?</Heading>
          <Paragraph>
            We specialize in creating custom tours tailored to your interests
            and schedule.
            <br />
            Contact us today to build your dream Georgian adventure.
          </Paragraph>
          <Button as="a" href="/contact">
            Plan a Custom Tour
          </Button>
        </section>
      </div>

      <Modal isOpen={!!selectedTour} onClose={() => setSelectedTour(null)}>
        {selectedTour && (
          <div>
            <ImageCarousel slides={selectedTour.galleryImages} />
            <div style={{ paddingTop: "1.5rem" }}>
              <Heading level={2}>{selectedTour.title}</Heading>
              <Paragraph>{selectedTour.longDescription}</Paragraph>
              <Button
                as="a"
                // Pass the name of the tour and the image to use
                href={`/contact?tour=${encodeURIComponent(
                  selectedTour.title
                )}&image=${encodeURIComponent(
                  selectedTour.galleryImages[0]?.url
                )}`}
                style={{ marginTop: "1rem" }}
              >
                Inquire About This Tour
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
