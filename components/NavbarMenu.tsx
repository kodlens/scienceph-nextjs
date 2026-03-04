"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";


type NavbarProps = {
    label: string;
    slug: string;
    href: string;
    dropdown?: {
      label: string;
      href: string;
    }[];
  };


const Navbar = ( { menu } : { menu: NavbarProps[] } ) => {
  const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null);
  const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setOpenDesktopMenu(null);
        setOpenMobileMenu(null);
        setIsMobileOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenDesktopMenu(null);
        setOpenMobileMenu(null);
        setIsMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <nav ref={navRef} className="relative w-full text-sm font-semibold tracking-wide md:w-auto">
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={isMobileOpen}
        onClick={() => setIsMobileOpen((prev) => !prev)}
        className="inline-flex items-center rounded-md px-3 py-2 transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 md:hidden"
      >
        <span className="mr-2">Menu</span>
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" aria-hidden>
          {isMobileOpen ? (
            <path d="M6 6L18 18M18 6L6 18" strokeWidth="2" strokeLinecap="round" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" strokeWidth="2" strokeLinecap="round" />
          )}
        </svg>
      </button>

      <div className="hidden items-center gap-1 md:flex">
        {menu.map((item) => {
          const isOpen = openDesktopMenu === item.label;

          return (
            <div
              key={item.slug}
              className="relative"
              onMouseEnter={() => item.dropdown && setOpenDesktopMenu(item.label)}
              onMouseLeave={() => item.dropdown && setOpenDesktopMenu(null)}
            >
              {item.dropdown ? (
                <button
                  type="button"
                  aria-expanded={isOpen}
                  className="inline-flex items-center rounded-md px-3 py-2 transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                  onClick={() => setOpenDesktopMenu((prev) => (prev === item.label ? null : item.label))}
                >
                  {item.label}
                  <span className="ml-1.5 text-[10px]">v</span>
                </button>
              ) : (
                <Link
                  href={item.href}
                  className="inline-flex items-center rounded-md px-3 py-2 transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                >
                  {item.label}
                </Link>
              )}

              {item.dropdown ? (
                <div
                  className={`absolute left-0 top-full z-70 mt-2 min-w-70 max-w-85 overflow-hidden rounded-lg border border-[#d7e5f3] bg-white shadow-2xl transition-all duration-150 ${
                    isOpen ? "visible opacity-100" : "invisible opacity-0"
                  }`}
                >
                  <div className="grid grid-cols-1 gap-0">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        onClick={() => setOpenDesktopMenu(null)}
                        className="block border-b border-[#edf3f8] px-4 py-3 text-sm leading-5 font-medium text-[#1f2937] whitespace-normal break-words last:border-b-0 hover:bg-[#f3f8fd] hover:text-[#005299]"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {isMobileOpen ? (
        <div className="absolute left-0 right-0 top-full z-80 mt-2 w-full overflow-hidden rounded-lg border border-[#d7e5f3] bg-white shadow-2xl md:hidden">
          {menu.map((item) => {
            const isOpen = openMobileMenu === item.label;

            if (!item.dropdown) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="block border-b border-[#edf3f8] px-4 py-3 text-sm font-semibold text-[#1f2937] last:border-b-0 hover:bg-[#f3f8fd] hover:text-[#005299]"
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <div key={item.label} className="border-b border-[#edf3f8] last:border-b-0">
                <button
                  type="button"
                  onClick={() => setOpenMobileMenu((prev) => (prev === item.label ? null : item.label))}
                  className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-[#1f2937] hover:bg-[#f3f8fd] hover:text-[#005299]"
                >
                  {item.label}
                  <span className="text-[10px]">{isOpen ? "^" : "v"}</span>
                </button>

                {isOpen ? (
                  <div className="bg-[#f9fcff]">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        onClick={() => {
                          setOpenMobileMenu(null);
                          setIsMobileOpen(false);
                        }}
                        className="block border-t border-[#edf3f8] px-6 py-2.5 text-sm leading-5 font-medium text-[#1f2937] whitespace-normal break-words hover:bg-[#f3f8fd] hover:text-[#005299]"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      ) : null}
    </nav>
  );
};

export default Navbar;
