// No import for Metadata needed for the default in layout.tsx to apply
// We can still export it to override the default if needed.

import Paragraph from "@/components/atoms/Paragraph";

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to GeoWonder</h1>
      <Paragraph>
        Your adventure in the heart of the Caucasus begins here. Explore ancient
        monasteries, breathtaking mountains, and vibrant cities.
      </Paragraph>

      <h2>Why Choose Us?</h2>
      <Paragraph>
        We are a passionate team of local experts dedicated to showing you the
        authentic Georgia.
      </Paragraph>

      <h2>Ready to Explore?</h2>
      <Paragraph>
        Check out our photo gallery or contact us to plan your custom tour
        today!
      </Paragraph>
    </div>
  );
}
