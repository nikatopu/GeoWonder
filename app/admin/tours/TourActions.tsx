"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/atoms/Button";

export function TourActions({ tourId }: { tourId: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (
      confirm(
        "Are you sure you want to delete this tour and all its images? This cannot be undone."
      )
    ) {
      try {
        // We will need to create this API endpoint next
        const response = await fetch(`/api/tours/${tourId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("Tour deleted successfully.");
          router.refresh(); // Refresh the page to update the list
        } else {
          const error = await response.json();
          throw new Error(error.message || "Failed to delete the tour.");
        }
      } catch (error: any) {
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <Link
        href={`/admin/tours/edit/${tourId}`}
        style={{
          fontFamily: "var(--title-font)",
          fontWeight: 600,
          textDecoration: "none",
          color: "#0070f3",
        }}
      >
        Edit
      </Link>
      <Button
        onClick={handleDelete}
        style={{
          background: "none",
          color: "var(--secondary-color)",
          padding: 0,
          margin: 0,
          fontWeight: "normal",
          boxShadow: "none", // remove shadow for this inline button
        }}
      >
        Delete
      </Button>
    </div>
  );
}
