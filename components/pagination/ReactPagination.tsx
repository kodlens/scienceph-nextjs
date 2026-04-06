"use client";

import ReactPaginate from "react-paginate";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type ReactPaginationProps = {
  currentPage: number;
  lastPage: number;
  queryKey: string;
  queryValue?: string;
};

export default function ReactPagination({
  currentPage,
  lastPage,
  queryKey,
  queryValue,
}: ReactPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (lastPage <= 1) {
    return null;
  }

  return (
    <ReactPaginate
      pageCount={lastPage}
      forcePage={Math.max(0, currentPage - 1)}
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      breakLabel="..."
      previousLabel="Previous"
      nextLabel="Next"
      onPageChange={(selectedItem) => {
        const nextPage = selectedItem.selected + 1;
        const params = new URLSearchParams(searchParams.toString());

        params.set("page", String(nextPage));
        if (queryValue) {
          params.set(queryKey, queryValue);
        } else {
          params.delete(queryKey);
        }

        router.push(`${pathname}?${params.toString()}`);
      }}
      containerClassName="mt-6 flex flex-wrap items-center justify-center gap-2"
      pageClassName="rounded-lg border border-[#b8cada]"
      pageLinkClassName="block px-3 py-2 text-sm font-semibold text-[#2e4f70] hover:bg-[#e9f2fa]"
      activeClassName="border-[#0d6db8] bg-[#0d6db8]"
      activeLinkClassName="text-white hover:bg-transparent"
      previousClassName="rounded-lg border border-[#b8cada]"
      previousLinkClassName="block px-3 py-2 text-sm font-semibold text-[#2e4f70] hover:bg-[#e9f2fa]"
      nextClassName="rounded-lg border border-[#b8cada]"
      nextLinkClassName="block px-3 py-2 text-sm font-semibold text-[#2e4f70] hover:bg-[#e9f2fa]"
      disabledClassName="pointer-events-none border-[#d2dce8]"
      disabledLinkClassName="text-[#9db0c4] hover:bg-transparent"
      breakClassName="px-2 text-sm text-[#7b90a6]"
      renderOnZeroPageCount={null}
    />
  );
}
