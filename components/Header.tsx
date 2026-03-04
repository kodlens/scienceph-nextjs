import Navbar from "./navbar/Navbar"

const Header = () => {

  return (
    <header className="sticky top-0 z-120 overflow-visible border-b border-[#d8e3ef] bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-295 items-center justify-between gap-4 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-content-center rounded-xl bg-[linear-gradient(135deg,#0ea5e9,#2563eb)] text-lg font-bold text-white shadow-[0_12px_24px_-16px_rgba(37,99,235,0.7)]">
            SP
          </div>
          <div>
            <p className="text-2xl font-black leading-none text-[#14345a]">science.ph</p>
            <p className="text-xs tracking-wide text-[#cf2e2e]">Science for every Juan</p>
          </div>
        </div>

        <p className="hidden text-sm italic text-[#6e8097] lg:block">
          &quot;Exploring the Boundaries, Unlocking the Future: Science PH&quot;
        </p>

        <div className="hidden items-center gap-2 md:flex">
          <span className="rounded-full border border-[#c5d7ea] bg-[#f5f9fd] px-3 py-1 text-xs font-semibold text-[#1e4f81]">
            24/7 Access
          </span>
          <span className="rounded-full border border-[#c5d7ea] bg-[#f5f9fd] px-3 py-1 text-xs font-semibold text-[#1e4f81]">
            Verified Sources
          </span>
        </div>
      </div>

      <div className="relative z-50 overflow-visible border-y border-[#0e4a84] bg-[linear-gradient(90deg,#0f4f89,#1b6bb0)] shadow-[0_8px_20px_-14px_rgba(30,79,129,0.8)]">
        <div className="mx-auto flex w-full max-w-295 items-center justify-between overflow-visible px-4 py-2.5 text-white">

          <Navbar />

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Facebook"
              className="grid h-8 w-8 place-content-center rounded-full border border-white/45 bg-white/15 text-white transition hover:-translate-y-0.5 hover:bg-white/25"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                <path d="M14 8h2V5h-2c-2.2 0-4 1.8-4 4v2H8v3h2v5h3v-5h2.1l.4-3H13V9c0-.6.4-1 1-1z" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Instagram"
              className="grid h-8 w-8 place-content-center rounded-full border border-white/45 bg-white/15 text-white transition hover:-translate-y-0.5 hover:bg-white/25"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" aria-hidden>
                <rect x="4" y="4" width="16" height="16" rx="4" strokeWidth="2" />
                <circle cx="12" cy="12" r="3.5" strokeWidth="2" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="YouTube"
              className="grid h-8 w-8 place-content-center rounded-full border border-white/45 bg-white/15 text-white transition hover:-translate-y-0.5 hover:bg-white/25"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                <path d="M21 8.5a2.5 2.5 0 0 0-1.8-1.8C17.7 6.3 12 6.3 12 6.3s-5.7 0-7.2.4A2.5 2.5 0 0 0 3 8.5 26 26 0 0 0 3 12a26 26 0 0 0 .3 3.5 2.5 2.5 0 0 0 1.8 1.8c1.5.4 7.2.4 7.2.4s5.7 0 7.2-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 21 12a26 26 0 0 0-.3-3.5zM10 14.8V9.2L15 12l-5 2.8z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
