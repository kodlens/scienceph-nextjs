import { CircleQuestionMark } from 'lucide-react'

type Props = {
    title: string;
    message: string;
}
const InfoChip = ( { title, message }: Props) => {
  return (
    <div className="group relative mx-3">
    <button
        type="button"
        aria-label="Show newer articles info"
        className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#cfd9e5] bg-white text-[#5f6b78] shadow-sm transition hover:border-[#93aac3] hover:text-[#2f3f52] hover:shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9ca3af] focus-visible:ring-offset-2"
    >
        <CircleQuestionMark size={15} strokeWidth={2.2} />
    </button>

    <div
        role="tooltip"
        className="pointer-events-none absolute left-1/2 top-full z-20 mt-3 w-80 -translate-x-1/2 rounded-2xl border border-[#d7dee8] bg-white px-4 py-3 text-sm leading-6 text-[#3f4d5d] opacity-0 shadow-[0_16px_36px_-18px_rgba(20,45,73,0.45)] transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
    >
        <p className="font-semibold text-[#27384b]">{title}</p>
        <p className="mt-1">
        {message}
        </p>
    </div>
    
    </div>
  )
}

export default InfoChip