// components/organisms/TourCard/index.tsx
import Image from "next/image";
import Title from "@/components/atoms/Title";
import Paragraph from "@/components/atoms/Paragraph";
import styles from "./TourCard.module.scss";

// A more generic type definition that works for both static and DB data
type Tour = {
  title: string;
  description: string;
  price: { toString: () => string }; // This works for Prisma.Decimal and number
};

type TourCardProps = {
  tour: Tour;
};

const TourCard = ({ tour }: TourCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <Title level={3}>{tour.title}</Title>
        <Paragraph>{tour.description}</Paragraph>
        <div className={styles.price}>${tour.price.toString()}</div>
      </div>
    </div>
  );
};

export default TourCard;
