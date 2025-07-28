import type { Metadata } from "next";
import Title from "@/components/atoms/Title";
import ContactForm from "@/components/organisms/ContactForm";
import styles from "./Contact.module.scss";

// This is the type for the props received by the Server Page
type ContactPageProps = {
  // Assuming searchParams can be a promise based on your findings
  searchParams: Promise<{ tour?: string }>;
};

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with GeoWonder to plan your tour. Call us or message us on WhatsApp or Viber.",
};

// This page MUST be an async Server Component to handle the promise.
export default async function ContactPage({ searchParams }: ContactPageProps) {
  // 1. Await the promise to get the resolved object
  const resolvedSearchParams = await searchParams;

  // 2. Extract the simple string value
  const tourName = resolvedSearchParams?.tour;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.layout}>
        <div className={styles.infoPanel}>
          <Title level={1} className={styles.title}>
            Let's Plan Your Journey
          </Title>

          {/* 3. Pass the final string value as a prop to the Client Component */}
          <ContactForm tourName={tourName} />
        </div>
        <div className={styles.visualPanel}>
          {/* TODO: Add a Google Maps iframe or a beautiful background image here */}
        </div>
      </div>
    </div>
  );
}
