"use client";

import { dateFormatter, truncate } from '@/lib/utils';
import { Material } from '@/types/material';
import Link from 'next/link';
import { useEffect, useState } from 'react'
type Props = {
  slug: string;
};

const RelevantArticles = ({ slug }: Props) => {

  const [data, setData] = useState<Material[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);


  const loadSearchLatest = async (): Promise<void> => {
    if (!process.env.NEXT_PUBLIC_API_URL) {
      console.error("Missing NEXT_PUBLIC_API_URL");
      return;
    }
    try {

      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/load-related-material/${slug}`, {
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
      setData(data || []);


      setLoading(false);
    } catch (error: unknown) {
      console.error('Error fetching category counts:', error);
      setError('Error fetching category counts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSearchLatest();
  }, [slug]);
  

  if (loading) {
    return <div className='text-sm'>Loading...</div>;
  }


  return (
    <div className="space-y-3">
      { data?.map((item: Material) => (
        <Link
          href="#"
          key={item.slug}
          className="block rounded-lg border border-[#dbe6f1] bg-[#fbfdff] p-3 transition hover:border-[#c7d9ea] hover:bg-[#f5f9fd]"
        >
          
          <p className="text-[11px] font-semibold uppercase tracking-wide text-[#b32626]">
            {typeof item.category === "string" ? item.category : item.category?.category || "General"}
          </p>
          <h3 className="mt-1 text-sm font-bold leading-5 text-[#0f4f89]">
            {truncate(item.title, 90, "...")}
          </h3>
          <p className="mt-1 text-xs text-[#6a7f97]">{dateFormatter(item.created_at)}</p>
        </Link>
      ))}
    </div>
  )
}

export default RelevantArticles