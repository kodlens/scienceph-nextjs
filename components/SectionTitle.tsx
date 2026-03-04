import React from 'react'

const SectionTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => {
  return (
     <div className="mb-5 flex items-end justify-between gap-3">
      <div>
        <h2 className="text-2xl font-black tracking-tight text-[#10233f] md:text-3xl">{title}</h2>
        {subtitle ? <p className="mt-1 text-sm text-[#5a6f88]">{subtitle}</p> : null}
      </div>
    </div>
  )
}

export default SectionTitle