import React from 'react'

const SearchInputAndHero = () => {
  return (
    <section
      className="relative z-0 overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(circle at 20% 20%, rgba(59,130,246,0.2), transparent 30%), radial-gradient(circle at 80% 20%, rgba(14,165,233,0.2), transparent 28%), linear-gradient(120deg, rgba(8,24,47,0.7), rgba(8,24,47,0.45)), url('/dost-hero.svg')",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="mx-auto flex h-130 w-full max-w-295 flex-col items-center justify-center px-4 text-white">
        <span className="mb-3 rounded-full border border-[#ffd2d2]/80 bg-[#cf2e2e]/85 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-sm">
          Knowledge Portal
        </span>
        <h1 className="max-w-3xl text-center text-3xl font-extrabold leading-tight md:text-5xl">
          Hi! How can we help you discover science today?
        </h1>

        <div className="mt-6 w-full max-w-230 rounded-full p-2 shadow-xl">
          <div className="flex items-center gap-3 rounded-full border border-[#efc2c2] bg-white pr-3 pl-6 py-2">
            <span className="text-[#4b6f94]">Search</span>
            <input
              type="text"
              placeholder="Try: scholarships, climate adaptation, engineering"
              className="w-full border-none bg-transparent text-base text-[#1f2937] outline-none placeholder:text-[#95a3b3]"
            />
            <button
              type="button"
              className="rounded-full bg-[#c92a2a] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#ab1f1f]"
            >
              Search
            </button>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {[
            { label: "All", active: true },
            { label: "News & Blog", active: false },
            { label: "Videos", active: false },
          ].map((tab) => (
            <button
              key={tab.label}
              className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition ${tab.active
                ? "border-[#f1b2b2] bg-[#fff0f0] text-[#a32020]"
                : "border-white/45 bg-white/18 text-white hover:bg-white/28"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SearchInputAndHero