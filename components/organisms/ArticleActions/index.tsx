"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export function ArticleActions({ articleId }: { articleId: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (
      confirm(
        "Are you sure you want to delete this article? This cannot be undone."
      )
    ) {
      const response = await fetch(`/api/articles/${articleId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Article deleted successfully.");
        router.refresh(); // Refresh the page to update the list
      } else {
        alert("Failed to delete the article.");
      }
    }
  };

  return (
    <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
      <Link
        href={`/admin/articles/edit/${articleId}`}
        style={{ textDecoration: "none", color: "#0070f3" }}
      >
        Edit
      </Link>
      <button
        onClick={handleDelete}
        style={{
          border: "none",
          background: "none",
          color: "red",
          cursor: "pointer",
          padding: 0,
          fontSize: "1rem",
        }}
      >
        Delete
      </button>
    </div>
  );
}
