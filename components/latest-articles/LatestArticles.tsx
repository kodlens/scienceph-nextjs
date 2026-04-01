import LatestNewsContent from './LatestArticlesContent';
import { fetchFromLaravel } from '@/lib/api';
import { Material } from '@/types/material';

async function getLatestArticles() {
  return fetchFromLaravel<Material[]>("load-latest-materials", 60);
}

const LatestArticles = async () => {
  const articles = await getLatestArticles(); // ✅ SSR fetch
  return (
    <LatestNewsContent articles={articles} />
  )
}

export default LatestArticles