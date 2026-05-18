"use client"

import { CategoryCount } from "@/types/material";
import { ChevronDown } from "lucide-react";

import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  query: string;
  category: string;
  topic: string;
}

type CategoryTopic = {
  id: number;
  subject_heading: string;
  slug: string;
  count: number;
};

type CategoryWithTopics = CategoryCount & {
  topics?: CategoryTopic[];
};

const SideCategoryMenu = ({ query, category, topic }: Props) => {
  const [data, setData] = useState<CategoryWithTopics[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openCategorySlug, setOpenCategorySlug] = useState<string>("");

  const loadCategoryCounts = async (): Promise<void> => {
    if (!process.env.NEXT_PUBLIC_API_URL) {
      console.error("Missing NEXT_PUBLIC_API_URL");
      return;
    }
    try {
      const params = new URLSearchParams({
        's': query,
        'category': category,
        'topic': topic
      }).toString();
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/side-menu/category-labels?${params}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        console.error('Failed to fetch category counts');
        return;
      }
      const data = await response.json();
      setData(data);
      setLoading(false);
    } catch (error: unknown) {
      console.error('Error fetching category counts:', error);
      setError('Error fetching category counts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategoryCounts();
  }, [query, category, topic]);

  return (
    <div className="overflow-hidden rounded-[28px] border border-[#cfd9e5] bg-white shadow-[0_18px_45px_-30px_rgba(7,53,98,0.45)]">
      <div className="border-b border-[#dce5ef] bg-[linear-gradient(135deg,#f8fbff_0%,#eef5fb_100%)] px-6 py-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-[#6c8198]">
              Browse
            </p>
            <h2 className="mt-2 text-lg font-extrabold text-[#123b63]">
              Categories
            </h2>
          </div>
          <span className="inline-flex min-w-10 items-center justify-center rounded-full bg-[#dcecff] px-3 py-1 text-xs font-extrabold text-[#0b66b2]">
            {loading ? "..." : data.length}
          </span>
        </div>
      </div>

      <div className="space-y-3 px-4 py-4"> {
        loading ? (
          <div className="flex flex-col gap-2 items-center justify-center py-2">
            <div className="animate-pulse h-5 w-full bg-blue-100"></div>
            <div className="animate-pulse h-5 w-full bg-blue-100"></div>
            <div className="animate-pulse h-5 w-full bg-blue-100"></div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-10">
            <p className="text-sm font-medium text-red-500">{error}</p>
          </div>
        ) : data.length === 0 ? (
          <div className="flex items-center justify-center py-10">
            <p className="text-sm font-medium text-gray-500">No categories found.</p>
          </div>
        ) : (
          <>
            { data.map((item: CategoryWithTopics) => {
              const isCategoryMatched = item.category_slug === category;
              const isCategorySelected = isCategoryMatched && !topic;
              const isOpen = openCategorySlug === item.category_slug;
              const categoryHref = `/search?s=${query}&category=${item.category_slug}&topic=`;

              return (
                <div
                  key={item.category_slug}
                  className={`overflow-hidden rounded-2xl border transition ${
                    isCategoryMatched
                      ? "border-[#9cc7ec] bg-[#f2f8ff]"
                      : "border-[#d8e3ee] bg-[#f9fbfd]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenCategorySlug((prev) =>
                        prev === item.category_slug ? "" : item.category_slug
                      )
                    }
                    className={`group flex w-full items-center justify-between gap-3 px-4 py-2 leading-none text-left transition ${
                      isCategoryMatched ? "bg-[#edf5ff]" : ""
                    }`}
                  >
                    <p
                      className={`text-sm font-bold leading-5 transition ${
                        isOpen || isCategoryMatched
                          ? "text-[#0b66b2]"
                          : "text-[#114878] group-hover:text-[#0b66b2]"
                      }`}
                    >
                      {item.category}
                    </p>
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex min-w-11 items-center justify-center rounded-full px-3 py-0.5 text-xs font-extrabold leading-none ring-1 transition ${
                          isOpen || isCategoryMatched
                            ? "bg-[#0b66b2] text-white ring-[#0b66b2]"
                            : "bg-white text-[#245b8f] ring-[#d8e3ee]"
                        }`}
                      >
                        {item.count}
                      </span>
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-[#0b66b2]" : "text-[#245b8f]"
                        }`}
                      />
                    </div>
                  </button>

                  <div
                    className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="min-h-0 border-t border-[#dce5ef] px-3 pb-1 pt-1.5">
                      <Link
                        href={categoryHref}
                        className={`mb-1 flex items-center justify-between rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                          isCategorySelected
                            ? "bg-[#eaf4ff] text-[#0b66b2]"
                            : "text-[#245b8f] hover:bg-[#eef5fb]"
                        }`}
                      >
                        <span>All {item.category}</span>
                        <span className="rounded-full bg-white px-2 py-0.5 text-[11px]">{item.count}</span>
                      </Link>

                      {(item.topics || []).map((topicItem) => {
                        const isTopicSelected =
                          item.category_slug === category && topicItem.slug === topic;

                        return (
                          <Link
                            key={topicItem.slug}
                            href={`/search?s=${query}&category=${item.category_slug}&topic=${topicItem.slug}`}
                            className={`mb-1 flex items-center justify-between rounded-xl px-3 py-1.5 text-xs font-semibold transition last:mb-0 ${
                              isTopicSelected
                                ? "bg-[#0b66b2] text-white"
                                : "text-[#355c82] hover:bg-[#eef5fb]"
                            }`}
                          >
                            <span className="pr-2">{topicItem.subject_heading.trim()}</span>
                            <span className={`rounded-full px-2 py-0.5 text-[11px] ${
                              isTopicSelected ? "bg-white/20 text-white" : "bg-white"
                            }`}>
                              {topicItem.count}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                  
                </div>
              );
            })}
          </>
        )}
        
      </div>

    </div>
  )
}

export default SideCategoryMenu
