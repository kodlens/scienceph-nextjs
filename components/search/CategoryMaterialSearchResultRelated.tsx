"use client"

import { dateFormatter, truncate } from '@/lib/utils'
import { MaterialsProps } from '@/types/material'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import Pagination from '../Pagination';
import { PaginateResponse } from '@/types/laravelResponse';


type Props = {
  query: string;
  category: string;
  topic: string;
};

const CategoryMaterialSearchResultRelated = ({ query, category, topic }: Props) => {

  const [data, setData] = useState<PaginateResponse<MaterialsProps>>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  // const relatedItems = Array.isArray(data?.data)
  //   ? data.data.filter((item, index, items) => {
  //       const previousItem = items[index - 1];

  //       if (!previousItem) return true;

  //       return !(
  //         previousItem.id === item.id ||
  //         previousItem.slug === item.slug ||
  //         previousItem.title.trim().toLowerCase() === item.title.trim().toLowerCase()
  //       );
  //     })
  //   : [];

  const loadSearchOthers = async (): Promise<void> => {
    if (!process.env.NEXT_PUBLIC_API_URL) {
      console.error("Missing NEXT_PUBLIC_API_URL");
      return;
    }
    try {
      const params = new URLSearchParams({
        's': query,
        'category': category,
        'topic': topic,
        page: page.toString(),
      }).toString();
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category-search-others?${params}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        console.error('Failed to fetch search results');
        return;
      }
      const data = await response.json();
      setData(data || {}); 
      

      setLoading(false);
    } catch (error: unknown) {
      console.error('Error fetching category counts:', error);
      setError('Error fetching category counts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSearchOthers();
  }, [query, category, topic, page]);


  if(loading) {
    return (
      <div className="rounded-2xl border border-dashed border-[#cfd9e5] bg-white p-10 animate-pulse">
        {/* Title skeleton */}
        <div className="h-6 w-40 mx-auto bg-gray-200 rounded"></div>

        {/* Subtitle skeleton */}
        <div className="mt-4 space-y-2">
          <div className="h-4 w-3/4 mx-auto bg-gray-200 rounded"></div>
          <div className="h-4 w-2/3 mx-auto bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (!data || data.data.length === 0) {
    return null;
  }

  return (
    <>
      <div className="flex items-center my-4">
        <div className="grow border-t border-gray-300"></div>
        <span className="mx-4 text-gray-500 font-bold text-xs">RELATED ARTICLES</span>
        <div className="grow border-t border-gray-300"></div>
      </div>
      {data.data.map((item: MaterialsProps, index: number) => (
        <article
          key={`related-${item.id}-${index}`}
          className="rounded-2xl border border-[#cfd9e3] bg-white p-5 shadow-sm md:p-6 mb-4"
        >
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex rounded-full border border-[#eadfce] bg-[#fff7eb] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#8a531a]">
              {item.topic_name}
            </span>
          </div>
          <h3 className="text-xl font-extrabold leading-tight text-[#005ea8] md:text-2xl">
            <Link href={`/articles/${item.slug}?s=${query}&category=${category}&topic=${topic}`} className="hover:underline">
              {item.title}
            </Link>
          </h3>
          <div className="mt-2 flex items-center gap-2 text-sm text-[#647c96]">
            <span>Published:</span>
            <span>{dateFormatter(item.publish_date, "MMMM D, YYYY")}</span>
          </div>
          <p className="mt-3 text-base leading-relaxed text-[#334c67] font-sans">
            {truncate(item.description_text, 320, "...")}
          </p>
          <div className="mt-4 border-t border-[#dae4ef] pt-3">
            <Link
              href={`/articles/${item.slug}?s=${query}&category=${category}&topic=${topic}`}
              className="text-sm text-[#0571c6] hover:underline"
            >
              /{item.slug}
            </Link>
          </div>
        </article>
      ))}

      { data?.total && data.total > 0 && (
        <div className="mt-6 flex justify-end">
          <Pagination
            currentPage={page} 
            itemsPerPage={data?.per_page || 0}
            onPageChange={(selectedPage) => {
                setPage(selectedPage);
            }}
            total={data?.total}
          />
        </div>
      ) }
    </>
  )
}

export default CategoryMaterialSearchResultRelated
