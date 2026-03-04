import { fetchFromLaravel } from "@/lib/api";
import { Article } from "@/types/article";
import Link from "next/link";
import { dateFormatter, truncate } from "@/lib/utils";

async function getArticle(slug: string) {
  return fetchFromLaravel<Article>(`get-article/${slug}`, 300); // cache for 5 minutes
}

const dummyRelevantArticles = [
  {
    title: "DOST backs early-stage climate adaptation projects in 2026",
    category: "DOST Programs",
    date: "March 4, 2026",
  },
  {
    title: "Regional innovation hubs expand support for young researchers",
    category: "Innovation",
    date: "March 1, 2026",
  },
  {
    title: "Philippine science communication initiatives gain new momentum",
    category: "Science Communication",
    date: "February 27, 2026",
  },
  {
    title: "STII launches upgraded knowledge portal tools for students",
    category: "Education",
    date: "February 24, 2026",
  },
  {
    title: "New partnerships strengthen access to science datasets",
    category: "Open Data",
    date: "February 21, 2026",
  },
];

const ArticleContent = async ({ slug }: { slug: string }) => {
  const article = await getArticle(slug);

  return (
    <main className="mx-auto w-full max-w-[1180px] px-4 py-8 md:py-10">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,2.1fr)_minmax(300px,1fr)]">
        <article className="rounded-2xl border border-[#cfdeeb] bg-white shadow-sm">
          <div className="p-5 md:p-7">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#b32626]">
              {article.category?.name || "General"}
            </p>
            <h1 className="mt-2 text-2xl font-black leading-tight text-[#122840] md:text-4xl">
              {article.title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#5a6f88]">
              <span>By {article.author || "DOST-STII"}</span>
              <span>{dateFormatter(article.publish_date)}</span>
            </div>

            <div className="mt-6 border-t border-[#e1eaf3] pt-6">
              {article.description ? (
                <div
                  className="prose prose-slate ck ck-content max-w-none"
                  dangerouslySetInnerHTML={{ __html: article.description }}
                />
              ) : (
                <p className="text-base leading-8 text-[#4f6378]">{article.description_text}</p>
              )}
            </div>
          </div>
        </article>

        <aside className="rounded-2xl border border-[#cfdeeb] bg-white p-4 shadow-sm lg:sticky lg:top-28 lg:h-fit">
          <div className="mb-3 flex items-center justify-between border-b border-[#e2ebf4] pb-3">
            <h2 className="text-lg font-bold text-[#123a63]">Relevant Articles</h2>
            <span className="rounded-full border border-[#f4c2c2] bg-[#fff3f3] px-2 py-0.5 text-[11px] font-semibold text-[#b32626]">
              Related
            </span>
          </div>

          <div className="space-y-3">
            {dummyRelevantArticles.map((item) => (
              <Link
                href="#"
                key={item.title}
                className="block rounded-lg border border-[#dbe6f1] bg-[#fbfdff] p-3 transition hover:border-[#c7d9ea] hover:bg-[#f5f9fd]"
              >
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[#b32626]">
                  {item.category}
                </p>
                <h3 className="mt-1 text-sm font-bold leading-5 text-[#0f4f89]">
                  {truncate(item.title, 90, "...")}
                </h3>
                <p className="mt-1 text-xs text-[#6a7f97]">{item.date}</p>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
};

export default ArticleContent;
