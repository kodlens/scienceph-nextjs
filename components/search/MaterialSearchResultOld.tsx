"use client"

import { dateFormatter, truncate } from '@/lib/utils'
import { ApiResponseWithMeta, Material } from '@/types/material'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import Pagination from '../Pagination';
import { PaginateResponse } from '@/types/laravelResponse';


type Props = {
  query: string;
  category: string;
  topic: string;
};

const MaterialSearchResultsOthers = ({ query, category, topic }: Props) => {

  const [data, setData] = useState<PaginateResponse<Material>>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);

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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search-others?${params}`, {
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

  
  return (
    <>
      {Array.isArray(data?.data) && data.data.length > 0 ? (

        data?.data.map((item: Material) => (
          <article
            key={item.id}
            className="rounded-2xl border border-[#cfd9e3] bg-white p-5 shadow-sm md:p-6 mb-4"
          >
            <h3 className="text-xl font-extrabold leading-tight text-[#005ea8] md:text-2xl">
              <Link href={`/articles/${item.slug}`} className="hover:underline">
                {item.title}
              </Link>
            </h3>
            <div className="mt-2 flex items-center gap-2 text-sm text-[#647c96]">
              <span>Published:</span>
              <span>{dateFormatter(item.publish_date, "MMMM D, YYYY")}</span>
            </div>
            <p className="mt-3 text-base leading-relaxed text-[#334c67]">
              {truncate(item.description_text, 320, "...")}
            </p>
            <div className="mt-4 border-t border-[#dae4ef] pt-3">
              <Link
                href={`/articles/${item.slug}`}
                className="text-sm text-[#0571c6] hover:underline"
              >
                /{item.slug}
              </Link>
            </div>
          </article>
        ))

      ) : (
        <div className="rounded-2xl border border-dashed border-[#cfd9e5] bg-white p-10 text-center">
          <h3 className="text-xl font-bold text-[#1a3552]">No results found</h3>
          <p className="mt-2 text-base text-[#5a6f87]">
            Try broader keywords or check your spelling.
          </p>
        </div>
      )}


      {/* pagination */}
      <div className="mt-6 flex justify-center">
        <Pagination 
          itemsPerPage={data?.per_page || 0}
          onPageChange={(selectedPage) => {
            setPage(selectedPage);
          }}
          total={data?.total}
        />
      </div>
    </>
  )
}

export default MaterialSearchResultsOthers