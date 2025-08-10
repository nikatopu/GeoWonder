"use client";

import Title from "@/components/atoms/Title";
import Paragraph from "@/components/atoms/Paragraph";
import Button from "@/components/atoms/Button";
import TourCard from "@/components/organisms/TourCard";
import styles from "./Tours.module.scss"; // Import the new styles
import Modal from "@/components/atoms/Modal"; // Import the Modal component
import { useState } from "react";
import ImageCarousel from "@/components/organisms/ImageCarousel";

type TGalleryImage = {
  url: string;
  title: string;
  description: string;
};

type Tour = {
  id: string;
  title: string;
  imageUrl: string; // Use a string for static image URLs
  shortDescription: string; // Optional for tours without a short description
  longDescription: string;
  price: number; // Use a simple number for static data
  gallery: TGalleryImage[];
};

// Our hardcoded tour data array
const toursData: Tour[] = [
  {
    id: "1",
    title: "Majestic Caucasus Trek",
    imageUrl: "/placeholder.jpg", // Example image URL
    shortDescription: "A breathtaking trek through the Caucasus mountains.",
    longDescription:
      "A 3-day adventure through the stunning landscapes of Kazbegi, including a hike to the iconic Gergeti Trinity Church.",
    price: 350,
    gallery: [
      {
        url: "/placeholder.jpg",
        title: "Gallery Image 1",
        description: "Description for Gallery Image 1",
      },
      {
        url: "/placeholder.jpg",
        title: "Gallery Image 2",
        description: "Description for Gallery Image 2",
      },
      {
        url: "/placeholder.jpg",
        title: "Gallery Image 3",
        description: "Description for Gallery Image 3",
      },
      {
        url: "/placeholder.jpg",
        title: "Gallery Image 4",
        description: "Description for Gallery Image 4",
      },
    ],
  },
  {
    id: "2",
    title: "Kakheti Wine & Culture",
    imageUrl: "/placeholder.jpg", // Example image URL
    shortDescription:
      "Explore Georgia's wine region with family-owned cellars.",
    longDescription:
      'Discover the birthplace of wine. Visit family-owned cellars, taste unique qvevri wines, and explore the "City of Love," Sighnaghi.',
    price: 250,
    gallery: [
      {
        url: "/placeholder.jpg",
        title: "Gallery Image 1",
        description: "Description for Gallery Image 1",
      },
      {
        url: "/placeholder.jpg",
        title: "Gallery Image 2",
        description: "Description for Gallery Image 2",
      },
      {
        url: "/placeholder.jpg",
        title: "Gallery Image 3",
        description: "Description for Gallery Image 3",
      },
    ],
  },
  {
    id: "3",
    title: "Old & New Tbilisi City Tour",
    imageUrl: "/placeholder.jpg", // Example image URL
    shortDescription: "Experience the blend of ancient and modern in Tbilisi.",
    longDescription:
      "A full-day immersive tour exploring Tbilisi's ancient Narikala Fortress, Sulphur Baths, vibrant streets, and modern marvels.",
    price: 120,
    gallery: [
      {
        url: "/placeholder.jpg",
        title: "Gallery Image 1",
        description: "Description for Gallery Image 1",
      },
    ],
  },
  {
    id: "4",
    title: "Old & New Tbilisi City Tour",
    imageUrl: "/placeholder.jpg", // Example image URL
    shortDescription: "Experience the blend of ancient and modern in Tbilisi.",
    longDescription:
      "A full-day immersive tour exploring Tbilisi's ancient Narikala Fortress, Sulphur Baths, vibrant streets, and modern marvels.",
    price: 120,
    gallery: [
      {
        url: "/placeholder.jpg",
        title: "Gallery Image 1",
        description: "Description for Gallery Image 1",
      },
      {
        url: "/placeholder.jpg",
        title: "Gallery Image 2",
        description: "Description for Gallery Image 2",
      },
    ],
  },
];

// This component is no longer async as it doesn't fetch data
export default function ToursPage() {
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);

  return (
    <>
      <div className={styles.pageContainer}>
        <Title level={1} className={styles.title}>
          Our Tours
        </Title>
        <Paragraph className={styles.intro}>
          Discover the best of Georgia with our expertly crafted tour packages.
          Each journey is designed to be an unforgettable experience.
        </Paragraph>

        <div className={styles.grid}>
          {toursData.map((tour) => (
            <TourCard
              key={tour.id}
              tour={tour}
              onClick={() => setSelectedTour(tour)}
            />
          ))}
        </div>

        <section className={styles.ctaSection}>
          <Title level={2}>Looking for something different?</Title>
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
      {/* The Modal for displaying tour details */}
      <Modal isOpen={!!selectedTour} onClose={() => setSelectedTour(null)}>
        {selectedTour && (
          <div>
            <div className={styles.carouselContainer}>
              <ImageCarousel slides={selectedTour.gallery} />
            </div>
            <Title level={2}>{selectedTour.title}</Title>
            <Paragraph>{selectedTour.longDescription}</Paragraph>
            <Button
              as="a"
              href={`/contact?tour=${encodeURIComponent(selectedTour.title)}`}
              style={{ marginTop: "1rem" }}
            >
              Inquire About This Tour
            </Button>
          </div>
        )}
      </Modal>
    </>
  );
}
