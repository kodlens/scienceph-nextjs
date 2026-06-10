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
          subtitle=""
        />

        <div className="rounded-xl border border-[#d8e3ef] bg-[linear-gradient(180deg,#f8fbff_0%,#f3f8fd_100%)] p-4 md:p-5">
          <div className="text-sm leading-7 text-[#4f6378] md:text-base">
            
            <div className="font-bold">
              DOST-STII Knowledge Management Hub
            </div>
            <p className="text-justify">
              The DOST-STII Knowledge Management Hub serves as a centralized digital platform for accessing, discovering, and sharing science, technology, and innovation (STI) information generated and curated by the Department of Science and Technology – Science and Technology Information Institute (DOST-STII).
            </p>

            <p className="text-justify">
              Designed to support knowledge dissemination and public engagement, the Hub brings together a diverse collection of information resources that document the programs, projects, activities, and achievements of the DOST and its attached agencies. Through a user-friendly and accessible platform, we connect researchers, policymakers, educators, students, media practitioners, and the general public with valuable STI knowledge and resources.
            </p>

            <div className="font-bold -mb-1 mt-4">
              What We Offer
            </div>
            <div>
              The Knowledge Management Hub provides access to:
            </div>
            <ul className="list-disc pl-5">
              <li>
                News articles and feature stories covering DOST initiatives, scientific breakthroughs, and innovation developments;
              </li>
              <li>
                DOST-produced videos, documentaries, interviews, and educational multimedia content;
              </li>
              <li>
                Event coverage, including conferences, forums, seminars, exhibits, and technology showcases;
              </li>
              <li>
                Information on DOST projects, programs, research initiatives, and technology interventions;
              </li>
              <li>
                Publications, reports, knowledge products, and other STI resources;
              </li>
              <li>
                Historical and institutional records that preserve and showcase DOST&apos;s contributions to national development.
              </li>
            </ul>


            <div className="font-bold mt-4">
              Our Purpose
            </div>
            <p className="text-justify">
              The Hub supports DOST-STII&apos;s mandate to collect, organize, preserve, and disseminate science and technology information. By transforming information into accessible knowledge resources, we help promote evidence-based decision-making, encourage innovation, and foster a culture of scientific awareness among Filipinos.
            </p>

            <div className="font-bold mt-4">
              Our Vision
            </div>
            <p className="text-justify">
              To be the premier gateway to trusted science, technology, and innovation knowledge that empowers learning, discovery, and national development.
            </p>


            <div className="font-bold mt-4">
              Our Commitment
            </div>
            <p className="text-justify">
              We are committed to making science and technology information more accessible, discoverable, and useful for everyone. Through continuous knowledge management and digital innovation, we strive to preserve institutional knowledge, strengthen information sharing, and support the advancement of science, technology, and innovation in the Philippines.
            </p>

            <blockquote className="border-l-4 border-blue-500 bg-blue-50 px-4 py-3 italic text-gray-700 rounded-r-md mt-4">
              “Discover Knowledge. Inspire Innovation.”
            </blockquote>
            

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
