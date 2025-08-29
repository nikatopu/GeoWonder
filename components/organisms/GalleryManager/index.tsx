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
    if (filesToUpload.length === 0) {
      alert("Please select files to upload.");
      return;
    }

    setIsUploading(true);

    try {
      // Step 1: Upload all files to Vercel Blob and get their URLs.
      // We use Promise.all to run all upload requests in parallel for speed.
      const uploadPromises = filesToUpload.map((file) => {
        return fetch(`/api/upload?filename=${file.name}`, {
          method: "POST",
          body: file,
        }).then((response) => {
          if (!response.ok) throw new Error(`Failed to upload ${file.name}`);
          return response.json();
        });
      });

      const uploadedBlobs = await Promise.all(uploadPromises);

      // Step 2: Prepare the data for our database.
      const newImagesData = uploadedBlobs.map((blob) => ({
        url: blob.url,
        altText: blob.pathname, // Use the filename as default alt text
      }));

      // Step 3: Send the batch of new image data to our API to be saved in the database.
      const dbResponse = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newImagesData), // Send an array of objects
      });

      if (!dbResponse.ok)
        throw new Error("Failed to save images to the database.");

      alert("All images uploaded successfully!");
      setFilesToUpload([]); // Clear the selection
      router.refresh(); // Refresh the page to show new images
    } catch (error) {
      console.error(error);
      alert(
        "An error occurred during upload. Some files may not have been saved."
      );
    } finally {
      setIsUploading(false);
    }
  };

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
