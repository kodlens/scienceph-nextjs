import Link from "next/link";

const Navbar = () => {


  const navItems = [
    { label: "Home", href: "#" },
    {
      label: "Categories",
      href: "#",
      dropdown: [
        { label: "Science", href: "#" },
        { label: "Medicine", href: "#" },
        { label: "Agriculture", href: "#" },
        { label: "Technology", href: "#" },
        { label: "Disaster Mitigation", href: "#" },
      ],
    },
    {
      label: "About",
      href: "#",
      dropdown: [
        { label: "Mission", href: "#" },
        { label: "Leadership", href: "#" },
        { label: "Partners", href: "#" },
      ],
    },
    {
      label: "Contact",
      href: "#",
      dropdown: [
        { label: "Help Desk", href: "#" },
        { label: "Regional Offices", href: "#" },
        { label: "Media", href: "#" },
      ],
    },
  ];



  return (
    <nav className="flex flex-wrap items-center gap-1 text-sm font-semibold tracking-wide">
      {navItems.map((item) => (
        <div key={item.label} className="group relative">
          <Link
            href={item.href}
            className="inline-flex items-center rounded-md px-3 py-2 transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
          >
            {item.label}
            {item.dropdown ? <span className="ml-1.5 text-[10px]">v</span> : null}
          </Link>
          {item.dropdown ? (
            <div className="invisible absolute left-0 top-full z-[70] mt-2 min-w-[240px] overflow-hidden rounded-lg border border-[#d7e5f3] bg-white opacity-0 shadow-2xl transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              {item.dropdown.map((subItem) => (
                <Link
                  key={subItem.label}
                  href={subItem.href}
                  className="block border-b border-[#edf3f8] px-4 py-3 text-sm font-medium text-[#1f2937] last:border-b-0 hover:bg-[#f3f8fd] hover:text-[#005299]"
                >
                  {subItem.label}
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </nav>
  )
}

export default Navbar