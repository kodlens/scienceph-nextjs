import { fetchFromLaravel } from "@/lib/api";
import { Material, MaterialsProps } from "@/types/material";
import MostPopularArticlesContent from "./MostPopularArticlesContent";

async function getMostPopularMaterials() {
  try {
    return await fetchFromLaravel<MaterialsProps[]>('load-popular-materials', 300); // cache for 5 minutes
  } catch (error) {
    console.error("Failed to load popular materials:", error);
    return [];
  }
}
const MostPopularArticles = async () => {
  const materials = await getMostPopularMaterials();
  return (
    <>
      <MostPopularArticlesContent materials={materials} />
    </>
  )
}

export default MostPopularArticles
