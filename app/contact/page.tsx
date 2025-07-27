import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with GeoWonder to plan your tour. Call us or message us on WhatsApp or Viber.",
};

// Use a placeholder Georgian phone number. Remember to replace it!
const phoneNumber = "+995555123456";
const whatsappNumber = "995555123456"; // For wa.me link, no '+' is needed

export default function ContactPage() {
  return (
    <div>
      <h1>Contact GeoWonder</h1>
      <p>Have a question or ready to book your trip? Reach out to us!</p>

      <h2>Direct Contact</h2>
      <p>Click a button below to get in touch instantly.</p>

      <div>
        <a href={`tel:${phoneNumber}`} className="contact-button">
          Call Us
        </a>
        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-button"
        >
          Message on WhatsApp
        </a>
        <a
          href={`viber://chat?number=%2B${whatsappNumber}`}
          className="contact-button"
        >
          Message on Viber
        </a>
      </div>

      <h2>Our Email</h2>
      <p>
        You can also send us an email at:{" "}
        <a href="mailto:contact@geowonder.example.com">
          contact@geowonder.example.com
        </a>
      </p>
    </div>
  );
}
