"use client"

import { CategoryCount } from "@/types/material";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  query: string;
  category: string;
  topic: string;
}

const SideCategoryMenu = ({ query, category, topic }: Props) => {
  const [data, setData] = useState<CategoryCount[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
            { data.map((item: CategoryCount) => (
              <Link
                key={item.slug}
                href={`/search?s=${query}&category=${item.slug}&topic=`}
                className="group flex items-center justify-between gap-3 rounded-2xl border border-[#d8e3ee] bg-[#f9fbfd] px-4 py-3 transition duration-200 hover:-translate-y-0.5 hover:border-[#8fb9df] hover:bg-[#f1f7fc] hover:shadow-[0_14px_30px_-24px_rgba(6,75,130,0.65)]"
              >
                <div>
                  <p className="text-sm font-bold leading-6 text-[#114878] transition group-hover:text-[#0b66b2]">
                    {item.category}
                  </p>

                </div>
                <span className="inline-flex min-w-11 items-center justify-center rounded-full bg-white px-3 py-1 text-xs font-extrabold text-[#245b8f] ring-1 ring-[#d8e3ee] transition group-hover:bg-[#0b66b2] group-hover:text-white group-hover:ring-[#0b66b2]">
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

export default SideCategoryMenu