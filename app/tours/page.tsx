// app/tours/page.tsx
import type { Metadata } from "next";
import Title from "@/components/atoms/Title";
import Paragraph from "@/components/atoms/Paragraph";
import Button from "@/components/atoms/Button";
import TourCard from "@/components/organisms/TourCard";

export const metadata: Metadata = {
  title: "Our Tours",
  description:
    "Explore Georgia with our curated tours. From mountain treks to wine tasting, find your perfect adventure.",
};

// Define the type for our static tour data
// This replaces the Prisma-generated type
type Tour = {
  id: string;
  title: string;
  description: string;
  price: number; // Use a simple number for static data
};

// Our hardcoded tour data array
const toursData: Tour[] = [
  {
    id: "1",
    title: "Majestic Caucasus Trek",
    description:
      "A 3-day adventure through the stunning landscapes of Kazbegi, including a hike to the iconic Gergeti Trinity Church.",
    price: 350,
  },
  {
    id: "2",
    title: "Kakheti Wine & Culture",
    description:
      'Discover the birthplace of wine. Visit family-owned cellars, taste unique qvevri wines, and explore the "City of Love," Sighnaghi.',
    price: 250,
  },
  {
    id: "3",
    title: "Old & New Tbilisi City Tour",
    description:
      "A full-day immersive tour exploring Tbilisi's ancient Narikala Fortress, Sulphur Baths, vibrant streets, and modern marvels.",
    price: 120,
  },
  {
    id: "4",
    title: "Old & New Tbilisi City Tour",
    description:
      "A full-day immersive tour exploring Tbilisi's ancient Narikala Fortress, Sulphur Baths, vibrant streets, and modern marvels.",
    price: 120,
  },
];

// This component is no longer async as it doesn't fetch data
export default function ToursPage() {
  return (
    <div>
      <Title level={1}>Our Tours</Title>
      <Paragraph>
        Discover the best of Georgia with our expertly crafted tour packages.
      </Paragraph>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "2rem",
          margin: "2rem 0",
        }}
      >
        {/* We now map over our static toursData array */}
        {toursData.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>

      <section
        style={{
          marginTop: "4rem",
          textAlign: "center",
          borderTop: "1px solid #eee",
          paddingTop: "2rem",
        }}
      >
        <Title level={2}>Looking for something different?</Title>
        <Paragraph>
          We specialize in creating custom tours tailored to your interests and
          schedule.
          <br />
          Contact us today to build your dream Georgian adventure.
        </Paragraph>
        <Button as="a" href="/contact">
          Plan a Custom Tour
        </Button>
      </section>
    </div>
  );
}
