import type { Metadata } from "next";
import ToursView from "./ToursView";

export const metadata: Metadata = {
  title: "Tours",
  description:
    "Discover the best of Georgia with our expertly crafted tour packages. View stunning photos of Georgian landscapes, from the Caucasus Mountains to the Black Sea coast.",
};

export default function ToursPage() {
  return <ToursView />;
}
