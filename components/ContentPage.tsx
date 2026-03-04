import React from "react";

type ContentPageProps = {
  title: string;
  category: string;
  date: string;
  excerpt: string;
  readTime: string;
};

const ContentPage = ({ title, category, date, excerpt, readTime }: ContentPageProps) => {
  return (
    <article className="overflow-hidden rounded-lg border border-[#d8e1ec] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="h-40 bg-[linear-gradient(135deg,#0b4f8a,#2f89cf)]" />
      <div className="p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#0f4e8b]">{category}</p>
        <h3 className="mt-2 text-lg font-bold leading-tight text-[#1f2937]">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-[#4b5563]">{excerpt}</p>
        <div className="mt-4 flex items-center justify-between text-xs text-[#6b7280]">
          <span>{date}</span>
          <span>{readTime}</span>
        </div>
      </div>
    </article>
  );
};

export default ContentPage;
