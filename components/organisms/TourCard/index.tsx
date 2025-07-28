// components/organisms/TourCard/index.tsx
import Link from "next/link"; // Import the Link component
import Image from "next/image";
import Title from "@/components/atoms/Title";
import Paragraph from "@/components/atoms/Paragraph";
import styles from "./TourCard.module.scss";

type Tour = {
  id: string;
  title: string;
  description: string;
  price: number | { toString: () => string };
};

type TourCardProps = {
  tour: Tour;
};

const TourCard = ({ tour }: TourCardProps) => {
  // We URL-encode the tour title to safely pass it as a query parameter
  const contactHref = `/contact?tour=${encodeURIComponent(tour.title)}`;

  return (
    // Wrap the entire card in a Link component
    <Link href={contactHref} className={styles.linkWrapper}>
      <div className={styles.card}>
        <div className={styles.content}>
          <Title level={3}>{tour.title}</Title>
          <Paragraph>{tour.description}</Paragraph>
          <div className={styles.price}>From ${tour.price.toString()}</div>
        </div>
      </div>
    </Link>
  );
};

export default TourCard;
