"use client";

import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import type { Tour } from "@prisma/client";
import Image from "next/image";
import styles from "./ToursList.module.scss";
import { TourActions } from "./TourActions";

type TourListClientProps = {
  initialTours: Tour[];
};

export function TourListClient({ initialTours }: TourListClientProps) {
  const [tours, setTours] = useState(initialTours);
  const [isSaving, setIsSaving] = useState(false);

  const handleOnDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(tours);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update the UI optimistically
    setTours(items);

    // Now, update the backend
    setIsSaving(true);
    try {
      const orderedIds = items.map((item) => item.id);
      await fetch("/api/tours/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderedIds }),
      });
      // Optionally show a success message
    } catch (error) {
      console.error("Failed to save order:", error);
      // Revert to original order on error
      setTours(initialTours);
      alert("Failed to save the new order.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.tableContainer}>
      {isSaving && <div className={styles.savingOverlay}>Saving Order...</div>}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="tours">
          {(provided) => (
            <table
              className={styles.table}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
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
                {tours.map((tour, index) => (
                  <Draggable key={tour.id} draggableId={tour.id} index={index}>
                    {(provided) => (
                      <tr
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={styles.draggableRow}
                      >
                        <td>#{index + 1}</td>
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
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </tbody>
            </table>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
