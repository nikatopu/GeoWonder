// app/gallery/page.tsx
import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import { GalleryClientLayout } from "./GalleryClientLayout";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description:
    "View stunning photos of Georgian landscapes, from the Caucasus Mountains to the Black Sea coast.",
};

const IMAGES_PER_PAGE = 12;

export default async function GalleryPage() {
  // Fetch only the initial set of images on the server.
  const initialImages = await prisma.galleryImage.findMany({
    take: IMAGES_PER_PAGE,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <h1>Our Gallery</h1>
      <p>A collection of beautiful moments captured in Georgia.</p>

      {/* Pass the initial images to the client component, which will handle infinite scroll */}
      <GalleryClientLayout initialImages={initialImages} />
    </div>
  );
}
