import Link from 'next/link';
import RevealOnScroll from '../RevealOnScroll'
import { dateFormatter, extractFirstImage, truncate } from '@/lib/utils';
import { Material, MaterialsProps } from '@/types/material';



const LatestArticlesContent = ( { articles } : { articles: MaterialsProps[] } ) => {
  const featuredArticle = articles[0];

  if (!featuredArticle) {
    return null;
  }

  return (
    <section className="mx-auto w-full max-w-295 px-4 pt-8 pb-10 md:pt-10">
      <div className="overflow-hidden rounded-2xl border border-[#cfddeb] bg-white shadow-[0_18px_42px_-28px_rgba(10,57,102,0.55)]">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr]">
          <article className="border-b border-[#d9e5f1] lg:border-b-0 lg:border-r">
            <div className="h-80 w-full"
              style={{
                backgroundImage: `url(${extractFirstImage(featuredArticle.description) || "/placeholder-image.png"})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }} />
            <div className="p-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#b32626]">Feature Story</p>
              <h3 className="text-2xl font-bold leading-tight text-[#0f365f] md:text-3xl">
                <Link href={`/articles/${featuredArticle.slug}`} className="hover:underline">
                  {featuredArticle.title}
                </Link>
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#4d5f74]">
                { truncate(featuredArticle.description_text, 180, "...") }
              </p>
            </div>
          </article>

          <aside className="max-h-130 overflow-y-auto divide-y divide-[#dee8f2]">
            <div className="flex items-center justify-between px-4 py-3">
              <h2 className="text-lg font-bold text-[#123a63]">DOST News & Releases</h2>
              <span className="rounded-full border border-[#f4c2c2] bg-[#fff3f3] px-2.5 py-1 text-[11px] font-semibold text-[#b32626]">
                Updated
              </span>
            </div>
            {articles.slice(1,9).map((item:MaterialsProps, index:number) => (
              <RevealOnScroll
                key={item.title}
                as="article"
                delay={index * 90}
                className="px-4 py-3 transition hover:bg-[#f8fbff]"
              >
                <Link className="flex gap-3"
                  href={`/articles/${item.slug}?category=${item.category_slug}`}>
                  <img
                    src={extractFirstImage(item.description) || "/placeholder-image.png"}
                    alt={item.title}
                    loading="lazy"
                    className="h-20 w-24 flex-none rounded-md border border-[#d5e4f2] object-cover"
                  />
                  <div>
                    <p className="text-xs font-medium text-[#6a7f97]">{dateFormatter(item.publish_date)}</p>
                    <h4 className="mt-1 text-base font-bold leading-tight text-[#0f4f89]">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-sm text-[#4e6074]">{truncate(item.description_text, 50, "...")}</p>
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </aside>
        </div>
      </div>
    </section>
  )
}

export default LatestArticlesContent
