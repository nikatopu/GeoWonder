"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Tour } from "@prisma/client";
import Image from "next/image";
import styles from "./ToursList.module.scss";
import { TourActions } from "./TourActions";

// --- A new, dedicated component for a single draggable row ---
const DraggableTourRow = ({ tour, index }: { tour: Tour; index: number }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: tour.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={styles.draggableRow}
    >
      {/* The drag handle is applied to the order cell */}
      <td {...listeners} className={styles.dragHandle}>
        #{index + 1}
      </td>
      <td>
        <Image
          src={tour.featureImageUrl}
          alt={tour.title}
          width={80}
          height={50}
          className={styles.featureImage}
        />
      </td>
      <td>{tour.title}</td>
      <td>{new Date(tour.createdAt).toLocaleDateString()}</td>
      <td className={styles.actionsCell}>
        <TourActions tourId={tour.id} />
      </td>
    </tr>
  );
};

// --- The Main Client Component ---
export function TourListClient({ initialTours }: { initialTours: Tour[] }) {
  const [tours, setTours] = useState(initialTours);
  const [isSaving, setIsSaving] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = tours.findIndex((t) => t.id === active.id);
      const newIndex = tours.findIndex((t) => t.id === over.id);

      const reorderedTours = arrayMove(tours, oldIndex, newIndex);
      // Update the UI optimistically
      setTours(reorderedTours);

      // Now, update the backend
      setIsSaving(true);
      try {
        const orderedIds = reorderedTours.map((item) => item.id);
        const response = await fetch("/api/tours/reorder", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderedIds }),
        });
        if (!response.ok) throw new Error("Failed to save order.");
      } catch (error) {
        console.error("Failed to save order:", error);
        setTours(initialTours); // Revert on error
        alert("Failed to save the new order.");
      } finally {
        setIsSaving(false);
      }
    }
  };

  return (
    <div className={styles.tableContainer}>
      {isSaving && <div className={styles.savingOverlay}>Saving Order...</div>}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order</th>
              <th>Image</th>
              <th>Title</th>
              <th>Created On</th>
              <th className={styles.actionsCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <SortableContext
              items={tours}
              strategy={verticalListSortingStrategy}
            >
              {tours.map((tour, index) => (
                <DraggableTourRow key={tour.id} tour={tour} index={index} />
              ))}
            </SortableContext>
          </tbody>
        </table>
      </DndContext>
    </div>
  );
}
