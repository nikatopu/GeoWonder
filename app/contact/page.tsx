import type { Metadata } from "next";
import Title from "@/components/atoms/Title";
import ContactForm from "@/components/organisms/ContactForm";
import styles from "./Contact.module.scss";

type ContactPageProps = {
  searchParams: Promise<{ tour?: string; image?: string }>;
};

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with GeoWonder to plan your tour. Call us or message us on WhatsApp or Viber.",
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const resolvedSearchParams = await searchParams;
  const tourName = resolvedSearchParams?.tour;
  const tourImage =
    resolvedSearchParams?.image ||
    "https://www.geowonder.tours/_next/image?url=https%3A%2F%2Frbucnusnulj41l89.public.blob.vercel-storage.com%2FWhatsApp%2520Image%25202025-07-27%2520at%252016.35.27.jpeg&w=1080&q=75";

  return (
    <div className={styles.pageContainer}>
      <div className={styles.layout}>
        <div className={styles.infoPanel}>
          <Title level={1} className={styles.title}>
            Let's Plan Your Journey
          </Title>

          <ContactForm tourName={tourName} />
        </div>
        <div className={styles.visualPanel}>
          <img
            src={tourImage}
            alt="Contact Visual"
            className={styles.visualImage}
          />
        </div>
      </div>
    </div>
  );
}
