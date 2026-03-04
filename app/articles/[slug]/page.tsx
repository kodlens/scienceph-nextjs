import ArticleContent from "@/components/ArticleContent";

export default async function ArticlePage({ params } : { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  console.log('slug',slug);
  
  return (
    <ArticleContent slug={slug} />
  );
}