import type { Metadata } from "next";
import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";
import "./global.scss";
import { AppProvider } from "@/lib/AppContext"; // Import the provider

export const metadata: Metadata = {
  title: {
    template: "%s | GeoWonder", // Page titles will be "Page Name | GeoWonder"
    default: "GeoWonder - Tours in Georgia", // Default title for the homepage
  },
  description:
    "Discover the beauty of Georgia with GeoWonder. We offer unique tours, breathtaking landscapes, and unforgettable experiences.",
  // More metadata can be added here (e.g., openGraph, twitter)
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
          {" "}
          {/* Wrap everything inside the body with the provider */}
          <Header />
          <main>{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
