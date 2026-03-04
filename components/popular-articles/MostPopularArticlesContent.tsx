import React from 'react'
import RevealOnScroll from '../RevealOnScroll'
import Link from 'next/link'
import SectionTitle from '../SectionTitle';
import { Article } from '@/types/article';
import { dateFormatter, truncate } from '@/lib/utils';


const MostPopularArticlesContent = ( { articles} : {articles : Article[] }) => {


  return (
    <section className="mx-auto w-full max-w-295 px-4 pb-10">
      <SectionTitle
        title="Discover more"
        subtitle="Fresh stories and explainers from science and innovation sectors"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => (
          <RevealOnScroll
            key={article.title}
            as="article"
            delay={index * 110}
            className="overflow-hidden rounded-xl border border-[#d3e0ec] bg-white shadow-sm transition hover:-translate-y-1 hover:border-[#bdd2e6] hover:shadow-md"
          >
            {/* <div className="h-36"
              style={{
                backgroundImage: `url(${extractFirstImage(article.description) ?? "images/scienceph-logo.png"})`,
                backgroundSize: 'cover',
                
              }} /> */}
            <div className="p-4">
              <span className="rounded-full bg-[#fff1f1] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#b32626]">
                { article.category?.name }
              </span>
              <h3 className="mt-2 text-lg font-bold leading-tight text-[#16283d]">{article.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#51647a]">{truncate(article.description_text, 200)}</p>
              <div className="mt-3 flex items-center justify-between border-t border-[#e4ecf4] pt-3">
                <p className="text-xs text-[#718297]">{dateFormatter(article.publish_date)}</p>
                <Link href="#" className="text-xs font-semibold text-[#b32626] hover:underline">
                  Read more
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}

export default MostPopularArticlesContent