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
      { value: "$347", label: "Average daily rate, AirDNA 2026" },
      { value: "53", unit: "%", label: "Average occupancy, AirDNA 2026" },
      { value: "$47.3K", label: "Average annual revenue, AirDNA 2026" },
      { value: "6,907", label: "Active STR listings, AirDNA May 2026" },
    ],
    snapshotTable: [
      { label: "Public STR data source", value: "AirDNA Gatlinburg, TN short-term rental data, 2026 (airdna.co/vacation-rental-data/app/us/tennessee/gatlinburg/overview), covering Airbnb, Vrbo, and Booking.com listings from June 2025 through May 2026" },
      { label: "Average daily rate (ADR)", value: "$347 per booked night" },
      { label: "Average occupancy", value: "53%" },
      { label: "Average annual revenue", value: "$47,300 per active listing" },
      { label: "Active short-term rental supply", value: "6,907 active listings as of May 2026" },
      { label: "AirDNA market score", value: "82 out of 100, based on demand, revenue growth, seasonality, regulation, and investability" },
      { label: "Top demand drivers", value: "Great Smoky Mountains National Park gateway, the Parkway, Ober Mountain, summer, fall color, holidays, and walkable in-town access" },
      { label: "Owner takeaway", value: "Gatlinburg is a large, competitive, high-demand STR market where pricing, reviews, location, and local operations decide who wins" },
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
      { value: "$335", label: "Average daily rate, AirDNA 2026" },
      { value: "53", unit: "%", label: "Average occupancy, AirDNA 2026" },
      { value: "$44K", label: "Average annual revenue, AirDNA 2026" },
      { value: "4,143", label: "Active STR listings, AirDNA May 2026" },
    ],
    snapshotTable: [
      { label: "Public STR data source", value: "AirDNA Pigeon Forge, TN short-term rental data, 2026 (airdna.co/vacation-rental-data/app/us/tennessee/pigeon-forge/overview), covering Airbnb, Vrbo, and Booking.com listings from June 2025 through May 2026" },
      { label: "Average daily rate (ADR)", value: "$335 per booked night" },
      { label: "Average occupancy", value: "53%" },
      { label: "Average annual revenue", value: "$44,000 per active listing" },
      { label: "Active short-term rental supply", value: "4,143 active listings as of May 2026" },
      { label: "AirDNA market score", value: "85 out of 100, based on demand, revenue growth, seasonality, regulation, and investability" },
      { label: "Top demand drivers", value: "Dollywood, The Island, the Parkway entertainment corridor, restaurants, attractions, youth sports, family travel, and large group trips" },
      { label: "Local operating constraint", value: "City rules cap occupancy at 2 guests per bed, 2 beds per room, and 12 total guests per property" },
      { label: "Owner takeaway", value: "Pigeon Forge is a strong family and group-travel market where legal occupancy, bedroom mix, amenities, and event pricing drive results" },
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
      { value: "$378", label: "Average daily rate, AirDNA 2026" },
      { value: "55", unit: "%", label: "Average occupancy, AirDNA 2026" },
      { value: "$51.5K", label: "Average annual revenue, AirDNA 2026" },
      { value: "13,449", label: "Active STR listings, AirDNA May 2026" },
    ],
    snapshotTable: [
      { label: "Public STR data source", value: "AirDNA Sevierville, TN short-term rental data, 2026 (airdna.co/vacation-rental-data/app/us/tennessee/sevierville/overview), covering Airbnb, Vrbo, and Booking.com listings from June 2025 through May 2026" },
      { label: "Average daily rate (ADR)", value: "$378 per booked night" },
      { label: "Average occupancy", value: "55%" },
      { label: "Average annual revenue", value: "$51,500 per active listing" },
      { label: "Active short-term rental supply", value: "13,449 active listings as of May 2026" },
      { label: "AirDNA market score", value: "89 out of 100, based on demand, revenue growth, seasonality, regulation, and investability" },
      { label: "Top demand drivers", value: "Newer cabin inventory, outlet shopping, The 407 Gateway, Smokies baseball, family groups, and easy access to Gatlinburg, Pigeon Forge, and the National Park" },
      { label: "Owner takeaway", value: "Sevierville is the broadest and highest-scoring public AirDNA market in the Smokies, with large supply and strong revenue upside for well-run cabins" },
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
      { value: "$247", label: "Nearest public ADR proxy, AirDNA Townsend 2026" },
      { value: "51", unit: "%", label: "Nearest public occupancy proxy, AirDNA Townsend 2026" },
      { value: "$33K", label: "Nearest public annual revenue proxy" },
      { value: "6,500", label: "Rentals operating outside Sevier County cities" },
    ],
    snapshotTable: [
      { label: "Jurisdiction", value: "Wears Valley is unincorporated Sevier County, so county rules apply, not Gatlinburg or Pigeon Forge city rules" },
      { label: "Public STR data source", value: "AirDNA does not publish a standalone Wears Valley page. The closest public quiet-side proxy is AirDNA Townsend, TN 2026 data (airdna.co/vacation-rental-data/app/us/tennessee/townsend/overview), while Sevier County permit data is used for jurisdiction and supply context." },
      { label: "Nearest public average daily rate (ADR) proxy", value: "$247 per booked night in Townsend, a nearby quiet-side Smokies market" },
      { label: "Nearest public occupancy proxy", value: "51% average occupancy in Townsend" },
      { label: "Nearest public annual revenue proxy", value: "$33,000 average annual revenue per active Townsend listing" },
      { label: "Nearby public listing supply proxy", value: "715 active Townsend short-term rental listings as of May 2026" },
      { label: "County STR supply context", value: "About 6,500 rentals operate outside the cities in unincorporated Sevier County" },
      { label: "Top demand drivers", value: "Quiet mountain settings, views, seclusion, National Park access at Metcalf Bottoms, Foothills Parkway, and guests who want the Smokies without the Parkway crowds" },
      { label: "Owner takeaway", value: "Wears Valley is more property-specific than city-center markets. Views, access, cabin quality, guest response, and county compliance matter more than generic averages" },
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
