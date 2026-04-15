import InputSearch from "@/components/InputSearch";
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
        <InputSearch query={query}  />
        {/* search */}
      </div>
      {/* Search Container */}


      <div className="flex gap-4 mt-6 w-full lg:max-w-6xl">
        {/* sidebar (categories, topics */}
        <div className=" flex flex-col gap-4 w-100">
          {/* categories */}
          <div className="overflow-hidden rounded-[28px] border border-[#cfd9e5] bg-white shadow-[0_18px_45px_-30px_rgba(7,53,98,0.45)]">
            <div className="border-b border-[#dce5ef] bg-[linear-gradient(135deg,#f8fbff_0%,#eef5fb_100%)] px-6 py-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-[#6c8198]">
                    Browse
                  </p>
                  <h2 className="mt-2 text-lg font-extrabold text-[#123b63]">
                    Related Categories
                  </h2>
                </div>
                <span className="inline-flex min-w-10 items-center justify-center rounded-full bg-[#dcecff] px-3 py-1 text-xs font-extrabold text-[#0b66b2]">
                  {categoryCounts.length}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-[#5a6f87]">
                Explore the closest category matches for
                <span className="font-semibold text-[#123b63]"> {query || "your keyword"}</span>.
              </p>
            </div>

            { categoryCounts.length > 0 ? (
              <div className="space-y-3 px-4 py-4">
                {categoryCounts.map((item:CategoryCount, index:number) => (
                  <Link
                    key={index}
                    href={`/search?s=${query}&category=${item.category_slug}`}
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-[#d8e3ee] bg-[#f9fbfd] px-4 py-3 transition duration-200 hover:-translate-y-0.5 hover:border-[#8fb9df] hover:bg-[#f1f7fc] hover:shadow-[0_14px_30px_-24px_rgba(6,75,130,0.65)]"
                  >
                    <div>
                      <p className="text-sm font-bold leading-6 text-[#114878] transition group-hover:text-[#0b66b2]">
                        {item.category}
                      </p>
                      
                    </div>
                    <span className="inline-flex min-w-11 items-center justify-center rounded-full bg-white px-3 py-1 text-xs font-extrabold text-[#245b8f] ring-1 ring-[#d8e3ee] transition group-hover:bg-[#0b66b2] group-hover:text-white group-hover:ring-[#0b66b2]">
                      {item.total}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="px-6 py-6">
                <p className="text-sm leading-6 text-[#5a6f87]">
                  No related categories found for this search.
                </p>
              </div>
            )}
          </div>

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
              <p className="mt-3 text-sm leading-6 text-[#73614d]">
                Narrow this search using the most relevant topics for
                <span className="font-semibold text-[#5b3d21]"> {query || "your keyword"}</span>.
              </p>
            </div>

            { subjectHeadingCounts.length > 0 ? (
              <div className="space-y-3 px-4 py-4">
                {subjectHeadingCounts.map((item:SubjectHeadingCount, index:number) => (
                  <Link
                    key={index}
                    href={`/search?s=${query}&subject-heading=${item.subject_heading_slug}`}
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-[#eadfce] bg-[#fffaf4] px-4 py-3 transition duration-200 hover:-translate-y-0.5 hover:border-[#ddb277] hover:bg-[#fff4e7] hover:shadow-[0_14px_30px_-24px_rgba(129,74,14,0.45)]"
                  >
                    <div>
                      <p className="text-sm font-bold leading-6 text-[#6d4720] transition group-hover:text-[#a45b0d]">
                        {item.subject_heading}
                      </p>
                      <p className="text-xs uppercase tracking-[0.18em] text-[#a18a72]">
                        Explore related topics
                      </p>
                    </div>
                    <span className="inline-flex min-w-11 items-center justify-center rounded-full bg-white px-3 py-1 text-xs font-extrabold text-[#8a531a] ring-1 ring-[#eadfce] transition group-hover:bg-[#a45b0d] group-hover:text-white group-hover:ring-[#a45b0d]">
                      {item.total}
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
