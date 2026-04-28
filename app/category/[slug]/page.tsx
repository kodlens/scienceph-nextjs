import { fetchFromLaravel } from "@/lib/api";
import { dateFormatter, truncate } from "@/lib/utils";
import { PaginateResponse } from "@/types/laravelResponse";
import { Material } from "@/types/material";
import ReactPagination from "@/components/pagination/ReactPagination";
import Link from "next/link";
import SideCategories from "@/components/search-sidebar/SideCategories";
import SideTopics from "@/components/search-sidebar/SideTopics";
import SearchCategoriesLabel from "@/components/search-category/SearchCategoriesLabel";

const LOCAL_PER_PAGE = 10;

type NormalizedMaterials = {
  data: Material[];
  total: number;
  currentPage: number;
  lastPage: number;
  from: number | null;
  to: number | null;
};

async function getMaterialsByCategory(param: string, page: number, query: string) {
  const search = new URLSearchParams();
  search.set("page", String(page));
  if (query) {
    search.set("q", query);
  }

  const res = await fetchFromLaravel<PaginateResponse<Material> | Material[]>(
    `get-materials-by-category/${param}?${search.toString()}`,
    300
  );
  return res;
}

function normalizeMaterials(
  response: PaginateResponse<Material> | Material[],
  page: number,
  query: string
): NormalizedMaterials {
  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;

  if (Array.isArray(response)) {
    const normalizedQuery = query.toLowerCase();
    const filtered = normalizedQuery
      ? response.filter((item) => {
          const title = item.title?.toLowerCase() || "";
          const description = item.description_text?.toLowerCase() || "";
          return title.includes(normalizedQuery) || description.includes(normalizedQuery);
        })
      : response;

    const total = filtered.length;
    const lastPage = Math.max(1, Math.ceil(total / LOCAL_PER_PAGE));
    const currentPage = Math.min(safePage, lastPage);
    const start = (currentPage - 1) * LOCAL_PER_PAGE;
    const data = filtered.slice(start, start + LOCAL_PER_PAGE);

    return {
      data,
      total,
      currentPage,
      lastPage,
      from: total === 0 ? null : start + 1,
      to: total === 0 ? null : Math.min(start + LOCAL_PER_PAGE, total),
    };
  }

  return {
    data: response.data ?? [],
    total: response.total ?? response.data?.length ?? 0,
    currentPage: response.current_page ?? 1,
    lastPage: response.last_page ?? 1,
    from: response.from ?? null,
    to: response.to ?? null,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string | string[] }>;
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const routeParams = await params;
  const slugParam = routeParams.slug;
  const routeSlug = Array.isArray(slugParam) ? slugParam.join("/") : slugParam;
  const slug = decodeURIComponent(routeSlug || "").trim();


  const queryParams = await searchParams;
  const rawQuery = (queryParams.q || "").trim();
  const topic = "";
  const rawPage = Number(queryParams.page || "1");
  const currentQueryPage = Number.isFinite(rawPage) && rawPage > 0 ? Math.floor(rawPage) : 1;

  const response = await getMaterialsByCategory(slug, currentQueryPage, rawQuery);
  const { data: materials, total, currentPage, lastPage, from, to } = normalizeMaterials(
    response,
    currentQueryPage,
    rawQuery
  );

  return (
    <main className="min-h-screen bg-[#edf2f6]">
      <div className="mx-auto w-full max-w-6xl px-4 py-6">
        <section className="rounded-2xl border border-[#d2dbe5] bg-white p-4 shadow-sm">
          <h1 className="text-2xl font-extrabold text-[#133a63] md:text-3xl">
            {slug.replaceAll("-", " ")}
          </h1>
          <p className="mt-1 text-sm text-[#5e748b]">
            Browse published materials in this category.
          </p>

          <form action="" method="get" className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input
              name="q"
              type="text"
              defaultValue={rawQuery}
              placeholder="Search within this category"
              className="w-full rounded-xl border border-[#cfd8e3] bg-[#f8fbff] px-4 py-2.5 text-[#1d3652] outline-none ring-[#5d9bd3] placeholder:text-[#8ea0b4] focus:ring-2"
            />
            <button
              type="submit"
              className="rounded-xl bg-[#ea5a67] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#d94a57]"
            >
              Search
            </button>
          </form>
        </section>

        <section className="mt-6">
          <div className="flex gap-4">
            <div className="hidden w-87.5 md:flex md:flex-col md:gap-4">
              <SearchCategoriesLabel query={rawQuery} category={slug} topic={topic} />
              <SideTopics query={rawQuery} category={slug} topic={topic} />
            </div>

            <div className="flex-1">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-xl font-bold text-[#12335b] md:text-2xl">Materials</h2>
                <p className="text-sm text-[#5f738a]">
                  Showing {from ?? 0}-{to ?? 0} of {total}
                </p>
              </div>

              {materials.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#cfd9e5] bg-white p-10 text-center">
                  <h3 className="text-xl font-bold text-[#1a3552]">No materials found</h3>
                  <p className="mt-2 text-base text-[#5a6f87]">
                    Try another keyword to refine your category search.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {materials.map((item) => (
                    <article
                      key={item.id}
                      className="rounded-2xl border border-[#cfd9e3] bg-white p-5 shadow-sm md:p-6"
                    >
                      <h3 className="text-xl font-extrabold leading-tight text-[#005ea8] md:text-2xl">
                        <Link href={`/articles/${item.slug}`} className="hover:underline">
                          {item.title}
                        </Link>
                      </h3>
                      <p className="mt-2 text-sm text-[#647c96]">
                        Published: {dateFormatter(item.publish_date, "MMMM D, YYYY")}
                      </p>
                      <p className="mt-3 text-base leading-relaxed text-[#334c67]">
                        {truncate(item.description_text, 280, "...")}
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

              <ReactPagination
                currentPage={currentPage}
                lastPage={lastPage}
                queryKey="q"
                queryValue={rawQuery}
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
