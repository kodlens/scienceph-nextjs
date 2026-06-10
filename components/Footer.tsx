import Link from 'next/link'
import { fetchFromLaravel } from '@/lib/api'
import type { Category } from '@/types/category'

async function getCategories() {
  try {
    return await fetchFromLaravel<Category[]>("load-categories", 60);
  } catch (error) {
    console.error("Failed to load footer categories:", error);
    return [];
  }
}

const siteLinks = [
  { label: "Home", href: "/" },
  { label: "Search", href: "/search" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact-us" },
];

const contentLinks = [
  { label: "All Materials", href: "/search?type=all" },
  { label: "Articles", href: "/search?type=articles" },
  { label: "Videos", href: "/search?type=videos" },
  { label: "People", href: "/search?type=people" },
];

const Footer = async () => {
  const categories = await getCategories();

  return (
    <footer className="border-t border-[#264a72] bg-[linear-gradient(180deg,#0f3a67_0%,#0b2f53_100%)] text-white">
      <div className="mx-auto grid w-full max-w-295 gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div className="max-w-sm">
          <h2 className="text-xl font-bold">DOST-STII KM</h2>
          <p className="mt-3 text-sm text-[#d4e0ed]">
            Science information portal for news, opportunities, and innovation updates in the
            Philippines.
          </p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide">
            Discover Knowledge. Inspire Innovation.
          </p>
        </div>

        <nav aria-labelledby="footer-site-map">
          <h2 id="footer-site-map" className="text-sm font-bold uppercase tracking-wide text-white">
            Sitemap
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-[#d4e0ed]">
            {siteLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-white hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-content">
          <h2 id="footer-content" className="text-sm font-bold uppercase tracking-wide text-white">
            Browse Content
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-[#d4e0ed]">
            {contentLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-white hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-categories">
          <h2 id="footer-categories" className="text-sm font-bold uppercase tracking-wide text-white">
            Categories
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-[#d4e0ed]">
            {categories.length > 0 ? (
              categories.slice(0, 8).map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/category/${category.slug}`}
                    className="transition hover:text-white hover:underline"
                  >
                    {category.category}
                  </Link>
                </li>
              ))
            ) : (
              <li>
                <Link href="/search" className="transition hover:text-white hover:underline">
                  Explore Categories
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/15 px-4 py-4 text-center text-xs text-[#c7d6e5]">
        Copyright km.stii.dost.gov.ph.
      </div>
    </footer>
  )
}

export default Footer
