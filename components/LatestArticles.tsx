import React from 'react'
import RevealOnScroll from './RevealOnScroll'
import Link from 'next/link'
import SectionTitle from './SectionTitle';

const LatestArticles = () => {

const latestArticles = [
  {
    title: "AI Helps Farmers Predict Monsoon-Driven Crop Risks",
    category: "Agriculture",
    date: "March 2, 2026",
    excerpt: "Forecasting tools combine weather models and local field data.",
  },
  {
    title: "Marine Labs Report New Coral Recovery Signs",
    category: "Environment",
    date: "March 1, 2026",
    excerpt: "Pilot restoration zones show improving reef health indicators.",
  },
  {
    title: "Student Teams Build Low-Cost Rescue Drones",
    category: "Innovation",
    date: "February 28, 2026",
    excerpt: "Modular drone systems target rapid emergency response scenarios.",
  },
  {
    title: "Hospitals Expand Remote Diagnostics in Rural Areas",
    category: "Health",
    date: "February 27, 2026",
    excerpt: "Telehealth adds AI-assisted triage and specialist referral workflows.",
  },
  {
    title: "Startup Turns Rice Waste Into Biodegradable Packaging",
    category: "Technology",
    date: "February 26, 2026",
    excerpt: "New materials pipeline supports local SME sustainability targets.",
  },
  {
    title: "DOST Grants Back Young Climate Researchers",
    category: "Scholarships",
    date: "February 25, 2026",
    excerpt: "Funded projects focus on flood modeling and local adaptation tools.",
  },
];

  return (
    <section className="mx-auto w-full max-w-[1180px] px-4 pb-10">
      <SectionTitle
        title="Popular Articles"
        subtitle="Fresh stories and explainers from science and innovation sectors"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {latestArticles.map((article, index) => (
          <RevealOnScroll
            key={article.title}
            as="article"
            delay={index * 110}
            className="overflow-hidden rounded-xl border border-[#d3e0ec] bg-white shadow-sm transition hover:-translate-y-1 hover:border-[#bdd2e6] hover:shadow-md"
          >
            <div className="h-36 bg-[linear-gradient(135deg,#0f4f89,#4aa0dc)]" />
            <div className="p-4">
              <span className="rounded-full bg-[#fff1f1] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#b32626]">
                {article.category}
              </span>
              <h3 className="mt-2 text-lg font-bold leading-tight text-[#16283d]">{article.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#51647a]">{article.excerpt}</p>
              <div className="mt-3 flex items-center justify-between border-t border-[#e4ecf4] pt-3">
                <p className="text-xs text-[#718297]">{article.date}</p>
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

export default LatestArticles