import { fetchFromLaravel } from "@/lib/api";
//import ReactPagination from "@/components/pagination/ReactPagination";
import { dateFormatter, truncate } from "@/lib/utils";
import { ApiResponseWithMeta, CategoryCount, Material, SubjectHeadingCount } from "@/types/material";
import Link from "next/link";




async function getMaterial(param: string, perPage: number) {
  const params = new URLSearchParams({
    's': param,
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



export default async function Search({
  searchParams,
}: {
  searchParams: Promise<{ s?: string; page?: string }>;
}) {
  const params = await searchParams;
  
  const query = (params.s || "").trim();

  // const rawPage = Number(params.page || "1");
  // const currentQueryPage = Number.isFinite(rawPage) && rawPage > 0 ? Math.floor(rawPage) : 1;
  // const hasQuery = query.length > 0;

  const results = await getMaterial(query, 10);

  console.log('results', results.meta);

  const categoryCounts = Array.isArray(results.meta.category_counts) ? results.meta.category_counts : [];
  const subjectHeadingCounts = Array.isArray(results.meta.subject_heading_counts) ? results.meta.subject_heading_counts : [];
  const searchResults = Array.isArray(results.data.data) ? results.data.data : [];

  // const resultCount = materials?.total ?? results.length;
  // const currentPage = materials?.current_page ?? 1;
  // const lastPage = materials?.last_page ?? 1;
  // const from = materials?.from ?? (results.length > 0 ? 1 : 0);
  // const to = materials?.to ?? results.length;

  return (

    <main className="min-h-screen bg-[#edf2f6] flex flex-col items-center py-6">

      {/* Search Container */}
      <div className="w-full lg:max-w-6xl">
        {/* search  */}
        <div className="flex items-center gap-3 rounded-full w-full border border-[#efc2c2] bg-white pr-3 pl-6 py-2
          focus-within:ring-2 focus-within:ring-red-400 focus-within:ring-offset-1 transition">
          
          <span className="text-[#4b6f94] font-bold">Search: </span>
          
          <input
            type="text"
            placeholder="Try: science and technology, climate adaptation, engineering"
            className="w-full border-none bg-transparent text-base text-[#1f2937] 
              outline-none placeholder:text-[#95a3b3] placeholder:italic"
              value={query}
              
          />
          
          <button
            type="button"
            className="rounded-full bg-[#c92a2a] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#ab1f1f]"
          >
            Search
          </button>
        </div>
        {/* search */}
      </div>
      {/* Search Container */}


      <div className="flex gap-4 mt-6 w-full lg:max-w-6xl">
        {/* sidebar (categories, subject-headings */}
        <div className=" flex flex-col gap-4 max-w-4xl  ">
          {/* categories */}
          <div className="rounded-2xl border border-[#cfd9e5] bg-white px-6 py-6">
            { categoryCounts.length > 0 ? (
              categoryCounts.map((item:CategoryCount, index:number) => (
                <div key={index}>
                  <Link href={`/search?s=${query}&category=${item.category_slug}`} className="hover:underline">
                    {item.category}
                  </Link> 
                </div>
              ))
            ) : (
              <p className="text-sm text-[#5a6f87]">
                No related categories found for this search.
              </p>
            )}
          </div>

          {/* subject headings */}
          <div className="rounded-2xl border border-[#cfd9e5] bg-white px-6 py-6">
            { subjectHeadingCounts.length > 0 ? (
              subjectHeadingCounts.map((item:SubjectHeadingCount, index:number) => (
                <div key={index}>
                  <Link href={`/search?s=${query}&subject-heading=${item.subject_heading_slug}`} className="hover:underline">
                    {item.subject_heading}
                  </Link> 
                </div>
              ))
            ) : (
              <p className="text-sm text-[#5a6f87]">
                No related subject headings found for this search.
              </p>
            )}
          </div>
            
        </div>

        {/* left bar (result) */}
        <div className="flex-1">
           { Array.isArray(searchResults) && searchResults.length > 0 ? (
            
            searchResults.map((item:Material) => (
              <article
                key={item.id}
                className="rounded-2xl border border-[#cfd9e3] bg-white p-5 shadow-sm md:p-6 mb-4"
              >
                <h3 className="text-xl font-extrabold leading-tight text-[#005ea8] md:text-2xl">
                  <Link href={`/articles/${item.slug}`} className="hover:underline">
                    {item.title}
                  </Link>
                </h3>
                <div className="mt-2 flex items-center gap-2 text-sm text-[#647c96]">
                  <span>Published:</span>
                  <span>{dateFormatter(item.publish_date, "MMMM D, YYYY")}</span>
                </div>
                <p className="mt-3 text-base leading-relaxed text-[#334c67]">
                  {truncate(item.description_text, 320, "...")}
                </p>
                <div className="mt-4 border-t border-[#dae4ef] pt-3">
                  <Link
                    href={`/articles/${item.slug}`}
                    className="text-sm text-[#0571c6] hover:underline"
                  >
                    /{item.slug}
                  </Link>
                </div>
              </article>
             ))
             
           ) : (
            <div className="rounded-2xl border border-dashed border-[#cfd9e5] bg-white p-10 text-center">
              <h3 className="text-xl font-bold text-[#1a3552]">No results found</h3>
              <p className="mt-2 text-base text-[#5a6f87]">
                Try broader keywords or check your spelling.
              </p>
            </div>
            ) }

        </div>
      </div>

   


      {/* <div className="mx-auto w-full max-w-6xl px-4 py-6">
        <section className="mt-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-[#12335b] md:text-2xl">Results</h2>
            {hasQuery ? (
              <p className="text-sm text-[#5f738a]">
                Showing {from}-{to} of {resultCount}
              </p>
            ) : null}
          </div>

          {hasQuery && results.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#cfd9e5] bg-white p-10 text-center">
              <h3 className="text-xl font-bold text-[#1a3552]">No results found</h3>
              <p className="mt-2 text-base text-[#5a6f87]">
                Try broader keywords or check your spelling.
              </p>
            </div>
          ) : null}

          {!hasQuery ? (
            <div className="rounded-2xl border border-dashed border-[#cfd9e5] bg-white p-10 text-center">
              <h3 className="text-xl font-bold text-[#1a3552]">Start with a keyword</h3>
              <p className="mt-2 text-base text-[#5a6f87]">
                Enter any topic, title, or phrase to search the materials database.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              { Array.isArray(results.data) && results.data.map((item:Material) => (
                <article
                  key={item.id}
                  className="rounded-2xl border border-[#cfd9e3] bg-white p-5 shadow-sm md:p-6"
                >
                  <h3 className="text-xl font-extrabold leading-tight text-[#005ea8] md:text-2xl">
                    <Link href={`/articles/${item.slug}`} className="hover:underline">
                      {item.title}
                    </Link>
                  </h3>
                  <div className="mt-2 flex items-center gap-2 text-sm text-[#647c96]">
                    <span>Published:</span>
                    <span>{dateFormatter(item.publish_date, "MMMM D, YYYY")}</span>
                  </div>
                  <p className="mt-3 text-base leading-relaxed text-[#334c67]">
                    {truncate(item.description_text, 320, "...")}
                  </p>
                  <div className="mt-4 border-t border-[#dae4ef] pt-3">
                    <Link
                      href={`/articles/${item.slug}`}
                      className="text-sm text-[#0571c6] hover:underline"
                    >
                      /{item.slug}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          {hasQuery ? (
            <ReactPagination
              currentPage={currentPage}
              lastPage={lastPage}
              queryKey="s"
              queryValue={query}
            />
          ) : null}
        </section>
      </div> */}
    </main>
  );
}
