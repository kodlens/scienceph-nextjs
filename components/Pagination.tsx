"use client";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import ReactPaginate from 'react-paginate'


type Props = {
  itemsPerPage: number;
  onPageChange: (selectedPage: number) => void;
  total: number| undefined;
  currentPage: number;
};

const Pagination = ({ itemsPerPage, onPageChange, total, currentPage }: Props) => {

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel={<ChevronRight size={15} />}
        nextLinkClassName='font-bold flex rounded-md transition hover:bg-red-900 hover:text-white py-2 px-2 hover:cursor-pointer'
        onPageChange={(item) => {
          //setPage((item.selected + 1));
          onPageChange(item.selected + 1);
        }}
        containerClassName='flex justify-center items-center gap-2'
        pageLinkClassName="px-3 py-2 rounded-md hover:bg-red-900  hover:text-white transition hover:cursor-pointer" 
        activeClassName='text-white py-2 rounded-md bg-[#c92a2a] border-none font-bold'
        pageClassName='font-bold text-xs'
        pageRangeDisplayed={5}
        pageCount={total ? Math.ceil(total / itemsPerPage) : 0}
        previousLabel={<ChevronLeft size={15} />}
        previousLinkClassName='font-bold flex rounded-md transition hover:bg-red-900 hover:text-white py-2 px-2 hover:cursor-pointer'
        forcePage={currentPage - 1}
        renderOnZeroPageCount={null}
      />
    </>
  );
}

export default Pagination