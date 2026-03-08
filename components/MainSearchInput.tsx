'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

const MainSearchInput = () => {
    const router = useRouter()

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        // Implement search functionality here
        const value = (e.target as HTMLInputElement).value
        router.push(`/search?s=${encodeURIComponent(value)}`)
      }
    }


  return (
    <div className="mt-6 w-full max-w-230 rounded-full p-2 shadow-xl">
      <div className="flex items-center gap-3 rounded-full border border-[#efc2c2] bg-white pr-3 pl-6 py-2">
        <span className="text-[#4b6f94]">Search</span>
        <input
          type="text"
          placeholder="Try: scholarships, climate adaptation, engineering"
          className="w-full border-none bg-transparent text-base text-[#1f2937] outline-none placeholder:text-[#95a3b3]"
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <button
          type="button"
          className="rounded-full bg-[#c92a2a] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#ab1f1f]"
        >
          Search
        </button>
      </div>
    </div>
  )
}

export default MainSearchInput