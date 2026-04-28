"use client";

import { useRouter } from "next/navigation";



type Props = {
  query: string;
  category: string;
  topic: string;
}

const SearchFilters = ({ query, category, topic }: Props) => {
   const router = useRouter();
  return (
    <>
      {query && (
        <div className="ml-2 inline-flex items-center gap-1 rounded-full bg-[#dce5ef] px-3 py-2 text-xs font-extrabold text-[#114878]">
          {/* format query from slug */}
          {query.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
        </div>
      )}

      {category && (
        <div className="ml-2 inline-flex items-center gap-1 rounded-full bg-[#cce5ff] px-3 not-first-of-type:text-xs font-extrabold text-[#0b66b2]">
          {/* format category from slug */}
          {category.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
          <button className="ml-2 text-red-400 p-2 rounded-full" onClick={() => {
            // remove category from query params and navigate to new url
            const params = new URLSearchParams(window.location.search);
            params.delete("category");
            router.push(`/search?${params.toString()}`);
          }}>X</button>
        </div>
      )}

      {topic && (
        <div className="ml-2 inline-flex items-center gap-1 rounded-full bg-[#f6e3c8] px-3 text-xs font-extrabold text-[#9a5a11]">
          {/* format topic from slug */}
          {topic.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
          <button className="ml-2 text-red-400 p-2 rounded-full" onClick={() => {
            // remove topic from query params and navigate to new url
            const params = new URLSearchParams(window.location.search);
            params.delete("topic");
            router.push(`/search?${params.toString()}`);
          }}>X</button>
        </div>
      )}

    </>
  )
}

export default SearchFilters