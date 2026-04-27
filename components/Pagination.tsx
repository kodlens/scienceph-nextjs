"use client";
import { useState } from 'react';
import ReactPaginate from 'react-paginate'


type Props = {
  itemsPerPage: number;
  onPageChange: (selectedPage: number) => void;
};

const Pagination = ({ itemsPerPage, onPageChange }: Props) => {

  //const [page, setPage] = useState(0);

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={(item) => {
          //setPage((item.selected + 1));
          onPageChange(item.selected + 1);
        }}
        containerClassName='flex justify-center items-center gap-2'
        pageLinkClassName="px-3 py-2 border border-blue-200 rounded-md hover:bg-gray-200 transition hover:cursor-pointer" 
        activeClassName='text-white py-1 rounded-md bg-[#c92a2a] border-none'

        pageRangeDisplayed={5}
        pageCount={itemsPerPage}
        previousLabel="<"
        previousLinkClassName='border font-bold px-3 py-2 border-blue-200 rounded-md hover:bg-gray-200 transition hover:cursor-pointer'
        nextLinkClassName='border border-blue-200 font-bold px-3 py-2 rounded-md hover:bg-gray-200 transition hover:cursor-pointer'
        renderOnZeroPageCount={null}
      />
    </>
  );
}

export default Pagination