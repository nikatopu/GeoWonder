// app/admin/articles/edit/[id]/page.tsx
import { ArticleForm } from "@/components/organisms/ArticleForm";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

type EditArticlePageProps = {
  params: {
    id: string;
  };
};

export default async function EditArticlePage({
  params,
}: EditArticlePageProps) {
  const article = await prisma.article.findUnique({
    where: { id: params.id },
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
