export interface NavLink {
  name: string;
  href: string;
}

export const navigationLinks: NavLink[] = [
  { name: "BPO Solutions", href: "/bpo-solutions" },
  { name: "Human Capital", href: "/human-capital" },
  { name: "AI & Software", href: "/ai-services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export const footerNavigation = {
  services: [
    { name: "BPO Solutions", href: "/bpo-solutions" },
    { name: "Human Capital", href: "/human-capital" },
    { name: "AI & Software", href: "/ai-services" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
};
