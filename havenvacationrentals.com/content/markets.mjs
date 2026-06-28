/* Per-market FACTUAL data, authored directly from the build spec (Section 8)
   so permits/fees/taxes/zoning are accurate. The unique narrative prose,
   FAQs, and meta are generated separately and merged from
   content/generated/<slug>.json at build time (see build.mjs).

   Style: no em dashes; owner-facing "trusted advisor" voice.
   Verify fast-moving tax/fee figures against the official source before
   production (see README open items). */

export const MARKETS = [
  /* ------------------------------------------------------------------ */
  {
    slug: "gatlinburg",
    city: "Gatlinburg",
    region: "TN",
    shortName: "Gatlinburg",
    primaryKeyword: "vacation rental management Gatlinburg",
    secondaryKeywords: [
      "Gatlinburg property management",
      "Gatlinburg cabin rental management",
      "Airbnb management Gatlinburg TN",
      "short term rental property management Gatlinburg",
    ],
    snapshotStats: [
      { value: "$321", label: "Smoky Mountains average nightly rate (ADR)" },
      { value: "Airbnb", label: "Superhost guest care" },
      { value: "~30", unit: "%", label: "Ahead of market on revenue with Haven" },
      { value: "~1", unit: "%", label: "Supply growth in 2026 (an execution market)" },
    ],
    snapshotTable: [
      { label: "Typical nightly rate (ADR)", value: "Around the ~$321 Smokies average, higher for in-town and view cabins" },
      { label: "Occupancy opportunity", value: "Professional management with Superhost-level guest care" },
      { label: "Top demand drivers", value: "Great Smoky Mountains National Park gateway, the Parkway, Ober Mountain, peak summer, fall color, and holidays" },
      { label: "Supply trend (2026)", value: "Growth cooled to about 1% year over year, so wins come from operations, not a rising tide" },
      { label: "The Haven advantage", value: "Local pricing, a five-star guest experience, and one flat fee that lifts net revenue" },
    ],
    regItems: [
      { icon: "doc", title: "Tourist Residency Permit (TRP)", body: "Gatlinburg requires a Tourist Residency Permit before you can rent. The base fee is $200 for properties with two bedrooms or fewer, plus $75 for each additional bedroom. Applications are handled at the Gatlinburg Customer Service Center at 912 East Parkway or by mail to City Hall." },
      { icon: "clipboardCheck", title: "Fire and building inspection", body: "A fire and building inspection is required before the city issues your permit, and the permit renews annually. Haven schedules, prepares for, and stands in for these inspections so you do not have to." },
      { icon: "tag", title: "Lodging taxes around 12.75%", body: "Combined tax runs about 12.75%: 9.75% state and local sales tax plus a 3% county lodging tax. Airbnb collects the 9.75% automatically, but the 3% county lodging tax is self-remitted monthly to the Sevier County Trustee by the 20th. Vrbo and direct bookings require you to remit all of it." },
      { icon: "compass", title: "Zoning matters before you buy", body: "Short-term rentals are prohibited in R-1A and R-2A zones and allowed in R-3 high-density residential, tourism development zones, and commercial C-1 and C-2 districts. Always verify a parcel's zoning before you purchase." },
      { icon: "clock", title: "89-day stay limit, no night cap", body: "Each stay must be 89 days or fewer, but there is no annual cap on the number of nights you can rent. That keeps a well-run Gatlinburg cabin earning year-round." },
      { icon: "bank", title: "Property tax reclassification", body: "An STR that is not your principal residence can be reclassified from residential (25% assessment ratio) to commercial (40%), which raises the assessed value and your tax bill. We help you plan for it." },
    ],
    regCallout: {
      title: "Gatlinburg is stable and STR-friendly in 2026",
      body: "There are no active local crackdowns, though state bills SB 104 and HB 109 are worth monitoring. Haven tracks every rule change so your cabin stays compliant and earning.",
    },
    palette: "gatlinburg",
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "pigeon-forge",
    city: "Pigeon Forge",
    region: "TN",
    shortName: "Pigeon Forge",
    primaryKeyword: "vacation rental management Pigeon Forge",
    secondaryKeywords: [
      "Pigeon Forge property management",
      "Pigeon Forge cabin management",
      "Airbnb management Pigeon Forge",
      "STR management Pigeon Forge TN",
    ],
    snapshotStats: [
      { value: "$321", label: "Smoky Mountains average nightly rate (ADR)" },
      { value: "12", label: "Maximum guests per property under city rules" },
      { value: "Airbnb", label: "Superhost guest care" },
      { value: "~30", unit: "%", label: "Ahead of market on revenue with Haven" },
    ],
    snapshotTable: [
      { label: "Typical nightly rate (ADR)", value: "Around the ~$321 Smokies average, with strong premiums for larger group cabins" },
      { label: "Occupancy opportunity", value: "Professional management with Superhost-level guest care" },
      { label: "Top demand drivers", value: "Dollywood, The Island, the Parkway entertainment corridor, and year-round family and group travel" },
      { label: "Occupancy cap", value: "City rules allow 2 guests per bed, 2 beds per room, and a property maximum of 12 people" },
      { label: "The Haven advantage", value: "Group-cabin pricing, fast guest response, and a flat fee with no booking-fee markups" },
    ],
    regItems: [
      { icon: "doc", title: "Transient Rental Registration", body: "Pigeon Forge requires a Transient Rental Registration, cited at $125 initial and $75 annual renewal, with an STRU permit application fee cited at $300. We complete and maintain the paperwork on your behalf." },
      { icon: "users", title: "Occupancy is capped at 12", body: "The city limits occupancy to 2 guests per bed and 2 beds per room, with an overall property maximum of 12 people. Marketing and pricing have to respect that cap, and Haven sets your listing up to do exactly that." },
      { icon: "compass", title: "R-1 zoning and grandfathering", body: "New short-term rental development is restricted in R-1 residential districts. Properties operating as STRs before August 13, 2018 with a valid permit at that time may be grandfathered. If you are buying in R-1, verify the property has an active grandfathered permit and that it transfers with the sale." },
      { icon: "checkCircle", title: "Generally permitted in R-2 and commercial", body: "Outside R-1, short-term rentals are generally permitted in R-2 and higher residential districts and in all commercial zones. We help you confirm a parcel's status before you commit." },
      { icon: "tag", title: "City business license and lodging tax", body: "A city business license runs $35 base plus $3 per $1,000 of gross receipts, on top of the roughly 12.75% combined lodging tax that applies across Sevier County. Haven handles registration, collection, and remittance." },
    ],
    regCallout: {
      title: "In R-1? Confirm the grandfathered permit transfers",
      body: "A grandfathered Pigeon Forge permit is only valuable if it is active and conveys with the sale. Haven verifies permit status as part of onboarding so you are never caught operating without authority.",
    },
    palette: "pigeon-forge",
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "sevierville",
    city: "Sevierville",
    region: "TN",
    shortName: "Sevierville",
    primaryKeyword: "vacation rental management Sevierville",
    secondaryKeywords: [
      "Sevierville property management",
      "Sevierville cabin rental management",
      "Airbnb management Sevierville TN",
    ],
    snapshotStats: [
      { value: "$321", label: "Smoky Mountains average nightly rate (ADR)" },
      { value: "Airbnb", label: "Superhost guest care" },
      { value: "~30", unit: "%", label: "Ahead of market on revenue with Haven" },
      { value: "2016", label: "Locally owned in the Smokies since" },
    ],
    snapshotTable: [
      { label: "Typical nightly rate (ADR)", value: "Around the ~$321 Smokies average, with newer large builds commanding more" },
      { label: "Occupancy opportunity", value: "Professional management with Superhost-level guest care" },
      { label: "Top demand drivers", value: "Newer construction, outlet shopping, the Tennessee Smokies ballpark, and an affordable gateway to the Park" },
      { label: "Why owners like it", value: "Lower entry prices and newer assets that respond well to professional management" },
      { label: "The Haven advantage", value: "We maximize a newer build with smart pricing, strong listings, and a five-star guest experience" },
    ],
    regItems: [
      { icon: "doc", title: "STR Operational Permit", body: "Sevierville requires a Short-Term Rental Operational Permit. The initial application fee is $150 and the annual renewal is $50. Haven files it and keeps it current for you." },
      { icon: "flame", title: "Mandatory fire department inspection", body: "A life-safety inspection by the Sevierville Fire Department is required before approval and again every year. We prepare your cabin, schedule the inspection, and make sure it passes the first time." },
      { icon: "clipboardCheck", title: "City business license", body: "Properties within Sevierville city limits need a city business license. We handle registration and renewals as part of full-service management." },
      { icon: "tag", title: "Lodging taxes around 12.75%", body: "Sevierville cabins carry the same roughly 12.75% combined lodging tax as the rest of Sevier County. Haven collects and remits it correctly across every booking channel." },
      { icon: "chartUp", title: "An emerging value market", body: "Sevierville offers newer construction and more affordable entry prices with strong revenue performance, which makes it ideal for owners who want professional management to get the most out of a newer asset." },
    ],
    regCallout: {
      title: "Newer build? Make it perform like one",
      body: "Sevierville's newer cabins reward sharp pricing and a five-star guest experience. Haven turns a great asset into a great-earning one, and keeps the fire inspection and permit on schedule.",
    },
    palette: "sevierville",
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "wears-valley",
    city: "Wears Valley",
    region: "TN",
    shortName: "Wears Valley",
    primaryKeyword: "vacation rental management Wears Valley",
    secondaryKeywords: [
      "Wears Valley cabin management",
      "short term rental management Wears Valley TN",
      "Sevier County cabin property management",
    ],
    snapshotStats: [
      { value: "6,500", label: "Rentals operating outside the cities in Sevier County" },
      { value: "$250", label: "County STRU permit per year (sleeping 12 or fewer)" },
      { value: "Airbnb", label: "Superhost guest care" },
      { value: "2024", label: "County permit program in effect since January 1" },
    ],
    snapshotTable: [
      { label: "Jurisdiction", value: "Unincorporated Sevier County, so county rules apply, not Gatlinburg or Pigeon Forge city rules" },
      { label: "Typical nightly rate (ADR)", value: "Around the ~$321 Smokies average, with a premium for secluded, view, and luxury cabins" },
      { label: "Occupancy opportunity", value: "Professional management with Superhost-level guest care" },
      { label: "Top demand drivers", value: "Quiet, nature-forward settings, National Park access at Metcalf Bottoms, and the Foothills Parkway" },
      { label: "The Haven advantage", value: "A responsive local manager who meets the county's 60-minute contact expectation and keeps you off the Three Strikes list" },
    ],
    regItems: [
      { icon: "compass", title: "County rules, not city rules", body: "Wears Valley is unincorporated, so it follows Sevier County rules. A cabin can have a Pigeon Forge or Gatlinburg mailing address and still sit outside city limits, which changes everything. Verify the parcel's jurisdiction on the Sevier County GIS map before any paperwork." },
      { icon: "doc", title: "County STRU operational permit", body: "An annual Short-Term Rental Unit permit from the Sevier County Fire Marshal's Office is required. It is $250 per year for properties sleeping 12 or fewer, and $250 plus $25 per additional occupant for 13 or more. Operating without one carries a $50 per day penalty. The program has been in effect since January 1, 2024." },
      { icon: "flame", title: "Annual life-safety inspection", body: "The county hired eight full-time inspectors working by district, and the permit is issued only after a life-safety inspection passes. Inspectors check interconnected UL-217 smoke alarms, CO alarms within 15 feet of every bedroom door, a tagged 2A:10BC extinguisher on every level, proper egress from each sleeping room, four-inch street numbers, a gas grill on a 60-minute timer at least 18 inches from the structure, and sprinklers for homes sleeping more than 12." },
      { icon: "shield", title: "The Three Strikes policy", body: "Under the Three Strikes policy (T.C.A. § 13-7-604), a permit can be revoked after three documented violations for noise, trash, or parking. A responsive local manager who answers fast is genuinely valuable here, and that is exactly what Haven provides." },
      { icon: "key", title: "Permits can transfer with a sale", body: "If the permit is kept current and never lapses, it can pass with the sale of the property. We keep yours active and inspection-ready so your asset stays sellable and compliant." },
    ],
    regCallout: {
      title: "Check your jurisdiction before you do anything else",
      body: "A Wears Valley cabin almost always falls under county rules even with a city mailing address. Confirm the parcel on the Sevier County GIS map first. Haven handles the county permit, the inspection checklist, and the fast local response the county expects.",
    },
    palette: "wears-valley",
  },
];

export const MARKET_BY_SLUG = Object.fromEntries(MARKETS.map((m) => [m.slug, m]));
