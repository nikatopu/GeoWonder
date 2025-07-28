"use client"; // This is the crucial directive that makes it a Client Component

import { useAppContext } from "@/lib/AppContext";
import Button from "@/components/atoms/Button";
import Title from "@/components/atoms/Title";
import Paragraph from "@/components/atoms/Paragraph";

// This component now receives the tourName as a prop from the Server Component
type ContactFormProps = {
  tourName?: string;
};

export default function ContactForm({ tourName }: ContactFormProps) {
  // Now it's safe to call the hook here!
  const { contactEmail, contactPhone } = useAppContext();
  const phoneNumber = contactPhone.replace(/\s/g, "");

  // The rest of your logic remains the same
  const whatsappMessage = tourName
    ? `Hello! I'm interested in the "${tourName}" tour.`
    : "Hello! I'm interested in learning more about your tours.";

  const mailtoSubject = tourName
    ? `Inquiry about the "${tourName}" tour`
    : "Inquiry about GeoWonder Tours";

  return (
    <>
      {/* Conditionally render a personalized heading if a tour was selected */}
      {tourName && (
        <Title
          level={2}
          style={{ color: "var(--primary-color)", marginTop: "2rem" }}
        >
          Inquiring about the "{tourName}" tour?
        </Title>
      )}

      <Paragraph>
        Have a question or ready to book your trip? Reach out to us! We're
        excited to help you plan your Georgian adventure.
      </Paragraph>

      <div
        style={{
          margin: "2rem 0",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <Button as="a" href={`tel:${phoneNumber}`}>
          Call Us
        </Button>
        <Button
          as="a"
          href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(
            whatsappMessage
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Message on WhatsApp
        </Button>
        <Button
          as="a"
          href={`mailto:${contactEmail}?subject=${encodeURIComponent(
            mailtoSubject
          )}`}
        >
          Send an Email
        </Button>
      </div>
    </>
  );
}
