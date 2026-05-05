import ArticleContent from "@/components/ArticleContent";

type Params = {
  slug: string;
};

type SearchParams = {
  s?: string;
  category?: string;
  topic?: string;
};

export default async function ArticlePage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}) {
  const { slug } = await params;
  const queryParams = await searchParams;

  const query = (queryParams.s || "").trim();
  const category = (queryParams.category || "").trim();
  const topic = (queryParams.topic || "").trim();


  return <ArticleContent slug={slug} query={query} category={category} topic={topic} />;
}