// app/admin/gallery/page.tsx
import prisma from "@/lib/prisma";
import { GalleryManager } from "../../../components/organisms/GalleryManager";
import Paragraph from "@/components/atoms/Paragraph";

export const revalidate = 0; // Make page dynamic

export default async function AdminGalleryPage() {
  const images = await prisma.galleryImage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1>Manage Gallery</h1>
      <Paragraph>Upload new photos for the public gallery page.</Paragraph>
      <GalleryManager initialImages={images} />
    </div>
  );
}
