"use client"
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react'


type Props = {
  query: string;
}
const InputSearch = ({ query }: Props) => {
  const router = useRouter()
  const [search, setSearch] = React.useState(query || '')
  const [isPending, startTransition] = useTransition()

  const goToPage = (key: string) => {
    if (!key.trim()) return

    startTransition(() => {
      router.push(`/search?s=${encodeURIComponent(key)}`)
    })
  }
  return (
    <div className="flex items-center gap-3 rounded-full w-full border border-[#efc2c2] bg-white pr-3 pl-8 py-2
        focus-within:ring-2 focus-within:ring-red-400 focus-within:ring-offset-1 transition">

      <span className="text-[#4b6f94] font-bold">Search: </span>

      <input
        type="text"
        placeholder="Try: science and technology, climate adaptation, engineering"
        className="w-full border-none bg-transparent text-base text-[#1f2937] font-sans
          outline-none placeholder:text-[#95a3b3] placeholder:italic"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            if(isPending) return
            goToPage(search);
          }
        }}
      />

      <button
        disabled={isPending}
        onClick={() => goToPage(search)}
        className={`rounded-full bg-[#c92a2a] px-4 py-2 w-37.5 text-md 
          font-semibold text-white transition hover:bg-[#ab1f1f] ${isPending ? 'cursor-not-allowed opacity-50' : ''}`}>
        Search
      </button>
    </div>
  )
}

export default InputSearch