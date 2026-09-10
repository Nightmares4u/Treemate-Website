export const siteConfig = {
  name: "Treemate Growth Partners",
  shortName: "Treemate",
  tagline: "People-Powered. Tech-Enabled.",
  description:
    "Treemate is a hybrid IT consultancy and business process outsourcer serving the US market from Wyoming and Karachi. We build the software that runs a business, staff the people who manage it, and support the customers it serves.",
  domain: "treemate.us",
  /**
   * The canonical origin. This is the www host, not the apex: Vercel serves
   * www and 307-redirects every apex URL to it, and the Search Console
   * property is registered as https://www.treemate.us/. Canonical tags must
   * point at a URL that answers 200, not one that redirects.
   */
  url: "https://www.treemate.us",
  emails: {
    primary: "contact@treemate.us",
    sales: "sales@treemate.us",
    support: "support@treemate.us",
  },
  phone: {
    display: "+1 780 804 0473",
    href: "tel:+17808040473",
  },
  address: {
    line1: "30 N Gould St, Ste R",
    city: "Sheridan",
    state: "WY",
    zip: "82801",
    country: "United States",
    full: "30 N Gould St, Ste R, Sheridan, WY 82801",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=30+N+Gould+St+Ste+R+Sheridan+WY+82801",
  },
  /** Where we actually are: Wyoming contracts the work, Karachi delivers it. */
  offices: [
    {
      city: "Sheridan",
      region: "Wyoming, USA",
      role: "HQ & contracting",
      tz: "America/Denver",
    },
    {
      city: "Karachi",
      region: "Pakistan",
      role: "Operations & delivery",
      tz: "Asia/Karachi",
    },
  ],
  social: {
    linkedin: "https://www.linkedin.com/company/treemate-us/posts/",
    instagram: "https://www.instagram.com/treemate.us/",
    facebook: "https://www.facebook.com/treemate0",
  },
  hours: "24/7 coverage · Headquartered in the Mountain Time Zone",
  founded: 2024,
};
export type SiteConfig = typeof siteConfig;
