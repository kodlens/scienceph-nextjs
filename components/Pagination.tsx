"use client";
import ReactPaginate from 'react-paginate'



const Pagination = ({ itemsPerPage }: { itemsPerPage: number }) => {


  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={(item) => {
          console.log(item);
        }}
        containerClassName='flex justify-center items-center gap-2'
        pageLinkClassName="px-3 py-2 border border-blue-200 rounded-md hover:bg-gray-200 transition hover:cursor-pointer" 
        activeClassName='text-white py-1 rounded-md bg-[#c92a2a] border-none'

        pageRangeDisplayed={5}
        pageCount={10}
        previousLabel="<"
        previousLinkClassName='border font-bold px-3 py-2 border-blue-200 rounded-md hover:bg-gray-200 transition hover:cursor-pointer'
        nextLinkClassName='border border-blue-200 font-bold px-3 py-2 rounded-md hover:bg-gray-200 transition hover:cursor-pointer'
        renderOnZeroPageCount={null}
      />
    </>
  );
}

export default Pagination