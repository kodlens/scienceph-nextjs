import { fetchFromLaravel } from "@/lib/api";
import { Material } from "@/types/material";
import MostPopularArticlesContent from "./MostPopularArticlesContent";

async function getMostPopularArticles() {
  return fetchFromLaravel<Material[]>('load-popular-materials', 300); // cache for 5 minutes
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