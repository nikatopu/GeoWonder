"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import type { Tour, TourImage } from "@prisma/client";
import Button from "@/components/atoms/Button";
import Heading from "@/components/atoms/Title";
import styles from "./Form.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

// --- TYPE AND SCHEMA DEFINITIONS ---
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const fileSchema = z
  .any()
  .refine((files: FileList) => files?.length === 1, "Image file is required.")
  .refine(
    (files: FileList) => files?.[0]?.size <= MAX_FILE_SIZE,
    `Max image size is 5MB.`
  )
  .refine(
    (files: FileList) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
    ".jpg, .jpeg, .png and .webp formats are supported."
  );

const newGalleryImageSchema = z.object({
  file: fileSchema,
  title: z.string().min(1, "Title is required."),
  description: z.string().min(1, "Description is required."),
});

// The main Zod schema for the form
const tourFormSchema = z.object({
  title: z.string().min(3, "Title is required."),
  shortDescription: z.string().min(10, "Short description is required."),
  longDescription: z.string().min(50, "A detailed description is required."),
  // The 'any' type is necessary for file inputs with react-hook-form, but we'll refine it.
  featureImage: z.any(),
  newGalleryImages: z.array(newGalleryImageSchema).optional(),
});

type TourFormData = z.infer<typeof tourFormSchema>;
type TourWithImages = Tour & { galleryImages: TourImage[] };
type TourFormProps = { initialData?: TourWithImages };

// A type-safe component for previewing image files
const ImagePreview = ({ file }: { file: File }) => (
  <img
    src={URL.createObjectURL(file)}
    alt={file.name}
    className={styles.previewImage}
  />
);

