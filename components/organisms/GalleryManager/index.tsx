"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { GalleryImage } from "@prisma/client";
import Image from "next/image";
import Paragraph from "@/components/atoms/Paragraph";
import Button from "@/components/atoms/Button"; // Import your Button atom
import Heading from "@/components/atoms/Title";
import styles from "./GalleryManager.module.scss"; // Import the new styles
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export function GalleryManager({
  initialImages,
}: {
  initialImages: GalleryImage[];
}) {
  const [images, setImages] = useState(initialImages); // State now managed within component
  const [isUploading, setIsUploading] = useState(false);
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const router = useRouter();

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFilesToUpload(Array.from(event.target.files));
    }
  };

  const handleUpload = async () => {
    /* ... (this function remains the same) ... */
  };

  // --- NEW: Handle Delete Function ---
  const handleDelete = async (imageId: string) => {
    if (
      confirm(
        "Are you sure you want to delete this image? This cannot be undone."
      )
    ) {
      try {
        const response = await fetch(`/api/gallery/${imageId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete the image.");
        }

        // Update the UI instantly by filtering out the deleted image from state
        setImages((currentImages) =>
          currentImages.filter((img) => img.id !== imageId)
        );
        alert("Image deleted successfully.");
        // router.refresh() is still good for ensuring consistency, but less critical with optimistic UI
        router.refresh();
      } catch (error) {
        console.error(error);
        alert("An error occurred while deleting the image.");
      }
    }
  };

  return (
    <div>
      <div className={styles.uploadBox}>
        <Heading level={3}>Upload New Images</Heading>
        <input
          id="gallery-upload-input"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelection}
          disabled={isUploading}
        />
        {filesToUpload.length > 0 && (
          <div style={{ marginTop: "1rem" }}>
            <Paragraph>{filesToUpload.length} file(s) selected.</Paragraph>
            <Button onClick={handleUpload} disabled={isUploading}>
              {isUploading
                ? `Uploading ${filesToUpload.length} images...`
                : `Upload ${filesToUpload.length} images`}
            </Button>
          </div>
        )}
      </div>

      <Heading level={3}>Existing Images</Heading>
      <div className={styles.imageGrid}>
        {images.map((image) => (
          <div key={image.id} className={styles.imageContainer}>
            {/* --- NEW: Delete Button --- */}
            <button
              className={styles.deleteButton}
              onClick={() => handleDelete(image.id)}
              aria-label="Delete image"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <Image
              src={image.url}
              alt={image.altText}
              width={200}
              height={200}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "auto",
                display: "block", // Removes bottom space from image
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
