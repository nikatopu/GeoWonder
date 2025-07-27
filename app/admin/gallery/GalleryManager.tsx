// app/admin/gallery/GalleryManager.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { GalleryImage } from "@prisma/client";
import Image from "next/image";

export function GalleryManager({
  initialImages,
}: {
  initialImages: GalleryImage[];
}) {
  const [images, setImages] = useState(initialImages);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const response = await fetch(`/api/upload?filename=${file.name}`, {
        method: "POST",
        body: file,
      });
      const newBlob = await response.json();

      // Now save the blob URL to our database
      const dbResponse = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: newBlob.url, altText: file.name }),
      });

      if (!dbResponse.ok) throw new Error("Failed to save to DB");

      alert("Image uploaded successfully!");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <div
        style={{ margin: "2rem 0", border: "2px dashed #ccc", padding: "1rem" }}
      >
        <h3>Upload New Image</h3>
        <label htmlFor="gallery-upload-input">Choose an image to upload:</label>
        <input
          id="gallery-upload-input"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isUploading}
          title="Select an image file to upload"
        />
        {isUploading && <p>Uploading...</p>}
      </div>

      <h3>Existing Images</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "1rem",
        }}
      >
        {images.map((image) => (
          <div key={image.id} style={{ position: "relative" }}>
            <Image
              src={image.url}
              alt={image.altText}
              width={200}
              height={200}
              style={{ objectFit: "cover", width: "100%", height: "auto" }}
            />
            {/* Add a delete button here if needed */}
          </div>
        ))}
      </div>
    </div>
  );
}
