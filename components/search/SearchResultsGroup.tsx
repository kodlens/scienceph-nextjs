"use client";

import { useState } from "react";
import MaterialSearchResultsLatest from "./MaterialSearchResultLatest";
import MaterialSearchResultsOthers from "./MaterialSearchResultOthers";

type Props = {
  query: string;
  category: string;
  topic: string;
  type: string;
};

const SearchResultsGroup = ({ query, category, topic, type }: Props) => {
  const [latestCount, setLatestCount] = useState<number | null>(null);
  const [othersCount, setOthersCount] = useState<number | null>(null);

  const showNoResults = latestCount === 0 && othersCount === 0;

  return (
    <>
      <MaterialSearchResultsLatest
        query={query}
        category={category}
        topic={topic}
        type={type}
        onCountChange={setLatestCount}
      />

      <div className="mt-4">
        <MaterialSearchResultsOthers
          query={query}
          category={category}
          topic={topic}
          type={type}
          onCountChange={setOthersCount}
        />
      </div>

      {showNoResults && (
        <div className="rounded-2xl border border-dashed border-[#cfd9e5] bg-white px-6 py-10 text-center text-[#5a6f87]">
          <p className="text-lg font-bold text-[#2a4868]">No results found</p>
          <p className="mt-1 text-sm">Try changing your search, type, or category filters.</p>
        </div>
      )}
    </>
  );
};

export default SearchResultsGroup;
