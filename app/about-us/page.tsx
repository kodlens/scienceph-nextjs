import SectionTitle from "@/components/SectionTitle";

const aboutParagraphs = [
  "science.ph project is testament to the commitment of the Department of Science and Technology (DOST) in promoting science and technology awareness in the Philippines. It is both a search engine and a free, comprehensive information website that contains \"everything science\" in the Philippines, hence the tagline \"Science for every Juan.\"",
  "It was developed with an eye toward researchers, teachers, students, communicators, or any individual wishing to know about the latest breakthroughs and developments in the Philippine science scene. However, what makes this unique from other search engines is the availability of \"hidden web\" information, or information untouched by search engines since it resides in a database, accessible only through content partnerships.",
  "science.ph is created and maintained by the Science and Technology Information Institute (STII), the information arm of the DOST system. Contributing to its expanding content are IT, communication and S&T professionals and library specialists who tirelessly maintain and update these valuable information.",
  "The site transcends the corporate features of agencies identified by their mandates and areas of responsibility such as the DOST system. It is envisioned to cover practically everything about science in the country. It offers everyone free access to its existing databases with links to numerous science sites all over the worldwide web.",
  "In 2006, a team of DOST-STII technical staff conceptualized and launched the science.ph project despite limited resources. The science.ph project was originally intended not as a corporate website nor a web search engine but as an online search service. The site offered access to more than 65 specialized databases of the DOST while retaining their geographic and heterogeneous implementation.",
  "The science.ph is alive. The site's graphics, layout, and other visual designs may change as it continues to grow and evolve. It shall be regularly updated with photos and videos of interviews, press conferences, as well as promotional and instructional materials. It is physically located at the DOST Compound in Bicutan, Taguig City.",
];

const logoParagraphs = [
  "The science.ph logo consists of blue and red semi-circles connected to each other, representing a continuing search for knowledge through strong partnership. In the middle is an eight-ringed yellow atom with a solid nucleus symbolizing the firm core of the Philippine science community, with three electrons moving about symbolizing the action, freedom, and dynamism of Filipinos.",
  "It also contains an artistic take on the Philippine flag to reinforce its meaning as our true national symbol of Filipino pride.",
];

export default function AboutUsPage() {
  return (
    <main className="mx-auto w-full max-w-295 px-4 py-10">
      <section className="rounded-2xl border border-[#cfdeeb] bg-white p-6 shadow-sm md:p-8">
        <SectionTitle
          title="About Us"
          subtitle="Learn more about science.ph, its purpose, and how it supports science communication in the Philippines."
        />

        <div className="rounded-xl border border-[#d8e3ef] bg-[linear-gradient(180deg,#f8fbff_0%,#f3f8fd_100%)] p-4 md:p-5">
          <div className="space-y-4 text-sm leading-7 text-[#4f6378] md:text-base">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* <section className="mt-6 rounded-2xl border border-[#cfdeeb] bg-white p-6 shadow-sm md:p-8">
        <SectionTitle
          title="About the Logo"
          subtitle="The symbols and colors represent the identity and mission of science.ph."
        />

        <div className="grid gap-4 md:grid-cols-[220px_1fr]">
          <div className="grid h-40 place-content-center rounded-xl border border-[#d8e3ef] bg-[#f8fbff]">
            <div className="grid h-20 w-20 place-content-center rounded-full bg-[linear-gradient(135deg,#0ea5e9,#2563eb)] text-xl font-bold text-white">
              SP
            </div>
          </div>

          <div className="rounded-xl border border-[#d8e3ef] bg-[#fdfefe] p-4">
            <div className="space-y-4 text-sm leading-7 text-[#4f6378] md:text-base">
              {logoParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section> */}
    </main>
  );
}
