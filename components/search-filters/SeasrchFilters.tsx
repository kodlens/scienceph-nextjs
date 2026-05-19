"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  query: string;
  category: string;
  topic: string;
  type: string;
};

type FilterChipProps = {
  label: string;
  value: string;
  tone: string;
  onRemove: () => void;
};

const typeTabs = [
  { label: "All", value: "all" },
  { label: "Articles", value: "articles" },
  { label: "Videos", value: "videos" },
  { label: "People", value: "people" },
];

function formatFilterLabel(value: string): string {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function FilterChip({ label, value, tone, onRemove }: FilterChipProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-bold shadow-sm ${tone}`}
    >
      <span className="uppercase tracking-[0.18em] opacity-70">{label}</span>
      <span className="max-w-52 truncate text-sm font-extrabold normal-case tracking-normal opacity-100">
        {formatFilterLabel(value)}
      </span>
      <button
        type="button"
        aria-label={`Remove ${label.toLowerCase()} filter`}
        onClick={onRemove}
        className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/75 text-current transition hover:bg-white"
      >
        <X size={14} strokeWidth={2.5} />
      </button>
    </div>
  );
}

const SearchFilters = ({ query, category, topic, type }: Props) => {
  const router = useRouter();
  const selectedType = (type || "all").toLowerCase();
  const hasFilters = Boolean(query || category || topic || selectedType !== "all");

  const updateFilters = (updates: Partial<Record<"s" | "category" | "topic" | "type", string>>) => {
    const params = new URLSearchParams(window.location.search);

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
        return;
      }
      params.delete(key);
    });

    const queryString = params.toString();
    router.push(queryString ? `/search?${queryString}` : "/search");
  };

  return (
    <div className="w-full rounded-[28px] border border-[#d6e0eb] bg-white px-4 py-4 shadow-[0_16px_36px_-28px_rgba(8,52,97,0.45)]">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {typeTabs.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => updateFilters({ type: tab.value })}
              className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
                selectedType === tab.value
                  ? "border-[#f1b2b2] bg-[#fff0f0] text-[#a32020]"
                  : "border-[#cad8e7] bg-[#f7fbff] text-[#2c4f72] hover:bg-[#edf5fd]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => router.push("/search")}
          className="inline-flex items-center justify-center rounded-full border border-[#d9e3ee] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#45637e] transition hover:border-[#b8cada] hover:bg-[#f6f9fc] hover:text-[#183b61]"
        >
          Clear all
        </button>
      </div>

      {hasFilters && <div className="my-4 border-t border-[#e4ecf5]" />}

      <div className="flex flex-wrap gap-2.5">
        {selectedType !== "all" && (
          <FilterChip
            label="Type"
            value={selectedType}
            tone="border-[#d8cfee] bg-[#f4effd] text-[#56358b]"
            onRemove={() => updateFilters({ type: "all" })}
          />
        )}

        {query && (
          <FilterChip
            label="Search"
            value={query}
            tone="border-[#f2c3c3] bg-[#fff2f2] text-[#a02727]"
            onRemove={() => updateFilters({ s: "" })}
          />
        )}

        {category && (
          <FilterChip
            label="Category"
            value={category}
            tone="border-[#cfe0f2] bg-[#edf5fd] text-[#114878]"
            onRemove={() => updateFilters({ category: "" })}
          />
        )}

        {topic && (
          <FilterChip
            label="Topic"
            value={topic}
            tone="border-[#eadfce] bg-[#fff7eb] text-[#8a531a]"
            onRemove={() => updateFilters({ topic: "" })}
          />
        )}
      </div>
    </div>
  );
};

export default SearchFilters;
