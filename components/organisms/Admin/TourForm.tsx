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

const existingGalleryImageSchema = z.object({
  id: z.string(),
  url: z.string(),
  title: z.string().min(1, "Title is required."),
  description: z.string().min(1, "Description is required."),
});

const tourFormSchema = z.object({
  title: z.string().min(3, "Title is required."),
  shortDescription: z.string().min(10, "Short description is required."),
  longDescription: z.string().min(50, "A detailed description is required."),
  featureImage: z.any(),
  newGalleryImages: z.array(newGalleryImageSchema).optional(),
  existingGalleryImages: z.array(existingGalleryImageSchema).optional(), // Add this for editing
});

type TourFormData = z.infer<typeof tourFormSchema>;
type TourWithImages = Tour & { galleryImages: TourImage[] };
type TourFormProps = { initialData?: TourWithImages };

const ImagePreview = ({ file }: { file: File }) => (
  <img
    src={URL.createObjectURL(file)}
    alt={file.name}
    className={styles.previewImage}
  />
);

export function TourForm({ initialData }: TourFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!initialData;

  const dynamicSchema = tourFormSchema.extend({
    featureImage: z
      .any()
      .refine(
        (files) => isEditing || files?.length === 1,
        "A feature image is required."
      ),
  });

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<TourFormData>({
    resolver: zodResolver(dynamicSchema),
    defaultValues: {
      title: initialData?.title || "",
      shortDescription: initialData?.shortDescription || "",
      longDescription: initialData?.longDescription || "",
      newGalleryImages: [],
      existingGalleryImages: initialData?.galleryImages || [], // Pre-fill existing images
    },
  });

  const {
    fields: newImageFields,
    append: appendNewImage,
    remove: removeNewImage,
  } = useFieldArray({
    control,
    name: "newGalleryImages",
  });
  // THIS IS THE KEY: We use a second field array for the existing images
  const { fields: existingImageFields, remove: removeExistingImage } =
    useFieldArray({
      control,
      name: "existingGalleryImages",
    });

  const featureImageFiles = watch("featureImage");

  const onSubmit = async (data: TourFormData) => {
    setIsSubmitting(true);
    try {
      let featureImageUrl = initialData?.featureImageUrl;

      // Upload new feature image if provided
      if (
        data.featureImage &&
        data.featureImage.length > 0 &&
        data.featureImage[0] instanceof File
      ) {
        const file = data.featureImage[0];
        const blob = await fetch(`/api/upload?filename=${file.name}`, {
          method: "POST",
          body: file,
        }).then((res) => res.json());
        featureImageUrl = blob.url;
      }
      if (!featureImageUrl) throw new Error("Feature image URL is missing.");

      // Upload only the new gallery images
      const uploadedNewGalleryImages = await Promise.all(
        (data.newGalleryImages || []).map(async (imgField) => {
          const file = imgField.file[0];
          const blob = await fetch(`/api/upload?filename=${file.name}`, {
            method: "POST",
            body: file,
          }).then((res) => res.json());
          return {
            url: blob.url,
            title: imgField.title,
            description: imgField.description,
          };
        })
      );

      const apiPayload = {
        title: data.title,
        shortDescription: data.shortDescription,
        longDescription: data.longDescription,
        featureImageUrl: featureImageUrl,
        // The gallery payload now includes the edited existing images + the newly uploaded ones
        galleryImages: [
          ...(data.existingGalleryImages || []),
          ...uploadedNewGalleryImages,
        ],
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

        {isEditing && (
          <div className={styles.field}>
            <label>Existing Gallery Images</label>
            {existingImageFields.map((field, index) => (
              <div key={field.id} className={styles.dynamicFieldset}>
                <div className={styles.imageContainer}>
                  <Image
                    src={field.url}
                    alt={field.title}
                    width={150}
                    height={100}
                    className={styles.previewImage}
                  />
                </div>
                <div className={styles.field}>
                  <label>Image Title</label>
                  <input
                    {...register(`existingGalleryImages.${index}.title`)}
                  />
                </div>
                <div className={styles.field}>
                  <label>Image Description</label>
                  <input
                    {...register(`existingGalleryImages.${index}.description`)}
                  />
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => removeExistingImage(index)}
                >
                  <FontAwesomeIcon icon={faTrash} /> Remove
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* --- ADD New Gallery Images --- */}
        <div className={styles.field}>
          <label>Add New Gallery Images</label>
          {newImageFields.map((field, index) => (
            <div key={field.id} className={styles.dynamicFieldset}>
              <h4 className={styles.fieldsetTitle}>New Image #{index + 1}</h4>
              <div className={styles.field}>
                <label>Image File</label>
                <input
                  type="file"
                  {...register(`newGalleryImages.${index}.file`)}
                />
              </div>
              <div className={styles.field}>
                <label>Image Title</label>
                <input
                  placeholder="e.g., Gergeti Trinity Church"
                  {...register(`newGalleryImages.${index}.title`)}
                />
              </div>
              <div className={styles.field}>
                <label>Image Description</label>
                <input
                  placeholder="e.g., A view from under Mount Kazbek."
                  {...register(`newGalleryImages.${index}.description`)}
                />
              </div>
              <Button
                type="button"
                variant="secondary"
                onClick={() => removeNewImage(index)}
                className={styles.removeButton}
              >
                Remove This Image
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="primary"
            onClick={() =>
              appendNewImage({ file: undefined, title: "", description: "" })
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
