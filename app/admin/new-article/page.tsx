// app/admin/new-article/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Define the validation schema with Zod
const articleSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase and contain no spaces"
    ),
  content: z.string().min(10, "Content must be at least 10 characters"),
});

type ArticleFormData = z.infer<typeof articleSchema>;

export default function NewArticlePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
  });

  const onSubmit = async (data: ArticleFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create article");
      }

      const result = await response.json();
      alert("Article created successfully!");
      // Redirect to the newly created article page
      router.push(`/articles/${result.slug}`);
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = {
    display: "block",
    width: "100%",
    padding: "8px",
    marginBottom: "5px",
  };
  const labelStyle = { marginBottom: "1rem", display: "block" };
  const errorStyle = { color: "red", fontSize: "0.8rem" };

  return (
    <div>
      <h1>Create New Article</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={labelStyle}>
          <label htmlFor="title">Title</label>
          <input id="title" {...register("title")} style={inputStyle} />
          {errors.title && <p style={errorStyle}>{errors.title.message}</p>}
        </div>

        <div style={labelStyle}>
          <label htmlFor="slug">Slug</label>
          <input id="slug" {...register("slug")} style={inputStyle} />
          {errors.slug && <p style={errorStyle}>{errors.slug.message}</p>}
        </div>

        <div style={labelStyle}>
          <label htmlFor="content">Content (Markdown)</label>
          <textarea
            id="content"
            {...register("content")}
            style={{ ...inputStyle, height: "400px", fontFamily: "monospace" }}
          />
          {errors.content && <p style={errorStyle}>{errors.content.message}</p>}
        </div>

        <button
          type="submit"
          className="contact-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create Article"}
        </button>
      </form>
    </div>
  );
}
