// app/admin/gallery/page.tsx
import prisma from "@/lib/prisma";
import { GalleryManager } from "../../../components/organisms/GalleryManager";

export const revalidate = 0; // Make page dynamic

export default async function AdminGalleryPage() {
  const images = await prisma.galleryImage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1>Manage Gallery</h1>
      <p>Upload new photos for the public gallery page.</p>
      <GalleryManager initialImages={images} />
    </div>
  );
}
