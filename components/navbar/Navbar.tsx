import React from 'react'
import NavbarMenu from './NavbarMenu';
import { fetchFromLaravel } from '@/lib/api';
import { Category } from '@/types/category';

async function getCategories() {
  return fetchFromLaravel<Category[]>("load-categories", 60);
 
}





const Navbar = async() => {

   const categories = await getCategories(); // ✅ SSR fetch

   
const navItems = [
  { label: "Home", slug: "home", href: "/" },
  {
    label: "Categories",
    slug: "categories",
    href: "#",
    // dropdown: [
    //   { label: "Science", slug: "science", href: "#" },
    //   { label: "Medicine", slug: "medicine", href: "#" },
    //   { label: "Agriculture", slug: "agriculture", href: "#" },
    //   { label: "Technology", slug: "technology", href: "#" },
    //   { label: "Disaster Mitigation", slug: "disaster-mitigation", href: "#" },
    // ],
    dropdown: categories.map( (cat: { name: string; slug: string }) => ({
      label: cat.name,
      slug: cat.slug,
      href: `/category/${cat.slug}`
    }))
  },
  {
    label: "About",
    slug: "about-us",
    href: "/about-us",
    // dropdown: [
    //   { label: "Mission", slug: "mission", href: "#" },
    //   { label: "Leadership", slug: "leadership", href: "#" },
    //   { label: "Partners", slug: "partners", href: "#" },
    // ],
  },
  {
    label: "Contact Us",
    slug: "contact-us",
    href: "/contact-us",
  },
];


  return (
    <>
      <NavbarMenu menu={navItems} />
    </>
  )
}

export default Navbar