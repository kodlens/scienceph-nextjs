import InputSearch from "@/components/InputSearch";
import MaterialSearchResultsLatest from "@/components/search/MaterialSearchResultsLatest";
import SideCategories from "@/components/search-sidebar/SideCategories";
import SideTopics from "@/components/search-sidebar/SideTopics";
import MaterialSearchResultsOthers from "@/components/search/MaterialSearchResultOld";


type Props= {
  s?:string; 
  page?: string;
  category?: string;
  topic?: string;
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

  //const results = await getMaterial(query, category, topic, 10);

 // const categoryCounts = Array.isArray(results.meta.category_counts) ? results.meta.category_counts : [];
  //const subjectHeadingCounts = Array.isArray(results.meta.subject_heading_counts) ? results.meta.subject_heading_counts : [];
  //const searchResults = Array.isArray(results.data.data) ? results.data.data : [];

  return (

    <main className="min-h-screen bg-[#edf2f6] flex flex-col items-center py-6">

      {/* Search Container */}
      <div className="w-full lg:max-w-6xl">
        {/* search  */}
        <InputSearch query={query}  />
        {/* search */}
      </div>
      {/* Search Container */}

      {/* filter */}
      <div className="flex my-4">

        <div className="font-bold">Filter: </div>

        { query && (
          <div className="ml-2 inline-flex items-center gap-1 rounded-full bg-[#dce5ef] px-3 py-1 text-xs font-extrabold text-[#114878]">
            {/* format query from slug */}
            {query.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
          </div>
        )}

        { category && (
          <div className="ml-2 inline-flex items-center gap-1 rounded-full bg-[#cce5ff] px-3 py-1 text-xs font-extrabold text-[#0b66b2]">
            {/* format category from slug */}
            {category.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
          </div>
        )}
        { topic && (
          <div className="ml-2 inline-flex items-center gap-1 rounded-full bg-[#f6e3c8] px-3 py-1 text-xs font-extrabold text-[#9a5a11]">
            {/* format topic from slug */}
            {topic.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
          </div>
        )}

      </div>

      <div className="flex gap-4 w-full lg:max-w-6xl">
        {/* sidebar (categories, topics */}
        <div className=" flex flex-col gap-4 w-87.5">
          {/* categories */}
          <SideCategories query={query} category={category} topic={topic}/>

          {/* subject headings */}
          <SideTopics query={query} category={category} topic={topic} />
            
        </div>

        {/* left bar (result) */}
        <div className="flex-1">
          <MaterialSearchResultsLatest query={query} category={category} topic={topic} />

          <div className="mt-4">
            <MaterialSearchResultsOthers query={query} category={category} topic={topic} />
          </div>

        </div>
      </div>

    </main>
  );
}
