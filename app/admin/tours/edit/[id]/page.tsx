import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { TourForm } from "@/components/organisms/Admin/TourForm";
import Heading from "@/components/atoms/Title";
import type { Tour, TourImage } from "@prisma/client";

// Define the type to include the gallery images relation
type TourWithImages = Tour & {
  galleryImages: TourImage[];
};

export default async function EditTourPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const tour = await prisma.tour.findUnique({
    where: { id: (await params).id },
    include: { galleryImages: true },
  });

  if (!tour) {
    notFound();
  }

  return (
    <div>
      <Heading level={1}>Edit Tour</Heading>
      {/* We will pass the fetched data to the form */}
      <TourForm initialData={tour as TourWithImages} />
    </div>
  );
}
