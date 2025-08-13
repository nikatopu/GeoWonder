import { TourForm } from "@/components/organisms/Admin/TourForm";
import Heading from "@/components/atoms/Title";

export default function NewTourPage() {
  return (
    <div>
      <Heading level={1}>Create a New Tour</Heading>
      <TourForm />
    </div>
  );
}
