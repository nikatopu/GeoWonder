import type { Metadata } from "next";
import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";
import "./global.scss";
import { AppProvider } from "@/lib/AppContext"; // Import the provider
import { AnimatePresence } from "framer-motion";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.geowonder.tours"),
  title: {
    template: "%s | GeoWonder",
    default: "GeoWonder - Unforgettable Tours in Georgia",
  },
  description:
    "Discover the beauty of Georgia with GeoWonder. We offer unique tours, breathtaking landscapes, and authentic cultural experiences.",
  keywords: [
    "Georgia tours",
    "travel Georgia",
    "Caucasus mountains",
    "Tbilisi",
    "Batumi",
    "Svaneti",
    "Kazbegi",
    "Georgian wine tour",
    "Georgian cuisine",
    "Georgian culture",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/geowonder-full.jpeg",
  },

  openGraph: {
    title: "GeoWonder - Unforgettable Tours in Georgia",
    description:
      "Discover the beauty of Georgia with our unique tours, breathtaking landscapes, and authentic cultural experiences.",
    url: "https://www.geowonder.tours",
    siteName: "GeoWonder",
    images: [
      {
        url: "/geo-wonder.jpg",
        width: 1024,
        height: 1024,
        alt: "A stunning collage of Georgian landscapes and culture.",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "GeoWonder - Unforgettable Tours in Georgia",
    description:
      "Discover the beauty of Georgia with our unique tours, breathtaking landscapes, and authentic cultural experiences.",
    images: ["/geo-wonder.jpg"],
  },

  themeColor: "#6B7D47",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <AnimatePresence mode="wait">
            {" "}
            {/* Wrap everything inside the body with the provider */}
            <Header key={"header"} />
            <main>{children}</main>
            <Footer key={"footer"} />
          </AnimatePresence>
        </AppProvider>
      </body>
    </html>
  );
}
