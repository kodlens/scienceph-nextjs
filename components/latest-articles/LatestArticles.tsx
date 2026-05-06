import LatestNewsContent from './LatestArticlesContent';
import { fetchFromLaravel } from '@/lib/api';
import { Material, MaterialsProps } from '@/types/material';

async function getLatestArticles() {
  try {
    return await fetchFromLaravel<MaterialsProps[]>("load-latest-materials", 60);
  } catch (error) {
    console.error("Failed to load latest articles:", error);
    return [];
  }
}

const LatestArticles = async () => {
  const articles = await getLatestArticles(); // ✅ SSR fetch
  return (
    <LatestNewsContent articles={articles} />
  )
}

export default LatestArticles