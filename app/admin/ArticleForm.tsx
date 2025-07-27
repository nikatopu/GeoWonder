// app/admin/ArticleForm.tsx
"use client";

import { Editor } from "@tinymce/tinymce-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Article } from "@prisma/client";

// Zod schema for validation
const articleSchema = z.object({
  title: z.string().min(3, "Title is required"),
  content: z.string().min(20, "Content must be at least 20 characters"),
});

type ArticleFormData = z.infer<typeof articleSchema>;

type ArticleFormProps = {
  initialData?: Article | null; // Optional initial data for editing
};

export function ArticleForm({ initialData }: ArticleFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: initialData?.title || "",
      content: initialData?.content || "",
    },
  });

  const onSubmit = async (data: ArticleFormData) => {
    setIsSubmitting(true);
    const apiEndpoint = initialData
      ? `/api/articles/${initialData.id}`
      : "/api/articles";
    const method = initialData ? "PUT" : "POST";

    try {
      const response = await fetch(apiEndpoint, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to save article");

      const result = await response.json();
      alert(`Article ${initialData ? "updated" : "created"} successfully!`);
      router.push(`/admin`); // Redirect to dashboard
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handler for image uploads within TinyMCE
  const imageUploadHandler = async (
    blobInfo: any,
    progress: (percent: number) => void
  ): Promise<string> => {
    const file = blobInfo.blob();
    const response = await fetch(`/api/upload?filename=${file.name}`, {
      method: "POST",
      body: file,
    });

    if (!response.ok) {
      throw new Error("Image upload failed");
    }

    const blobResult = await response.json();
    return blobResult.url; // Return the public URL of the uploaded image
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={labelStyle}>
        <label htmlFor="title">Article Title</label>
        <input id="title" {...register("title")} style={inputStyle} />
        {errors.title && <p style={errorStyle}>{errors.title.message}</p>}
      </div>

      <div style={labelStyle}>
        <label>Content</label>
        <Controller
          name="content"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Editor
              apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
              value={value}
              onEditorChange={(content) => onChange(content)}
              init={{
                height: 500,
                menubar: false,
                plugins:
                  "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
                toolbar:
                  "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
                images_upload_handler: imageUploadHandler,
                automatic_uploads: true,
                file_picker_types: "image",
              }}
            />
          )}
        />
        {errors.content && <p style={errorStyle}>{errors.content.message}</p>}
      </div>

      <button type="submit" className="contact-button" disabled={isSubmitting}>
        {isSubmitting
          ? "Saving..."
          : initialData
          ? "Update Article"
          : "Create Article"}
      </button>
    </form>
  );
}
