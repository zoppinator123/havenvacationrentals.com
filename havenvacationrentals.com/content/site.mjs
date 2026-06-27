/* Global site configuration. Brand tokens live in CSS; this is content/data. */

export const SITE = {
  name: "Haven Vacation Rentals",
  shortName: "Haven",
  baseUrl: "https://havenvacationrentals.com",
  tagline: "Smoky Mountain vacation rental management, run by a local team.",
  // Phone (verified asset from build spec)
  phone: "865-263-7366",
  phoneTel: "+1-865-263-7366",
  email: "info@havenvacationrentals.com", // confirm before production
  // Social (verified assets)
  social: {
    facebook: "https://www.facebook.com/HavenVacations",
    instagram: "https://www.instagram.com/havenvacations/",
  },
  // External destinations
  links: {
    contact: "/contact-us/",
    guestSite: "https://stay.havenvacationrentals.com",
    investmentListings: "/smoky-mountain-str-investment-listings/",
    blog: "/blog/",
    regulationsGuide: "/sevier-county-short-term-rental-regulations-2026-guide/",
  },
  // Real logo assets (host self-hosted/WebP for production; see README)
  logo: {
    dark: "https://havenvacationrentals.com/wp-content/uploads/2023/07/Haven-Logo-Black-Transparent-4.png",
    footer: "https://havenvacationrentals.com/wp-content/uploads/2023/07/Haven-Logo-Black-Transparent-2.png",
  },
  // NAP — street address is an open item for Jack (see README). Keep identical
  // across every page, the GBP, and all citations once confirmed.
  address: {
    region: "TN",
    country: "US",
    locality: "Sevierville", // serving the greater Smoky Mountains
  },
  foundingYear: "2016",
  ogImageDefault: "/assets/og/hub.png", // generic brand card; per-page images override this
};

/* Headline proof points (confirm exact figures with Jack before publishing). */
export const PROOF = [
  { value: "70%", label: "Average occupancy vs ~55% market average" },
  { value: "~30%", label: "Ahead of market on revenue" },
  { value: "4.9★", label: "From 3,400+ five-star guest reviews" },
  { value: "2016", label: "Locally owned in the Smokies since" },
];

/* Primary navigation (desktop bar). City spokes are linked sitewide via the
   footer, the hub/home Service Areas cards, and each page's cross-links, and
   are added to the mobile drawer under a "Service areas" group. */
export const NAV = [
  { label: "Property Management", href: "/property-management/" },
  { label: "Invest", href: "/smoky-mountain-str-investment-listings/" },
  { label: "Blog", href: "/blog/" },
  { label: "Contact", href: "/contact-us/" },
];

/* Service-area links (4 spokes) shown in the mobile drawer. */
export const SERVICE_AREA_NAV = [
  { label: "Gatlinburg", href: "/vacation-rental-management-gatlinburg/" },
  { label: "Pigeon Forge", href: "/vacation-rental-management-pigeon-forge/" },
  { label: "Sevierville", href: "/vacation-rental-management-sevierville/" },
  { label: "Wears Valley", href: "/vacation-rental-management-wears-valley/" },
];

/* Full-service management offering (shared service grid). */
export const SERVICES = [
  { icon: "calendar", title: "Bookings & calendar", desc: "We list, sync, and optimize your calendar across Airbnb, Vrbo, Booking.com, and direct, so every open night works hard." },
  { icon: "chartUp", title: "Smart human pricing", desc: "A real revenue manager who knows this market adjusts your rates daily around demand, events, and seasonality." },
  { icon: "megaphone", title: "Marketing & listings", desc: "Professional photography, written-to-convert listings, and multi-channel distribution that puts your cabin in front of more guests." },
  { icon: "broom", title: "Housekeeping & turnovers", desc: "Vetted local cleaners, hotel-grade standards, and inspected turnovers between every stay." },
  { icon: "headset", title: "24/7 guest communication", desc: "We answer guests fast, day or night, so small questions never become bad reviews." },
  { icon: "wrench", title: "Maintenance & contractors", desc: "We coordinate trusted local trades and handle issues before they reach you or your guests." },
  { icon: "bank", title: "Direct deposit payouts", desc: "Clean monthly owner statements and reliable direct-deposit payouts. No surprises, no nickel-and-diming." },
  { icon: "star", title: "Reviews & reputation", desc: "A guest-obsessed experience that earns the five-star reviews that drive future bookings and revenue." },
];

/* Five brand pillars (reused with local framing on each page). */
export const PILLARS = [
  { title: "A local team", body: "We are based right here in the Smoky Mountains, not in a call center three time zones away. When something needs a person on-site, we are minutes from your door." },
  { title: "One simple flat fee", body: "A single, transparent management fee. No hidden booking fees, no markups on cleaning, no nickel-and-diming. You always know exactly what you pay and what you earn." },
  { title: "Smart human pricing", body: "A real revenue manager who knows this market sets your rates, not just an algorithm guessing from afar. That is how Haven owners run ahead of the market." },
  { title: "Guest-obsessed", body: "A five-star guest experience is the engine of profit. Happy guests leave five-star reviews, rebook, and refer, which lifts your ranking and your rate." },
  { title: "Smaller, so we try harder", body: "We deliberately manage a select group of homes well rather than thousands poorly. Your property gets attention a national manager cannot match." },
];

/* 3-step onboarding flow (shared). */
export const PROCESS = [
  { title: "We evaluate your property", body: "A local expert reviews your home, your market, and your numbers, then shows you what it can realistically earn under professional management." },
  { title: "We make profitable improvements", body: "We recommend the high-return upgrades, photography, and amenities that move your listing up the rankings and lift your nightly rate." },
  { title: "You start earning more", body: "We take over bookings, pricing, guests, cleaning, and maintenance. You watch the calendar fill and the deposits land, without the day-to-day work." },
];

/* Footer navigation groups. */
export const FOOTER_GROUPS = [
  {
    heading: "Service areas",
    links: [
      { label: "Gatlinburg", href: "/vacation-rental-management-gatlinburg/" },
      { label: "Pigeon Forge", href: "/vacation-rental-management-pigeon-forge/" },
      { label: "Sevierville", href: "/vacation-rental-management-sevierville/" },
      { label: "Wears Valley", href: "/vacation-rental-management-wears-valley/" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Property Management", href: "/property-management/" },
      { label: "STR Investment Listings", href: "/smoky-mountain-str-investment-listings/" },
      { label: "Blog", href: "/blog/" },
      { label: "Contact", href: "/contact-us/" },
    ],
  },
  {
    heading: "For guests",
    links: [
      { label: "Browse cabins to book", href: "https://stay.havenvacationrentals.com" },
      { label: "Sevier County STR Rules (2026)", href: "/sevier-county-short-term-rental-regulations-2026-guide/" },
    ],
  },
];

export const CTA_PRIMARY = { label: "Book a Call About Your Property", href: "/contact-us/" };
