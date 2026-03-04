import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="border-t border-[#264a72] bg-[linear-gradient(180deg,#0f3a67_0%,#0b2f53_100%)] text-white">
      <div className="mx-auto grid w-full max-w-[1180px] gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <h3 className="text-xl font-bold">science.ph</h3>
          <p className="mt-3 text-sm text-[#d4e0ed]">
            Science information portal for news, opportunities, and innovation updates in the
            Philippines.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold">Quick Links</h3>
          <div className="mt-3 flex flex-col gap-2 text-sm text-[#d4e0ed]">
            <Link href="#">News & Blog</Link>
            <Link href="#">Videos</Link>
            <Link href="#">Scholarships</Link>
            <Link href="#">Contact</Link>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold">Connect</h3>
          <p className="mt-3 text-sm text-[#d4e0ed]">Email: info@science.ph</p>
          <p className="mt-1 text-sm text-[#d4e0ed]">Facebook: facebook.com/scienceph</p>
          <p className="mt-1 text-sm text-[#d4e0ed]">YouTube: youtube.com/@scienceph</p>
        </div>
      </div>
      <div className="border-t border-white/15 px-4 py-4 text-center text-xs text-[#c7d6e5]">
        Copyright 2026 science.ph. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer