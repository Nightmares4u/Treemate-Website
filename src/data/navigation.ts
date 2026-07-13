export interface NavLink {
  name: string;
  href: string;
}
export const navigationLinks: NavLink[] = [
  { name: "Software & AI", href: "/software-ai" },
  { name: "HR Solutions", href: "/hr-solutions" },
  { name: "BPO Services", href: "/bpo-services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];
export const footerNavigation = {
  services: [
    { name: "Software & AI", href: "/software-ai" },
    { name: "HR Solutions", href: "/hr-solutions" },
    { name: "BPO Services", href: "/bpo-services" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
};
