"use client";

import { useState, useEffect } from "react";
import type { GalleryImage } from "@prisma/client";
import Image from "next/image";
import Masonry from "react-masonry-css";
import { useInView } from "react-intersection-observer";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css"; // Don't forget to import the styles
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

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
  const { ref, inView } = useInView();

  // --- Step 2: Add state for the lightbox ---
  // We use the image's index. -1 means the lightbox is closed.
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const loadMoreImages = async () => {
    const nextPage = page + 1;
    const response = await fetch(`/api/gallery?page=${nextPage}`);
    const newImages: GalleryImage[] = await response.json();

    if (newImages.length > 0) {
      setPage(nextPage);
      setImages((prevImages) => [...prevImages, ...newImages]);
    }
    if (newImages.length < IMAGES_PER_PAGE) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    if (inView && hasMore) {
      loadMoreImages();
    }
  }, [inView, hasMore]);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  // The lightbox needs a specific array format ({ src: '...' })
  const slides = images.map((image) => ({
    src: image.url,
    alt: image.altText,
    width: 2000, // Provide a high-res width for the lightbox view
    height: 2000,
  }));

  return (
    <div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {images.map((image, index) => (
          // --- Step 3: Add onClick to open the lightbox ---
          <div
            key={image.id}
            style={{ marginBottom: "1rem", cursor: "pointer" }}
            onClick={() => setLightboxIndex(index)} // Open lightbox at the clicked image's index
          >
            <Image
              src={image.url}
              alt={image.altText}
              width={500}
              height={500}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
                backgroundColor: "lightgray",
              }}
              priority={index < 4}
            />
          </div>
        ))}
      </Masonry>

      {/* This is the trigger element for infinite scroll */}
      {hasMore ? (
        <div ref={ref} style={{ textAlign: "center", padding: "2rem" }}>
          <p>Loading more...</p>
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <p>You've reached the end of the gallery.</p>
        </div>
      )}

      {/* --- Step 4: Add the Lightbox component --- */}
      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={slides}
        // This is where we customize the icons!
        render={{
          iconPrev: () => <FontAwesomeIcon icon={faArrowLeft} size="2x" />,
          iconNext: () => <FontAwesomeIcon icon={faArrowRight} size="2x" />,
          iconClose: () => <FontAwesomeIcon icon={faXmark} size="2x" />,
        }}
      />
    </div>
  );
}
