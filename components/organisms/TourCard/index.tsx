import Image from "next/image";
import Title from "@/components/atoms/Title";
import Paragraph from "@/components/atoms/Paragraph";
import styles from "./TourCard.module.scss";

type Tour = {
  id: string;
  title: string;
  shortDescription: string;
  imageUrl: string;
};

// The card now accepts an `onReadMore` function prop
type TourCardProps = {
  tour: Tour;
  onClick: () => void;
};

const TourCard = ({ tour, onClick }: TourCardProps) => {
  return (
    <button className={styles.card} onClick={onClick}>
      <div className={styles.content}>
        <Title level={3}>{tour.title}</Title>
        <Paragraph>{tour.shortDescription}</Paragraph>
        <div className={styles.readMore}>Read More →</div>
      </div>
    </button>
  );
};

export default TourCard;
