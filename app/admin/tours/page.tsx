import prisma from "@/lib/prisma";
import Image from "next/image";
import Heading from "@/components/atoms/Title";
import Button from "@/components/atoms/Button";
import styles from "./ToursList.module.scss";
import { TourActions } from "./TourActions"

// This page should always fetch the latest data
export const revalidate = 0;

export default async function AdminToursListPage() {
  const tours = await prisma.tour.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <header className={styles.header}>
        <Heading level={1}>Manage Tours</Heading>
        <Button as="a" href="/admin/tours/new">
          Create New Tour
        </Button>
      </header>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Created On</th>
              <th className={styles.actionsCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tours.map((tour) => (
              <tr key={tour.id}>
                <td>
                  <Image
                    src={tour.featureImageUrl}
                    alt={tour.title}
                    width={80}
                    height={50}
                    className={styles.featureImage}
                  />
                </td>
                <td>{tour.title}</td>
                <td>{new Date(tour.createdAt).toLocaleDateString()}</td>
                <td className={styles.actionsCell}>
                  {/* We'll pass the specific tour ID to the actions component */}
                  <TourActions tourId={tour.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
