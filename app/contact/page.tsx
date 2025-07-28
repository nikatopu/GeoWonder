// app/contact/page.tsx
import type { Metadata } from "next";
import Title from "@/components/atoms/Title";
import ContactForm from "@/components/organisms/ContactForm"; // Import our new Client Component

// The props type remains the same
type ContactPageProps = {
  searchParams?: {
    tour?: string;
  };
};

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with GeoWonder to plan your tour. Call us or message us on WhatsApp or Viber.",
};

// This is now a clean Server Component
export default function ContactPage({ searchParams }: ContactPageProps) {
  // We can safely read searchParams on the server
  const tourName = searchParams?.tour;

  return (
    <div
      style={{ maxWidth: "700px", margin: "4rem auto", textAlign: "center" }}
    >
      <Title level={1}>Contact GeoWonder</Title>

      {/* 
        Render the Client Component and pass the tourName as a prop.
        The client component will handle the rest of the logic.
      */}
      <ContactForm tourName={tourName} />
    </div>
  );
}
