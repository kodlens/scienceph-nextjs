"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  query: string;
  category: string;
  topic: string;
};

type FilterChipProps = {
  label: string;
  value: string;
  tone: string;
  removable?: boolean;
  onRemove?: () => void;
};

function formatFilterLabel(value: string): string {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function FilterChip({ label, value, tone, removable = false, onRemove }: FilterChipProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-bold shadow-sm ${tone}`}
    >
      <span className="uppercase tracking-[0.18em] opacity-70">{label}</span>
      <span className="max-w-52 truncate text-sm font-extrabold normal-case tracking-normal opacity-100">
        {formatFilterLabel(value)}
      </span>
      {removable && onRemove ? (
        <button
          type="button"
          aria-label={`Remove ${label.toLowerCase()} filter`}
          onClick={onRemove}
          className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/75 text-current transition hover:bg-white"
        >
          <X size={14} strokeWidth={2.5} />
        </button>
      ) : null}
    </div>
  );
}

const CategorySearchFilter = ({ query, category, topic }: Props) => {
  const router = useRouter();

  const updateFilters = (updates: Partial<Record<"q" | "topic", string>>) => {
    const params = new URLSearchParams(window.location.search);

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
        return;
      }

      params.delete(key);
    });

    const queryString = params.toString();
    const basePath = `/category/${category}`;
    router.push(queryString ? `${basePath}?${queryString}` : basePath);
  };

  const hasFilters = Boolean(query || category || topic);

  if (!hasFilters) {
    return (
      <div className="rounded-2xl border border-dashed border-[#cfd9e5] bg-white/80 px-4 py-3 text-sm text-[#5a6f87]">
        No active filters.
      </div>
    );
  }

  return (
    <div className="w-full rounded-[28px] border border-[#d6e0eb] bg-white px-4 py-4 shadow-[0_16px_36px_-28px_rgba(8,52,97,0.45)]">
      <div className="mb-3 inline-flex items-center rounded-full bg-[#eff4f9] px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#45637e]">
        Filters
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-[#70839a]">
            Active Filters
          </p>
          <p className="mt-1 text-sm text-[#51647a]">
            Remove a chip to broaden this category view.
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.push(`/category/${category}`)}
          className="inline-flex items-center justify-center rounded-full border border-[#d9e3ee] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#45637e] transition hover:border-[#b8cada] hover:bg-[#f6f9fc] hover:text-[#183b61]"
        >
          Clear extra filters
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2.5">
        {query && (
          <FilterChip
            label="Query"
            value={query}
            tone="border-[#f2c3c3] bg-[#fff2f2] text-[#a02727]"
            removable
            onRemove={() => updateFilters({ q: "" })}
          />
        )}

        {category && (
          <FilterChip
            label="Category"
            value={category}
            tone="border-[#cfe0f2] bg-[#edf5fd] text-[#114878]"
          />
        )}

        {topic && (
          <FilterChip
            label="Topic"
            value={topic}
            tone="border-[#eadfce] bg-[#fff7eb] text-[#8a531a]"
            removable
            onRemove={() => updateFilters({ topic: "" })}
          />
        )}
      </div>
    </div>
  );
};

export default CategorySearchFilter;
