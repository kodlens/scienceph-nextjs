import LatestNews from "@/components/LatestNews";
import LatestArticles from "@/components/LatestArticles";
import KmCategories from "@/components/KmCategories";
import OfficeMap from "@/components/OfficeMap";
import SearchInputAndHero from "@/components/SearchInputAndHero";




export default function Home() {
  return (
    <>
      <main className="relative z-0">
        
        <SearchInputAndHero />

        <LatestNews />

        <LatestArticles />

        <KmCategories />

        <OfficeMap />

      </main>

    </>


  );
}






