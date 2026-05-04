import SectionTitle from "@/components/SectionTitle";

export default function ContactUsPage() {
  return (
    <main className="mx-auto w-full max-w-295 px-4 py-10">
      <section className="rounded-2xl border border-[#cfdeeb] bg-white p-6 shadow-sm md:p-8">
        <SectionTitle
          title="Contact Us"
          subtitle="Questions, feedback, or partnership inquiries? Reach out and our team will get back to you."
        />

        <div className="space-y-4">
            <article className="rounded-xl border border-[#d5e2ef] bg-[#f8fbff] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#b32626]">Office</p>
              <h3 className="mt-1 text-lg font-bold text-[#123a63]">
                Department of Science and Technology
              </h3>
              <p className="text-sm text-[#4f6378]">Science and Technology Information Institute</p>
            </article>

            <article className="rounded-xl border border-[#d5e2ef] bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#b32626]">Address</p>
              <p className="mt-1 text-sm leading-6 text-[#4f6378]">
                Gen. Santos Ave., Upper Bicutan
                <br />
                Taguig City, 1631 Philippines
              </p>
            </article>

            <article className="rounded-xl border border-[#d5e2ef] bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#b32626]">Contact</p>
              <p className="mt-1 text-sm leading-6 text-[#4f6378]">
                Telephone: (02) 837-21-91
                <br />
                {/* Email: admin@stii.dost.gov.ph */}
              </p>
            </article>
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-[#cfdeeb] bg-white p-3 shadow-sm md:p-4">
        <div className="overflow-hidden rounded-xl border border-[#d2deea]">
          <iframe
            title="DOST Office Map"
            src="https://www.google.com/maps?q=Gen.+Santos+Ave.+Upper+Bicutan,+Taguig+City&output=embed"
            width="100%"
            height="420"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block w-full"
          />
        </div>
      </section>
    </main>
  );
}
