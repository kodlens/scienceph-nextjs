import React from 'react'
import RevealOnScroll from './RevealOnScroll'
import Link from 'next/link'
import SectionTitle from './SectionTitle';
import { fetchFromLaravel } from '@/lib/api';
import { Category } from '@/types/category';


type CategoryWithSubjectHeadings = Category & {
  subject_headings: {
    id: number;
    category_id: number;
    subject_heading: string;
    active: number;
    slug: string;
  }[];
};

async function getCategories() {
  return fetchFromLaravel<CategoryWithSubjectHeadings[]>("load-categories", 60);
}


const KmCategories = async () => {  
  const categories = await getCategories() || [];

  return (
    <section className="mx-auto w-full max-w-295 px-4 pb-10">
      <div className="rounded-2xl border border-[#cfdeeb] bg-[linear-gradient(180deg,#f8fbff_0%,#f2f7fc_100%)] p-5">
        <SectionTitle
          title="Topics"
          subtitle="Browse curated knowledge areas and jump straight to topics"
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          { categories.map((category, index) => (
            <RevealOnScroll
              key={category.category}
              as="article"
              delay={index * 100}
              className="rounded-2xl border border-[#d4e0ec] bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-[#bfd4e8] hover:shadow-md"
            >
              <div className="mb-3 flex items-center justify-between">
                <Link href={`/category/${category.slug}`} className="text-xl font-bold text-[#122840]">{category.category}</Link>
                <span className="rounded-full border border-[#f2c3c3] bg-[#fff2f2] px-2 py-0.5 text-[11px] font-semibold uppercase text-[#b32626]">
                  {/* {category.topics} this it the count of every subject heading*/}
                  {category.subject_headings.length} topics
                </span>
              </div>
              <ul className="space-y-2.5">
                {category.subject_headings.splice(0, 5).map((item) => (
                  <li key={item.id} className="text-sm text-[#42566e]">
                    <span className="mr-2 text-[#0f66ab]">›</span>
                    <a href={`/subject-heading/${item.slug}`} className="hover:text-[#0f66ab]">
                      {item.subject_heading}
                    </a>
                  </li>
                ))}
              </ul>
              <Link
                href={`/category/${category.slug}`}
                className="mt-4 inline-flex items-center text-xs font-bold uppercase tracking-wide text-[#b32626] hover:text-[#8f1d1d]"
              >
                View all topics
                <span className="ml-1.5">›</span>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

export default KmCategories