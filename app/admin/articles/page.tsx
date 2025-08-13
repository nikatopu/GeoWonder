// app/admin/page.tsx
import prisma from "@/lib/prisma";
import Link from "next/link";
import { ArticleActions } from "../../../components/organisms/ArticleActions";
import { TArticle } from "@/lib/types";

export const revalidate = 0; // Make sure the page is always dynamic

export default async function AdminDashboardPage() {
  const articles: TArticle[] = await prisma.article.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h1>Admin Dashboard</h1>
        <Link href="/admin/new-article" className="contact-button">
          Create New Article
        </Link>
      </div>

      <h2>Manage Articles</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #ccc" }}>
            <th style={{ textAlign: "left", padding: "8px" }}>Title</th>
            <th style={{ textAlign: "left", padding: "8px" }}>Created At</th>
            <th style={{ textAlign: "right", padding: "8px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "8px" }}>{article.title}</td>
              <td style={{ padding: "8px" }}>
                {new Date(article.createdAt).toLocaleDateString()}
              </td>
              <td style={{ padding: "8px", textAlign: "right" }}>
                <ArticleActions articleId={article.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
