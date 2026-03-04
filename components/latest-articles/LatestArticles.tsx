import LatestNewsContent from './LatestArticlesContent';
import { fetchFromLaravel } from '@/lib/api';
import { Article } from '@/types/article';

async function getLatestArticles() {
  return fetchFromLaravel<Article[]>("load-latest-articles", 60);
}

const LatestArticles = async () => {
  const articles = await getLatestArticles(); // ✅ SSR fetch
  return (
    <LatestNewsContent articles={articles} />
  )
}

export default LatestArticles