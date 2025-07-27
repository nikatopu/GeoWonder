// app/gallery/GalleryClientLayout.tsx
"use client";

import { useState, useEffect } from "react";
import type { GalleryImage } from "@prisma/client";
import Image from "next/image";
import Masonry from "react-masonry-css";
import { useInView } from "react-intersection-observer";

// Define the props our component receives
type GalleryClientLayoutProps = {
  initialImages: GalleryImage[];
};

const IMAGES_PER_PAGE = 12;

export function GalleryClientLayout({
  initialImages,
}: GalleryClientLayoutProps) {
  const [images, setImages] = useState(initialImages);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(
    initialImages.length === IMAGES_PER_PAGE
  );
  const { ref, inView } = useInView(); // The hook that detects when the loader is visible

  const loadMoreImages = async () => {
    // Increment the page number and fetch the next set of images
    const nextPage = page + 1;
    const response = await fetch(`/api/gallery?page=${nextPage}`);
    const newImages: GalleryImage[] = await response.json();

    if (newImages.length > 0) {
      setPage(nextPage);
      setImages((prevImages) => [...prevImages, ...newImages]);
    }

    // If we receive fewer images than our page limit, we know we've reached the end
    if (newImages.length < IMAGES_PER_PAGE) {
      setHasMore(false);
    }
  };

  // This `useEffect` triggers the `loadMoreImages` function
  // whenever the `ref` element (our loader) comes into view.
  useEffect(() => {
    if (inView && hasMore) {
      loadMoreImages();
    }
  }, [inView, hasMore]);

  // Define responsive breakpoints for the masonry grid
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {images?.map((image) => (
          <div key={image.id} style={{ marginBottom: "1rem" }}>
            <Image
              src={image.url}
              alt={image.altText}
              width={500}
              height={500}
              style={{ width: "100%", height: "auto", borderRadius: "8px" }}
              // Priority for the first few images to improve LCP
              priority={images.indexOf(image) < 4}
            />
          </div>
        ))}
      </Masonry>

      {/* This is the trigger element. It's invisible but we track when it's on screen. */}
      {hasMore ? (
        <div ref={ref} style={{ textAlign: "center", padding: "2rem" }}>
          <p>Loading more...</p>
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <p>You've reached the end of the gallery.</p>
        </div>
      )}
    </div>
  );
}
