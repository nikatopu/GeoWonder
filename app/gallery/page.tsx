import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description:
    "View stunning photos of Georgian landscapes, from the Caucasus Mountains to the Black Sea coast.",
};

export const revalidate = 3600; // Revalidate every hour

export default async function GalleryPage() {
  const images = await prisma.galleryImage.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <h1>Our Gallery</h1>
      <p>A collection of beautiful moments captured in Georgia.</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "1rem",
        }}
      >
        {images.map((image) => (
          <div key={image.id}>
            <Image
              src={image.url}
              alt={image.altText}
              width={500}
              height={500}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "auto",
                borderRadius: "8px",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
