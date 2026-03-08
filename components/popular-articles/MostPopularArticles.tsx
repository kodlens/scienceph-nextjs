import { fetchFromLaravel } from "@/lib/api";
import { Article } from "@/types/material";
import MostPopularArticlesContent from "./MostPopularArticlesContent";

async function getMostPopularArticles() {
  return fetchFromLaravel<Article[]>('load-popular-materials', 300); // cache for 5 minutes
}
const MostPopularArticles = async () => {
  const articles = await getMostPopularArticles();
  return (
    <>
      <MostPopularArticlesContent articles={articles} />
    </>
  )
}

export default MostPopularArticles