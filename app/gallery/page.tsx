import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description:
    "View stunning photos of Georgian landscapes, from the Caucasus Mountains to the Black Sea coast.",
};

export default function GalleryPage() {
  return (
    <div>
      <h1>Our Gallery</h1>
      <p>A collection of beautiful moments captured in Georgia.</p>

      {/* Placeholder for images. You would map over your image data here. */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "1rem",
        }}
      >
        <div
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            textAlign: "center",
          }}
        >
          [Placeholder for Image of Kazbegi]
        </div>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            textAlign: "center",
          }}
        >
          [Placeholder for Image of Svaneti]
        </div>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            textAlign: "center",
          }}
        >
          [Placeholder for Image of Tbilisi]
        </div>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            textAlign: "center",
          }}
        >
          [Placeholder for Image of a Vineyard]
        </div>
      </div>
    </div>
  );
}
