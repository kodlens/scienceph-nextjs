import React from 'react'
import RevealOnScroll from './RevealOnScroll'
import Link from 'next/link'
import SectionTitle from './SectionTitle';

const KmCategories = () => {



  const knowledgeCategories = [
    {
      title: "Science",
      topics: "11 topics",
      items: ["Mathematics", "Astronomy", "Physics", "Chemistry", "Geology"],
    },
    {
      title: "Medicine",
      topics: "16 topics",
      items: ["Public health", "Pathology", "Internal medicine", "Surgery", "Ophthalmology"],
    },
    {
      title: "Agriculture",
      topics: "5 topics",
      items: ["Plant culture", "Forestry", "Animal culture", "Aquaculture", "Agri policy"],
    },
    {
      title: "Technology",
      topics: "16 topics",
      items: [
        "Civil engineering",
        "Ocean engineering",
        "Environmental technology",
        "Road systems",
        "Rail operations",
      ],
    },
    {
      title: "Disaster Mitigation",
      topics: "4 topics",
      items: ["Preparedness", "Emergency management", "Hazard mitigation", "Risk management"],
    },
    {
      title: "Public Affairs",
      topics: "10 topics",
      items: ["Social welfare", "Peace and order", "International relations", "Economy", "Governance"],
    },
  ];


  return (
    <section className="mx-auto w-full max-w-[1180px] px-4 pb-10">
      <div className="rounded-2xl border border-[#cfdeeb] bg-[linear-gradient(180deg,#f8fbff_0%,#f2f7fc_100%)] p-5">
        <SectionTitle
          title="Knowledge Categories"
          subtitle="Browse curated knowledge areas and jump straight to topics"
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {knowledgeCategories.map((category, index) => (
            <RevealOnScroll
              key={category.title}
              as="article"
              delay={index * 100}
              className="rounded-2xl border border-[#d4e0ec] bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-[#bfd4e8] hover:shadow-md"
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-xl font-bold text-[#122840]">{category.title}</h3>
                <span className="rounded-full border border-[#f2c3c3] bg-[#fff2f2] px-2 py-0.5 text-[11px] font-semibold uppercase text-[#b32626]">
                  {category.topics}
                </span>
              </div>
              <ul className="space-y-2.5">
                {category.items.map((item) => (
                  <li key={item} className="text-sm text-[#42566e]">
                    <span className="mr-2 text-[#0f66ab]">›</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="#"
                className="mt-4 inline-flex items-center text-xs font-bold uppercase tracking-wide text-[#b32626] hover:text-[#8f1d1d]"
              >
                View all category topics
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