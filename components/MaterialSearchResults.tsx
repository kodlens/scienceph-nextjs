import { dateFormatter, truncate } from '@/lib/utils'
import { Material } from '@/types/material'
import Link from 'next/link'

const MaterialSearchResults = ( { data }: { data: Material[] }) => {
  return (
    <>
    { Array.isArray(data) && data.length > 0 ? (
            
            data.map((item:Material) => (
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
            ) }
    </>
  )
}

export default MaterialSearchResults