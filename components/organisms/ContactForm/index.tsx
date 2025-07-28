"use client"; // This component is strictly for the client

import { useAppContext } from "@/lib/AppContext"; // Correct path for your context
import Button from "@/components/atoms/Button";
import Title from "@/components/atoms/Title";
import Paragraph from "@/components/atoms/Paragraph";
import styles from "@/app/contact/Contact.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

// This component now receives a simple string, not a promise.
type ContactFormProps = {
  tourName?: string;
};

// The function is now SYNCHRONOUS. No more 'async'.
export default function ContactForm({ tourName }: ContactFormProps) {
  // It's now safe to call client-side hooks.
  const { contactEmail, contactPhone } = useAppContext();
  const phoneNumber = contactPhone.replace(/\s/g, "");

  // The rest of the logic uses the 'tourName' prop directly.
  const whatsappMessage = tourName
    ? `Hello! I'm interested in the "${tourName}" tour.`
    : "Hello! I'm interested in learning more about your tours.";

  const mailtoSubject = tourName
    ? `Inquiry about the "${tourName}" tour`
    : "Inquiry about GeoWonder Tours";

  return (
    <>
      {tourName && (
        <Title level={2} className={styles.personalizedTitle}>
          Inquiring about the "{tourName}" tour?
        </Title>
      )}
      <Paragraph className={styles.intro}>
        We're excited to help you plan your Georgian adventure. Choose your
        preferred way to connect below.
      </Paragraph>

      <div className={styles.actionButtons}>
        <Button
          as="a"
          href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(
            whatsappMessage
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          icon={<FontAwesomeIcon icon={faWhatsapp} />}
        >
          Message on WhatsApp
        </Button>
        <Button
          as="a"
          href={`tel:${phoneNumber}`}
          variant="secondary"
          icon={<FontAwesomeIcon icon={faPhone} />}
        >
          Call Us Directly
        </Button>
        <Button
          as="a"
          href={`mailto:${contactEmail}?subject=${encodeURIComponent(
            mailtoSubject
          )}`}
          variant="secondary"
          icon={<FontAwesomeIcon icon={faEnvelope} />}
        >
          Send an Email
        </Button>
      </div>
    </>
  );
}
