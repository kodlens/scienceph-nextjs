const OfficeMap = () => {
  return (
    <section className="mx-auto w-full max-w-295 px-4 pb-12">
      <div className="grid gap-4 rounded-2xl border border-[#cfdeeb] bg-white p-4 shadow-sm lg:grid-cols-[1fr_1.4fr]">
        <div className="rounded-xl border border-[#d5e2ef] bg-[#f8fbff] p-4">
          <h2 className="text-2xl font-bold text-[#0f4e8b]">Office Location</h2>
          <p className="mt-3 text-sm leading-6 text-[#4f6378]">
            DOST Complex, General Santos Avenue, Bicutan, Taguig City, Metro Manila
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-[#cadef1] bg-white px-3 py-1 text-xs font-semibold text-[#0f4e8b]">
              Mon - Fri
            </span>
            <span className="rounded-full border border-[#cadef1] bg-white px-3 py-1 text-xs font-semibold text-[#0f4e8b]">
              8:00 AM - 5:00 PM
            </span>
          </div>
          <p className="mt-4 text-sm text-[#4f6378]">Tel: 837-21-91</p>
        </div>

        <div className="overflow-hidden rounded-xl border border-[#d2deea]">
          <iframe
            title="Science PH Office Map"
            src="https://www.google.com/maps?q=DOST%20Taguig&output=embed"
            width="100%"
            height="340"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block"
          />
        </div>
      </div>
    </section>
  )
}

export default OfficeMap