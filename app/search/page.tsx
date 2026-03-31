import { fetchFromLaravel } from "@/lib/api";
import { dateFormatter, truncate } from "@/lib/utils";
import { laravelResponse } from "@/types/laravelResponse";
import { Material } from "@/types/material";
import Link from "next/link";

async function getMaterial(param: string) {
  const res = await fetchFromLaravel<laravelResponse<Material>>(`search-latest?s=${param}`, 300);
  return res;
}

export default async function Search({
  searchParams,
}: {
  searchParams: Promise<{ s?: string }>;
}) {
  const params = await searchParams;
  const query = (params.s || "").trim();
  const hasQuery = query.length > 0;
  const materials = hasQuery ? await getMaterial(query) : null;
  const results = materials?.data ?? [];
  const resultCount = materials?.total ?? results.length;
  const categories = [
    "Science (305)",
    "Technology (64)",
    "Agricultural (61)",
    "Others (52)",
    "Natural Disaster and Mitigation (5)",
  ];
  const topics = [
    "Botany (194)",
    "Physics (65)",
    "Aquaculture, Fisheries, Angling (55)",
    "Business and Economy (52)",
    "Chemistry (36)",
    "Electrical engineering. Electronics. Nuclear Engineering (28)",
    "Engineering (General). Civil engineering (15)",
    "Environmental technology. Sanitary engineering (13)",
    "Geology (8)",
  ];

  return (
    <main className="min-h-screen bg-[#edf2f6]">
      {/* <div className="bg-[#154a7a] py-4 text-white">
        <div className="mx-auto flex w-full max-w-295 items-center justify-between px-4">
          <p className="text-xl font-bold">STII-KM</p>
          <p className="text-sm font-semibold">Main Search</p>
        </div>
      </div> */}

      <div className="mx-auto w-full max-w-295 px-4 py-6">
        <div className="rounded-2xl border border-[#d2dbe5] bg-[#f5f7fa] p-3 shadow-sm">
          <form action="/search" method="get" className="flex items-center gap-3 rounded-full border border-[#cfd8e3] bg-white px-4 py-2">
            <input
              name="s"
              type="text"
              defaultValue={query}
              placeholder="Search"
              className="w-full border-none bg-transparent text-lg text-[#1d3652] outline-none placeholder:text-[#8ea0b4]"
            />
            <button
              type="submit"
              className="rounded-full bg-[#ea5a67] px-6 py-2 text-sm font-bold text-white transition hover:bg-[#d94a57]"
            >
              Search
            </button>
          </form>
        </div>

        <div className="mt-6 flex items-start gap-6">
          <aside className="w-72 shrink-0 space-y-4">
            <section className="rounded-2xl border border-[#d5dde7] bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold text-[#17395b]">CATEGORIES</h2>
              <ul className="mt-4 space-y-3 text-base text-[#005ea8]">
                {categories.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <section className="rounded-2xl border border-[#d5dde7] bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold text-[#17395b]">TOPICS</h2>
              <ul className="mt-4 space-y-3 text-base text-[#2c4864]">
                {topics.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </aside>

          <section className="min-w-0 flex-1">
            <h1 className="text-3xl font-extrabold text-[#12335b]">Digital Collections</h1>
            <div className="mt-3 mb-4 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#ccd7e3]" />
              <span className="text-sm font-semibold tracking-[0.18em] text-[#52708f]">LATEST</span>
              <div className="h-px flex-1 bg-[#ccd7e3]" />
            </div>

            {hasQuery && results.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#cfd9e5] bg-white p-10 text-center">
                <h2 className="text-xl font-bold text-[#1a3552]">No results found</h2>
                <p className="mt-2 text-base text-[#5a6f87]">
                  Try broader keywords or check your spelling.
                </p>
              </div>
            ) : null}

            <div className="space-y-4">
            {results.map((item) => (
              <article
                key={item.id}
                className="rounded-2xl border border-[#cfd9e3] bg-[#f7f8fa] p-6 shadow-sm"
              >
                <h2 className="text-2xl font-extrabold leading-tight text-[#005ea8]">
                  <Link href={`/articles/${item.slug}`} className="hover:underline">
                    {item.title}
                  </Link>
                </h2>
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

            {hasQuery ? (
              <p className="mt-4 text-sm text-[#5f738a]">Showing {results.length} of {resultCount} results.</p>
            ) : null}
          </section>
        </div>
      </div>
    </main>
  );
}
