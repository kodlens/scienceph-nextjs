import InputSearch from "@/components/InputSearch";
import SearchResultsGroup from "@/components/search/SearchResultsGroup";
import SearchFilters from "@/components/search-filters/SeasrchFilters";
import SideCategoryMenu from "@/components/sidebar-menu/SideCategoryMenu";
//import SideTopicMenu from "@/components/sidebar-menu/SideTopicMenu";


type Props= {
  s?:string; 
  page?: string;
  category?: string;
  topic?: string;
  type?: string;
}


export default async function Search({
  searchParams,
}: {
  searchParams: Promise<Props>;
}) {
  const params = await searchParams;
  
  const query = (params.s || "").trim();
  const category = (params.category || "").trim();
  const topic = (params.topic || "").trim();
  const type = (params.type || "all").trim();

  return (

    <main className="min-h-screen bg-[#edf2f6] py-6">

      <div className="flex flex-col gap-4 items-center ">

        {/* Search Container */}
        <div className="w-full px-4 lg:max-w-6xl">
          {/* search  */}
          <InputSearch query={query}  />
        </div>
        {/* Search Container */}

        {/* filter */}
        <div className="w-full px-4 lg:max-w-6xl">
          <SearchFilters query={query} category={category} topic={topic} type={type} />
        </div>

        <div className="flex gap-4 w-full lg:max-w-6xl px-4">
          
          {/* sidebar (categories, topics */}
          <div className="md:flex md:flex-col md:gap-4 hidden w-87.5">
            {/* categories */}
            <SideCategoryMenu query={query} category={category} topic={topic} type={type}/>

            {/* subject headings */}
            {/* <SideTopicMenu query={query} category={category} topic={topic} /> */}
          </div>

          {/* left bar (result) */}
          <div className="flex-1">
            <SearchResultsGroup query={query} category={category} topic={topic} type={type} />
          </div>
        </div>
      </div>


      
      <div className="md:hidden fixed bottom-20 -left-7.5 hover:-left-5 transition-all duration-300">
        <div className="flex justify-end font-bold bg-blue-600 p-4 rounded-full text-white text-xs w-42.5
          hover:bg-blue-700 transition duration-200 cursor-pointer">
          Categories & Topics
        </div>
      </div>

    </main>
  );
}

