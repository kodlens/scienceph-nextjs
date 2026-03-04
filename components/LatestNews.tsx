import Image from 'next/image'
import RevealOnScroll from './RevealOnScroll'

const LatestNews = () => {

  const sideNews = [
    {
      title: "Budget limits cap DOST scholarships to 8,500",
      date: "Thu Feb 05 2026",
      snippet: "Program review continues as applications increase nationwide.",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=500&q=60",
    },
    {
      title: "TELACon 2026 explores what is next for Philippine fabrics",
      date: "Tue Feb 03 2026",
      snippet: "Research and industry leaders discuss sustainability and design.",
      image:
        "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=500&q=60",
    },
    {
      title: "SM Group trains first on GeoRiskPH",
      date: "Tue Feb 03 2026",
      snippet: "Enterprise-level risk mapping training expands in the private sector.",
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=500&q=60",
    },
    {
      title: "DSWD marks 3.3M stockpile of food packs",
      date: "Mon Feb 02 2026",
      snippet: "Preparedness inventory reaches a new operational threshold.",
      image:
        "https://images.unsplash.com/photo-1524074963764-98fdaa6e3355?auto=format&fit=crop&w=500&q=60",
    },
    {
      title: "DOST expands STEM hubs in regional state universities",
      date: "Sun Feb 01 2026",
      snippet: "Laboratory and maker-space support is rolling out across priority campuses.",
      image:
        "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=500&q=60",
    },
    {
      title: "New weather stations boost disaster early warning systems",
      date: "Sat Jan 31 2026",
      snippet: "Additional sensor nodes now feed real-time data to local monitoring centers.",
      image:
        "https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=500&q=60",
    },
    {
      title: "Scholarship portal gets mobile-friendly application flow",
      date: "Fri Jan 30 2026",
      snippet: "Applicants can now complete submission and tracking on smaller devices.",
      image:
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=500&q=60",
    },
    {
      title: "Local health labs receive upgraded genomic analysis tools",
      date: "Thu Jan 29 2026",
      snippet: "Equipment investment strengthens disease surveillance capabilities.",
      image:
        "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=500&q=60",
    },
    {
      title: "Clean energy pilot sites report stronger efficiency gains",
      date: "Wed Jan 28 2026",
      snippet: "Technical monitoring shows better output across selected facilities.",
      image:
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=500&q=60",
    },
    {
      title: "Marine science teams launch nationwide coral data campaign",
      date: "Tue Jan 27 2026",
      snippet: "Field teams coordinate reef observations for long-term protection planning.",
      image:
        "https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=500&q=60",
    },
  ];

  return (
    <section className="mx-auto w-full max-w-[1180px] px-4 pt-8 pb-10 md:pt-10">
      <div className="overflow-hidden rounded-2xl border border-[#cfddeb] bg-white shadow-[0_18px_42px_-28px_rgba(10,57,102,0.55)]">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr]">
          <article className="border-b border-[#d9e5f1] lg:border-b-0 lg:border-r">
            <div className="h-[320px] w-full bg-[linear-gradient(135deg,#0b4f8a,#2f89cf)]" />
            <div className="p-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#b32626]">Feature Story</p>
              <h3 className="text-2xl font-bold leading-tight text-[#0f365f] md:text-3xl">
                DOE leadership, nuclear forum, and electric planning updates
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#4d5f74]">
                Highlights from recent policy discussions and technical briefings shaping national
                energy priorities.
              </p>
            </div>
          </article>

          <aside className="max-h-130 overflow-y-auto divide-y divide-[#dee8f2]">
            <div className="flex items-center justify-between px-4 py-3">
              <h2 className="text-lg font-bold text-[#123a63]">Latest News</h2>
              <span className="rounded-full border border-[#f4c2c2] bg-[#fff3f3] px-2.5 py-1 text-[11px] font-semibold text-[#b32626]">
                Updated
              </span>
            </div>
            {sideNews.map((item, index) => (
              <RevealOnScroll
                key={item.title}
                as="article"
                delay={index * 90}
                className="px-4 py-3 transition hover:bg-[#f8fbff]"
              >
                <div className="flex gap-3">
                  <Image
                    src={item.image}
                    alt={item.title}
                    height={80}
                    width={96}
                    loading="lazy"
                    className="h-20 w-24 flex-none rounded-md border border-[#d5e4f2] object-cover"
                  />
                  <div>
                    <p className="text-xs font-medium text-[#6a7f97]">{item.date}</p>
                    <h4 className="mt-1 text-base font-bold leading-tight text-[#0f4f89]">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-sm text-[#4e6074]">{item.snippet}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </aside>
        </div>
      </div>
    </section>
  )
}

export default LatestNews