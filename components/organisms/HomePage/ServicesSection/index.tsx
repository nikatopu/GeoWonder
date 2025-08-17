import styles from "./ServicesSection.module.scss";
import Title from "@/components/atoms/Title";
import Paragraph from "@/components/atoms/Paragraph";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faHotel,
  faPlaneDeparture,
} from "@fortawesome/free-solid-svg-icons";

const services = [
  {
    icon: faCar,
    title: "Comfortable Transport",
    description:
      "Sedans, off-road vehicles, minivans, and microbuses adapted for Georgia’s roads.",
  },
  {
    icon: faPlaneDeparture,
    title: "Seamless Transfers",
    description:
      "We arrange all airport and city-to-city transfers for a stress-free journey.",
  },
  {
    icon: faHotel,
    title: "Perfect Accommodations",
    description:
      "Booking hotels, guesthouses, or apartments that perfectly suit your needs.",
  },
];

export default function ServicesSection() {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <Title level={2}>Everything You Need, All in One Place.</Title>
        <Paragraph>
          We provide everything you need for a seamless and enjoyable trip.
        </Paragraph>
        <div className={styles.grid}>
          {services.map((service) => (
            <div key={service.title} className={styles.card}>
              <FontAwesomeIcon icon={service.icon} className={styles.icon} />
              <Title level={3}>{service.title}</Title>
              <Paragraph>{service.description}</Paragraph>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};