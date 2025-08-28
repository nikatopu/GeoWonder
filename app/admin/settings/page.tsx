"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import type { Settings } from "@prisma/client";
import Button from "@/components/atoms/Button";
import Heading from "@/components/atoms/Title";
import styles from "./Settings.module.scss";

// Zod schema for settings validation
const settingsSchema = z.object({
  contactEmail: z.email("Invalid email address."),
  contactPhone: z.string().min(1, "Phone number is required."),
  instagramUrl: z.url("Must be a valid URL."),
  facebookUrl: z.url("Must be a valid URL."),
  tiktokUrl: z.url("Must be a valid URL."),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
  });

  // Fetch the current settings to pre-fill the form
  useEffect(() => {
    const fetchCurrentSettings = async () => {
      const response = await fetch("/api/settings/public");
      const data: Settings = await response.json();
      reset(data); // `reset` from react-hook-form pre-fills the form
    };
    fetchCurrentSettings();
  }, [reset]);

  const onSubmit = async (data: SettingsFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to update settings.");

      alert("Settings updated successfully!");
      router.refresh(); // Refresh to ensure the app context re-fetches
    } catch (error) {
      console.error(error);
      alert("An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Heading level={1}>Site Settings</Heading>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formSection}>
          <Heading level={2}>Company Contact Info</Heading>
          <div className={styles.field}>
            <label htmlFor="contactEmail">Contact Email</label>
            <input
              id="contactEmail"
              {...register("contactEmail")}
              className={styles.inputText}
            />
            {errors.contactEmail && (
              <p className={styles.error}>{errors.contactEmail.message}</p>
            )}
          </div>
          <div className={styles.field}>
            <label htmlFor="contactPhone">Contact Phone</label>
            <input
              id="contactPhone"
              {...register("contactPhone")}
              className={styles.inputText}
            />
            {errors.contactPhone && (
              <p className={styles.error}>{errors.contactPhone.message}</p>
            )}
          </div>
        </div>

        <div className={styles.formSection}>
          <Heading level={2}>Social Media Links</Heading>
          <div className={styles.field}>
            <label htmlFor="instagramUrl">Instagram URL</label>
            <input
              id="instagramUrl"
              {...register("instagramUrl")}
              className={styles.inputText}
            />
            {errors.instagramUrl && (
              <p className={styles.error}>{errors.instagramUrl.message}</p>
            )}
          </div>
          <div className={styles.field}>
            <label htmlFor="facebookUrl">Facebook URL</label>
            <input
              id="facebookUrl"
              {...register("facebookUrl")}
              className={styles.inputText}
            />
            {errors.facebookUrl && (
              <p className={styles.error}>{errors.facebookUrl.message}</p>
            )}
          </div>
          <div className={styles.field}>
            <label htmlFor="tiktokUrl">TikTok URL</label>
            <input
              id="tiktokUrl"
              {...register("tiktokUrl")}
              className={styles.inputText}
            />
            {errors.tiktokUrl && (
              <p className={styles.error}>{errors.tiktokUrl.message}</p>
            )}
          </div>
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Settings"}
        </Button>
      </form>
    </div>
  );
}
