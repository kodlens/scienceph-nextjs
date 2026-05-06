
import KmCategories from "@/components/KmCategories";
import OfficeMap from "@/components/OfficeMap";
import SearchInputAndHero from "@/components/SearchInputAndHero";
import MostPopularArticles from "@/components/popular-articles/MostPopularArticles";
import LatestArticles from "@/components/latest-articles/LatestArticles";
// import ChatBotAssistant from "@/components/chatbot/ChatBotAssistant";

export default function Home() {
  return (
    <>
      <main className="relative z-0">
        <SearchInputAndHero />

        <LatestArticles />

        <MostPopularArticles />

        <KmCategories />

        <OfficeMap />

        {/* <ChatBotAssistant /> */}
        
      </main>

      
    </>
  );
}
