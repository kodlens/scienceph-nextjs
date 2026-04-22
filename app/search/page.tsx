import InputSearch from "@/components/InputSearch";
import MaterialSearchResults from "@/components/MaterialSearchResults";
import Pagination from "@/components/Pagination";
import SideCategories from "@/components/search/SideCategories";
import { fetchFromLaravel } from "@/lib/api";
//import ReactPagination from "@/components/pagination/ReactPagination";
import { dateFormatter, truncate } from "@/lib/utils";
import { ApiResponseWithMeta, SubjectHeadingCount } from "@/types/material";
import Link from "next/link";


async function getMaterial(
  param: string, 
  category: string,
  topic: string,
  perPage: number) {
  const params = new URLSearchParams({
    's': param,
    'category': category,
    'topics': topic,
    'perpage': String(perPage)
  }).toString();

  //search.set("s", param);
  //search.set("page", String(page));

  const res = await fetchFromLaravel<ApiResponseWithMeta>(
    `search-latest?${params}`,
    300
  );
  return res;
}


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

  const results = await getMaterial(query, category, topic, 10);

  const categoryCounts = Array.isArray(results.meta.category_counts) ? results.meta.category_counts : [];
  const subjectHeadingCounts = Array.isArray(results.meta.subject_heading_counts) ? results.meta.subject_heading_counts : [];
  const searchResults = Array.isArray(results.data.data) ? results.data.data : [];

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
          <div className="overflow-hidden rounded-[28px] border border-[#cfd9e5] bg-white shadow-[0_18px_45px_-30px_rgba(7,53,98,0.45)]">
            <div className="border-b border-[#dce5ef] bg-[linear-gradient(135deg,#fffaf5_0%,#f7efe2_100%)] px-6 py-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-[#8a755f]">
                    Refine
                  </p>
                  <h2 className="mt-2 text-lg font-extrabold text-[#5b3d21]">
                    Topics
                  </h2>
                </div>
                <span className="inline-flex min-w-10 items-center justify-center rounded-full bg-[#f6e3c8] px-3 py-1 text-xs font-extrabold text-[#9a5a11]">
                  {subjectHeadingCounts.length}
                </span>
              </div>
            </div>

            { subjectHeadingCounts.length > 0 ? (
              <div className="space-y-3 px-4 py-4">
                {subjectHeadingCounts.map((item:SubjectHeadingCount, index:number) => (
                  <Link
                    key={index}
                    href={`/search?s=${query}&category=${category}&topics=${item.slug}`}
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-[#eadfce] bg-[#fffaf4] px-4 py-3 transition duration-200 hover:-translate-y-0.5 hover:border-[#ddb277] hover:bg-[#fff4e7] hover:shadow-[0_14px_30px_-24px_rgba(129,74,14,0.45)]"
                  >
                    <div>
                      <p className="text-sm font-bold leading-6 text-[#6d4720] transition group-hover:text-[#a45b0d]">
                        {item.subject_heading}
                      </p>
                    </div>
                    <span className="inline-flex min-w-11 items-center justify-center rounded-full bg-white px-3 py-1 text-xs font-extrabold text-[#8a531a] ring-1 ring-[#eadfce] transition group-hover:bg-[#a45b0d] group-hover:text-white group-hover:ring-[#a45b0d]">
                      {item.count}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="px-6 py-6">
                <p className="text-sm leading-6 text-[#5a6f87]">
                  No related subject headings found for this search.
                </p>
              </div>
            )}
          </div>
            
        </div>

        {/* left bar (result) */}
        <div className="flex-1">
          <MaterialSearchResults data={searchResults} />

          {/* pagination */}
          <div className="mt-6 flex justify-center">
            <Pagination itemsPerPage={10} />
          </div>

        </div>
      </div>

    </main>
  );
}
