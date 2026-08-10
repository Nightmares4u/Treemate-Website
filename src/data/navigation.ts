export interface NavLink {
  name: string;
  href: string;
}
export const navigationLinks: NavLink[] = [
  { name: "Software & AI", href: "/software-ai" },
  { name: "Marketing", href: "/marketing" },
  { name: "HR Solutions", href: "/hr-solutions" },
  { name: "Customer Success", href: "/customer-success" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];
export const footerNavigation = {
  services: [
    { name: "Software & AI", href: "/software-ai" },
    { name: "Marketing", href: "/marketing" },
    { name: "HR Solutions", href: "/hr-solutions" },
    { name: "Customer Success", href: "/customer-success" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
};
