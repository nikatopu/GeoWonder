import prisma from "@/lib/prisma";
import Heading from "@/components/atoms/Title";
import Button from "@/components/atoms/Button";
import styles from "./ToursList.module.scss";
import { TourListClient } from "./TourListClient"; // Import the new client component
import Paragraph from "@/components/atoms/Paragraph";

export const revalidate = 0;

export default async function AdminToursListPage() {
  const tours = await prisma.tour.findMany({
    orderBy: {
      position: "asc",
    },
  });

  return (
    <div>
      <header className={styles.header}>
        <div>
          <Heading level={1}>Manage Tours</Heading>
          <Paragraph>
            Drag and drop the table rows to reorder the tours on the public
            site.
          </Paragraph>
        </div>
        <Button as="a" href="/admin/tours/new">
          Create New Tour
        </Button>
      </header>

      <TourListClient initialTours={tours} />
    </div>
  );
}
