import { fetchFromLaravel } from "@/lib/api";
import { dateFormatter, truncate } from "@/lib/utils";
import { laravelResponse } from "@/types/laravelResponse";
import { Material } from "@/types/material";
import Link from "next/link";

async function getMaterialsByCategory(param: string) {
  const res = await fetchFromLaravel<laravelResponse<Material>>(`search-materials-by-category/${param}?perpage=${10}`, 300);
  return res;
}


type Props = {
  params: Promise<{ slug: string }>
}
const MaterialsPerCategory = async ({ params }: Props) => {

  const { slug } = await params;

  const materials = await getMaterialsByCategory(slug);


  console.log('slug', slug);
  return (
    <main className="min-h-screen bg-[#edf2f6]">
      {/* Here you would fetch and display the materials related to the category */}
      <div className="space-y-4">
        {materials?.data.map((item) => (
          <article
            key={item.id}
            className="rounded-2xl border border-[#cfd9e3] bg-[#f7f8fa] p-6 shadow-sm"
          >
            <h2 className="text-2xl font-extrabold leading-tight text-[#005ea8]">
              <Link href={`/articles/${item.slug}`} className="hover:underline">
                {item.title}
              </Link>
            </h2>
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
        ))}
      </div>
    </main>

  )
}

export default MaterialsPerCategory