"use client"

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react'

type TopicCount = {
  subject_heading: string;
  subject_heading_slug: string;
  count: number;
};

type Props = {
  query: string;
  category: string;
  topic?: string;
};

const SideTopicMenu = ({ query, category, topic }: Props) => {
  const [data, setData] = useState<TopicCount[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const sortedTopics = useMemo(
    () =>
      [...data].sort((a, b) => {
        if (b.count !== a.count) return b.count - a.count;
        return a.subject_heading.localeCompare(b.subject_heading);
      }),
    [data],
  );

  const loadTopicCounts = async (): Promise<void> => {
    if (!process.env.NEXT_PUBLIC_API_URL) {
      console.error("Missing NEXT_PUBLIC_API_URL");
      return;
    }
    try {
      setError(null);
      const params = new URLSearchParams({
        's': query,
        'category': category,
        'topic': topic ? topic : '',
      }).toString();
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/side-menu/topic-labels?${params}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        console.error('Failed to fetch subject headings');
        setError('Failed to fetch subject headings');
        return;
      }
      const data = await response.json();
      setData(data);
    } catch (error: unknown) {
      console.error('Error fetching subject headings:', error);
      setError('Error fetching subject headings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTopicCounts();
  }, [query, category, topic]);

  return (
    <div className="overflow-hidden rounded-[28px] border border-[#cfd9e5] bg-white shadow-[0_18px_45px_-30px_rgba(7,53,98,0.45)]">
      <div className="border-b border-[#dce5ef] bg-[linear-gradient(135deg,#fffaf5_0%,#f7efe2_100%)] px-6 py-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-[#8a755f]">
              Refine
            </p>
            <h2 className="mt-2 text-lg font-extrabold text-[#5b3d21]">
              Topics
            </h2>
          </div>
          <span className="inline-flex min-w-10 items-center justify-center rounded-full bg-[#f6e3c8] px-3 py-1 text-xs font-extrabold text-[#9a5a11]">
            {loading ? "..." : data.length}
          </span>
        </div>
      </div>

      <div className="space-y-3 px-4 py-4">
        {loading ? (
          <div className="flex flex-col gap-2 items-center justify-center py-2">
            <div className="animate-pulse h-5 w-full bg-orange-100"></div>
            <div className="animate-pulse h-5 w-full bg-orange-100"></div>
            <div className="animate-pulse h-5 w-full bg-orange-100"></div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-10">
            <p className="text-sm font-medium text-red-500">{error}</p>
          </div>
        ) : sortedTopics.length === 0 ? (
          <div className="px-2 py-6">
            <p className="text-sm leading-6 text-[#5a6f87]">
              No related topics found for this search.
            </p>
          </div>
        ) : (
          <>
            {sortedTopics.map((item: TopicCount) => (
              <Link
                key={item.subject_heading_slug}
                href={`/search?s=${query}&category=${category}&topic=${item.subject_heading_slug}`}
                className="group flex items-center justify-between gap-3 rounded-2xl border border-[#eadfce] bg-[#fffaf4] px-4 py-3 transition duration-200 hover:-translate-y-0.5 hover:border-[#ddb277] hover:bg-[#fff4e7] hover:shadow-[0_14px_30px_-24px_rgba(129,74,14,0.45)]"
              >
                <div>
                  <p className="text-sm font-bold leading-6 text-[#6d4720] transition group-hover:text-[#a45b0d]">
                    {item.subject_heading}
                  </p>
                </div>
                <span className="inline-flex min-w-11 items-center justify-center rounded-full bg-white px-3 py-1 text-xs font-extrabold text-[#8a531a] ring-1 ring-[#eadfce] transition group-hover:bg-[#a45b0d] group-hover:text-white group-hover:ring-[#a45b0d]">
                  {item.count}
                </span>
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default SideTopicMenu
