// app/admin/articles/edit/[id]/page.tsx
import { ArticleForm } from "@/components/organisms/ArticleForm";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

type EditArticlePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditArticlePage({
  params,
}: EditArticlePageProps) {
  const article = await prisma.article.findUnique({
    where: { id: (await params).id },
  });

  if (!article) {
    notFound();
  }

  return (
    <div>
      <h1>Edit Article</h1>
      <ArticleForm initialData={article} />
    </div>
  );
}
