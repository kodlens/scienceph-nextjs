import { fetchFromLaravel } from "@/lib/api";
import type { Material } from "@/types/material";
import { dateFormatter, fixImageSources } from "@/lib/utils";
import RelevantArticles from "./relevant-articles/RelevantArticles";
import SideCategoryMenu from "./sidebar-menu/SideCategoryMenu";
import SideTopicMenu from "./sidebar-menu/SideTopicMenu";


async function Material(slug: string) {
  return fetchFromLaravel<Material>(`get-material/${slug}`, 300); // cache for 5 minutes
}

type Props = {
  slug: string;
  query?: string;
  category?: string;
  topic?: string;
};

function formatLabel(value: string) {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const ArticleContent = async ({ slug, query, category, topic }: Props) => {
  const article = await Material(slug);
  const articleCategory =
    category ||
    (typeof article.category === "string"
      ? article.category
      : article.category?.category || "");
  const articleTopic = topic || "";

  
  return (
    <main className="mx-auto w-full max-w-420 px-4 py-8 md:py-10">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_minmax(0,1fr)_300px] xl:grid-cols-[280px_minmax(0,1fr)_320px] xl:gap-8">
        <aside className="flex flex-col gap-6 lg:sticky lg:top-28 lg:h-fit">
          <SideCategoryMenu
            query={query ? query : ''}
            category={category ? category : ''}
            topic={topic ? topic : ''}
          />

          <SideTopicMenu
            query={query ? query : ''}
            category={category ? category : ''}
            topic={topic ? topic : ''}
          />
        </aside>

        <article className="min-w-0 rounded-2xl border border-[#cfdeeb] bg-white shadow-sm">
          <div className="p-5 md:p-7">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#b32626]">
              {articleCategory || "Article"}
            </p>
            <h1 className="mt-2 text-2xl font-black leading-tight text-[#122840] md:text-4xl">
              {article.title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#5a6f88]">
              <span>By {article.author || "DOST-STII"}</span>
              <span>{dateFormatter(article.publish_date)}</span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {articleCategory && (
                <span className="inline-flex items-center gap-2 rounded-full border border-[#cfe0f2] bg-[#edf5fd] px-3 py-1.5 text-xs font-bold text-[#114878]">
                  <span className="uppercase tracking-[0.18em] text-[10px] text-[#5f7e9d]">Category</span>
                  <span>{formatLabel(articleCategory)}</span>
                </span>
              )}

              {articleTopic && (
                <span className="inline-flex items-center gap-2 rounded-full border border-[#eadfce] bg-[#fff7eb] px-3 py-1.5 text-xs font-bold text-[#8a531a]">
                  <span className="uppercase tracking-[0.18em] text-[10px] text-[#a47a45]">Topic</span>
                  <span>{formatLabel(articleTopic)}</span>
                </span>
              )}
            </div>

            <div className="mt-6 border-t border-[#e1eaf3] pt-6">
              {article.description ? (
                <div
                  className="prose prose-slate ck ck-content max-w-none"
                  dangerouslySetInnerHTML={{ __html: fixImageSources(article.description) }}
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

          <RelevantArticles slug={article.slug} />
        </aside>
      </div>
    </main>
  );
};

export default ArticleContent;