// --- START OF COMPONENT ---
export function TourForm({ initialData }: TourFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingGallery, setExistingGallery] = useState<TourImage[]>(
    initialData?.galleryImages || []
  );

  const isEditing = !!initialData;

  // Make the schema dynamic for editing
  const dynamicSchema = tourFormSchema.extend({
    featureImage: z
      .any()
      .refine(
        (files) => isEditing || files?.length === 1,
        "Feature image is required when creating a new tour."
      ),
  });

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof dynamicSchema>>({
    resolver: zodResolver(dynamicSchema),
    defaultValues: {
      title: initialData?.title || "",
      shortDescription: initialData?.shortDescription || "",
      longDescription: initialData?.longDescription || "",
      newGalleryImages: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "newGalleryImages",
  });

  const featureImageFiles = watch("featureImage");
  const galleryImageFiles = watch("newGalleryImages");

  const handleRemoveExistingImage = (id: string) => {
    setExistingGallery((current) => current.filter((img) => img.id !== id));
  };

  const onSubmit = async (data: z.infer<typeof dynamicSchema>) => {
    setIsSubmitting(true);

    try {
      let featureImageUrl = initialData?.featureImageUrl;

      // --- Smart Feature Image Upload ---
      if (
        data.featureImage &&
        data.featureImage.length > 0 &&
        data.featureImage[0] instanceof File
      ) {
        const featureFile = data.featureImage[0];
        // THIS IS THE CRITICAL FIX: We must await the .json() call.
        const blob = await fetch(`/api/upload?filename=${featureFile.name}`, {
          method: "POST",
          body: featureFile,
        }).then((res) => res.json());
        featureImageUrl = blob.url;
      }

      if (!featureImageUrl) {
        throw new Error("Feature image URL is missing.");
      }

      // --- Smart Gallery Image Upload ---
      const newGalleryUploadPromises = (data.newGalleryImages || []).map(
        async (imgField) => {
          const file = imgField.file[0];
          // Apply the same fix here.
          const blob = await fetch(`/api/upload?filename=${file.name}`, {
            method: "POST",
            body: file,
          }).then((res) => res.json());
          return {
            url: blob.url,
            title: imgField.title,
            description: imgField.description,
          };
        }
      );
      const uploadedNewGalleryImages = await Promise.all(
        newGalleryUploadPromises
      );

      // --- Prepare Final API Payload ---
      const apiPayload = {
        title: data.title,
        shortDescription: data.shortDescription,
        longDescription: data.longDescription,
        featureImageUrl: featureImageUrl,
        galleryImages: isEditing
          ? [...existingGallery, ...uploadedNewGalleryImages]
          : uploadedNewGalleryImages,
      };

      const endpoint = isEditing
        ? `/api/tours/${initialData.id}`
        : "/api/tours";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiPayload),
      });

      if (!response.ok)
        throw new Error(`Failed to ${isEditing ? "update" : "create"} tour`);

      alert(`Tour ${isEditing ? "updated" : "created"} successfully!`);
      router.push("/admin/tours");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.formSection}>
        <Heading level={2}>Tour Details</Heading>
        <div className={styles.field}>
          <label htmlFor="title">Title</label>
          <input id="title" {...register("title")} />
          {errors.title && (
            <p className={styles.error}>{errors.title.message}</p>
          )}
        </div>
        <div className={styles.field}>
          <label htmlFor="shortDescription">
            Short Description (for cards)
          </label>
          <textarea
            id="shortDescription"
            {...register("shortDescription")}
            rows={3}
          />
          {errors.shortDescription && (
            <p className={styles.error}>{errors.shortDescription.message}</p>
          )}
        </div>
        <div className={styles.field}>
          <label htmlFor="longDescription">
            Detailed Description (for modal)
          </label>
          <textarea
            id="longDescription"
            {...register("longDescription")}
            rows={8}
          />
          {errors.longDescription && (
            <p className={styles.error}>{errors.longDescription.message}</p>
          )}
        </div>
      </div>

      {/* --- IMAGES SECTION --- */}
      <div className={styles.formSection}>
        <Heading level={2}>Images</Heading>

        <div className={styles.field}>
          <label htmlFor="featureImage">
            Feature Image{" "}
            {isEditing ? "(Optional: replace existing)" : "(Required)"}
          </label>
          <input
            id="featureImage"
            type="file"
            accept="image/*"
            {...register("featureImage")}
          />
          {featureImageFiles?.[0] instanceof File ? (
            <ImagePreview file={featureImageFiles[0]} />
          ) : (
            initialData?.featureImageUrl && (
              <Image
                src={initialData.featureImageUrl}
                alt="Current Feature Image"
                width={150}
                height={100}
                className={styles.previewImage}
              />
            )
          )}
          {errors.featureImage && (
            <p className={styles.error}>
              {errors.featureImage.message as string}
            </p>
          )}
        </div>

        {isEditing && existingGallery.length > 0 && (
          <div className={styles.field}>
            <label>Existing Gallery Images</label>
            <div className={styles.previewGrid}>
              {existingGallery.map((image) => (
                <div key={image.id} className={styles.imageContainer}>
                  <Image
                    src={image.url}
                    alt={image.title}
                    width={150}
                    height={100}
                    className={styles.previewImage}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveExistingImage(image.id)}
                    className={styles.deleteButton}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={styles.field}>
          <label>Add New Gallery Images</label>
          {fields.map((field, index) => (
            <div key={field.id} className={styles.dynamicFieldset}>
              {/* Add a title to each new image block for better UX */}
              <h4 className={styles.fieldsetTitle}>New Image #{index + 1}</h4>

              <div className={styles.field}>
                <label>Image File</label>
                <input
                  type="file"
                  {...register(`newGalleryImages.${index}.file`)}
                />
                {errors.newGalleryImages?.[index]?.file && (
                  <p className={styles.error}>
                    {errors.newGalleryImages[index]?.file?.message as string}
                  </p>
                )}
              </div>

              <div className={styles.field}>
                <label>Image Title</label>
                <input
                  placeholder="e.g., Gergeti Trinity Church"
                  {...register(`newGalleryImages.${index}.title`)}
                />
                {errors.newGalleryImages?.[index]?.title && (
                  <p className={styles.error}>
                    {errors.newGalleryImages[index]?.title?.message}
                  </p>
                )}
              </div>

              <div className={styles.field}>
                <label>Image Description</label>
                <input
                  placeholder="e.g., A view from under Mount Kazbek."
                  {...register(`newGalleryImages.${index}.description`)}
                />
                {errors.newGalleryImages?.[index]?.description && (
                  <p className={styles.error}>
                    {errors.newGalleryImages[index]?.description?.message}
                  </p>
                )}
              </div>

              <Button
                type="button"
                variant="secondary"
                onClick={() => remove(index)}
                className={styles.removeButton} // Use a class instead of inline style
              >
                Remove This Image
              </Button>
            </div>
          ))}

          <Button
            type="button"
            variant="primary"
            onClick={() =>
              append({ file: undefined, title: "", description: "" })
            }
          >
            Add Gallery Image Slot
          </Button>
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : isEditing ? "Update Tour" : "Create Tour"}
      </Button>
    </form>
  );
}
