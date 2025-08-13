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
        const response = await fetch(`/api/tours/${tourId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("Tour deleted successfully.");
          router.refresh();
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to delete the tour.");
        }
      } catch (error) {
        console.error("Delete failed:", error);

        if (error instanceof Error) {
          alert(`Error: ${error.message}`);
        } else {
          alert("An unknown error occurred during deletion.");
        }
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
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
          color: "var(--primary-color)",
        }}
      >
        Edit
      </Link>
      <Button
        onClick={handleDelete}
        variant="secondary"
        style={{
          padding: "6px 12px",
          margin: 0,
          fontSize: "0.9rem",
        }}
      >
        Delete
      </Button>
    </div>
  );
}
