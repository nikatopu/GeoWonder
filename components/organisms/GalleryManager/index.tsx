// app/admin/gallery/GalleryManager.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { GalleryImage } from '@prisma/client';
import Image from 'next/image';

export function GalleryManager({ initialImages }: { initialImages: GalleryImage[] }) {
  const [images, setImages] = useState(initialImages);
  const [isUploading, setIsUploading] = useState(false);
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const router = useRouter();

  // Handle selection of multiple files
  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFilesToUpload(Array.from(event.target.files));
    }
  };

  // Handle the batch upload process
  const handleUpload = async () => {
    if (filesToUpload.length === 0) {
      alert("Please select files to upload.");
      return;
    }

    setIsUploading(true);

    try {
      // Step 1: Upload all files to Vercel Blob and get their URLs.
      // We use Promise.all to run all upload requests in parallel for speed.
      const uploadPromises = filesToUpload.map(file => {
        return fetch(`/api/upload?filename=${file.name}`, {
          method: 'POST',
          body: file,
        }).then(response => {
          if (!response.ok) throw new Error(`Failed to upload ${file.name}`);
          return response.json();
        });
      });

      const uploadedBlobs = await Promise.all(uploadPromises);

      // Step 2: Prepare the data for our database.
      const newImagesData = uploadedBlobs.map(blob => ({
        url: blob.url,
        altText: blob.pathname, // Use the filename as default alt text
      }));

      // Step 3: Send the batch of new image data to our API to be saved in the database.
      const dbResponse = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newImagesData), // Send an array of objects
      });

      if (!dbResponse.ok) throw new Error("Failed to save images to the database.");

      alert('All images uploaded successfully!');
      setFilesToUpload([]); // Clear the selection
      router.refresh(); // Refresh the page to show new images

    } catch (error) {
      console.error(error);
      alert('An error occurred during upload. Some files may not have been saved.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <div style={{ margin: '2rem 0', border: '2px dashed #ccc', padding: '1rem' }}>
        <h3>Upload New Images</h3>
        <label htmlFor="gallery-upload-input">Select images to upload:</label>
        <input 
          id="gallery-upload-input"
          type="file" 
          accept="image/*" 
          multiple
          onChange={handleFileSelection} 
          disabled={isUploading} 
          title="Select one or more images to upload"
          placeholder="Choose images"
        />
        {filesToUpload.length > 0 && (
          <div style={{ marginTop: '1rem' }}>
            <p>{filesToUpload.length} file(s) selected.</p>
            <button onClick={handleUpload} className="contact-button" disabled={isUploading}>
              {isUploading ? `Uploading ${filesToUpload.length} images...` : `Upload ${filesToUpload.length} images`}
            </button>
          </div>
        )}
      </div>

      <h3>Existing Images</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
        {images.map(image => (
          <div key={image.id} style={{ position: 'relative' }}>
            <Image src={image.url} alt={image.altText} width={200} height={200} style={{ objectFit: 'cover', width: '100%', height: 'auto', borderRadius: '4px' }} />
          </div>
        ))}
      </div>
    </div>
  );
}