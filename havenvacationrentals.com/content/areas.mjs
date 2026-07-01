/* Extended service-area pages: additional Smoky Mountain markets and the
   best-known cabin communities, beyond the four primary city spokes in
   markets.mjs. These do NOT live in MARKETS on purpose, so the homepage and
   hub keep their clean "four markets" story and the footer/drawer stay short.
   They are linked from the /service-areas/ index, the hub, and their parent
   city pages.

   DATA INTEGRITY: regulations and market stats are only stated where they are
   verifiable. Townsend uses real, sourced AirDNA Townsend figures and is in
   BLOUNT County (different rules from the Sevier County cities). Neighborhood
   pages lead with community character and Haven's genuine "confirm your
   parcel's exact jurisdiction first" value, and link out to the correct rules,
   rather than asserting a fabricated per-neighborhood permit table.

   Style: no em dashes, owner-facing trusted-advisor voice. */

export const AREAS = [
  /* ============================ TOWNSEND (city) ============================ */
  {
    slug: "townsend",
    name: "Townsend",
    kind: "city",
    county: "Blount County",
    associatedCity: null,
    primaryKeyword: "vacation rental management Townsend",
    heroPhoto: "wearsValleyCabin",
    metaTitle: "Vacation Rental Management in Townsend, TN | Haven",
    metaDescription:
      "Vacation rental management Townsend TN on the quiet side of the Smokies. AirDNA market data, Blount County rules, Cades Cove demand, and a local Haven team.",
    heroEyebrow: "The peaceful side of the Smokies",
    h1: "Vacation Rental Management in Townsend, TN",
    heroSubhead:
      "Townsend is the quiet gateway to Cades Cove, and it rewards a very different playbook than the Parkway markets. Haven runs your cabin like locals who know the difference.",
    introHeading: "Townsend is a quieter market, and that changes the strategy",
    introParagraphs: [
      "Townsend calls itself the peaceful side of the Smokies, and that is exactly why guests choose it. It is the closest town to Cades Cove and the Townsend entrance of Great Smoky Mountains National Park, so your guests come for tubing on the Little River, wildlife, hiking, and a slower pace than Pigeon Forge or Gatlinburg. That guest profile books differently, stays differently, and reviews differently, and a manager who treats Townsend like a Parkway market will leave money on the table.",
      "The tradeoff is a smaller, more seasonal demand pool and a lower average nightly rate than the busy city markets, so occupancy strategy, standout photography, and a genuinely five-star guest experience matter even more here. This is a market where operational excellence, not a rising tide, decides how your cabin performs.",
      "Haven is a local team, not a national call center, and we build a Townsend cabin's calendar and pricing around how this specific market actually behaves. Our local team covers the entire operation, so your net stays clean.",
    ],
    snapshot: {
      heading: "The Townsend market at a glance",
      paragraphs: [
        "Townsend runs a lower average daily rate than the Parkway markets, which is normal for a quieter, nature-forward destination. The winning move here is not chasing the highest possible rate on a summer weekend, it is keeping the calendar full across the shoulder seasons with sharp pricing and a listing that converts browsers into bookers.",
        "Because Townsend sits in Blount County rather than Sevier County, its rules and taxes differ from Gatlinburg, Pigeon Forge, and Sevierville. We cover that below. The figures here are the public AirDNA read for Townsend, and your specific cabin's potential depends on its location, size, views, and condition.",
      ],
      stats: [
        { value: "$247", label: "Average daily rate, AirDNA 2026" },
        { value: "51", unit: "%", label: "Average occupancy, AirDNA 2026" },
        { value: "$33K", label: "Average annual revenue, AirDNA 2026" },
        { value: "715", label: "Active STR listings, AirDNA May 2026" },
      ],
      table: [
        { label: "Public STR data source", value: "AirDNA Townsend, TN short-term rental data, 2026 (airdna.co/vacation-rental-data/app/us/tennessee/townsend/overview), covering Airbnb, Vrbo, and Booking.com listings" },
        { label: "Average daily rate (ADR)", value: "$247 per booked night" },
        { label: "Average occupancy", value: "51%" },
        { label: "Average annual revenue", value: "$33,000 per active listing" },
        { label: "Active short-term rental supply", value: "715 active listings as of May 2026" },
        { label: "AirDNA reporting period", value: "Trailing twelve months June 2025 through May 2026 (AirDNA Townsend overview, updated 2026)" },
        { label: "City STR permit (2026)", value: "City of Townsend short-term rental permit: $250 per year with annual renewal and inspection, per city ordinance adopted May 2026 (60-day application window for existing operators)" },
        { label: "Occupancy tax (2026)", value: "3% City of Townsend occupancy tax on overnight stays effective May 1, 2026, plus 9.75% state and local sales tax in Townsend. Combined lodging-related taxes are typically higher than the ~12.75% common in Sevier County resort cities. Confirm the current total with City Hall." },
        { label: "Jurisdiction", value: "City of Townsend and Blount County, not Sevier County. Rules and lodging taxes differ from the Parkway markets" },
        { label: "Top demand drivers", value: "Cades Cove, the Townsend Park entrance, Little River tubing, the Foothills Parkway, Metcalf Bottoms, and guests who want the Smokies without the crowds" },
        { label: "Owner takeaway", value: "Townsend rewards full calendars, strong listings, and five-star guest care more than raw peak-weekend rate. A local operator is the edge" },
      ],
    },
    character: null,
    regHeading: "Townsend and Blount County rules, handled for you",
    regParagraphs: [
      "This is the most important thing to understand about Townsend: it is in Blount County, not Sevier County, so it does not follow Gatlinburg, Pigeon Forge, or Sevierville rules. Owners who assume the Sevier County playbook applies here get it wrong.",
      "In practice that means a Blount County business license, a City of Townsend short-term rental permit ($250 per year with renewal and inspection under the city's 2026 ordinance), and lodging taxes that stack higher than the roughly 12.75% owners see across Sevier County. A 3% City occupancy tax on overnight stays took effect May 1, 2026, on top of 9.75% state and local sales tax in Townsend. Townsend's zoning framework provides for tourist residences through the city permit program, but rules evolve quickly. Always confirm current requirements, zoning, and tax rates with the City of Townsend (cityoftownsend.com/wp/short-term-rentals/) and the Blount County Clerk before you rely on them.",
      "Haven registers your property correctly, collects and remits the right taxes on every booking channel, and keeps your paperwork current, so a Townsend cabin stays compliant and earning without you tracking two different county systems.",
    ],
    regDisclaimer:
      "This summary is general guidance and is current as of mid-2026. Townsend and Blount County rules and tax rates can change. Confirm details with the City of Townsend and Blount County, or let Haven handle it for you.",
    whyHeading: "Why Townsend owners choose Haven",
    whyParagraphs: [
      "A quiet market is exactly where a responsive, on-the-ground team earns its keep. When a guest has a question at 9pm or a cabin needs a person on-site, we are minutes away, not three time zones removed. That responsiveness is what turns a Townsend stay into a five-star review, and reviews are what drive ranking and repeat bookings in a smaller market.",
      "We price your Townsend cabin like a professional who knows this market, market the listing to the right guest, and keep turnovers inspected and hotel-clean. All of it is handled by one local team, with clean monthly statements and direct-deposit payouts.",
    ],
    faqs: [
      { q: "Do you manage vacation rentals in Townsend, TN?", a: ["Yes. Haven provides full-service vacation rental management in Townsend and across the greater Smoky Mountains. We handle listings, pricing, guest communication, cleaning, maintenance, and compliance, all in one place. Because we are local, we can be on-site quickly when your Townsend cabin needs hands-on attention."] },
      { q: "Are Townsend's short-term rental rules different from Gatlinburg or Pigeon Forge?", a: ["Yes, and this is important. Townsend is in Blount County, not Sevier County, so it does not follow the Sevier County city rules. The business license, permitting, and lodging tax structure are different. We manage the correct Blount County requirements for you and confirm current rules before we rely on them."] },
      { q: "What lodging taxes apply to a Townsend rental?", a: ["Townsend rentals carry state and local sales tax (9.75% in Townsend per published rate tables) plus a 3% City occupancy tax on overnight stays that began May 1, 2026. Additional county lodging components may apply depending on your parcel. The combined figure is typically higher than the roughly 12.75% common across Sevier County cities. We verify the current rate with City Hall and collect and remit correctly across Airbnb, Vrbo, Booking.com, and direct bookings."] },
      { q: "How much can a Townsend cabin earn?", a: ["The public AirDNA read for Townsend shows an average daily rate near $247 and about 51% occupancy, which is lower than the Parkway markets because Townsend is a quieter, more seasonal destination. Your specific potential depends on location, size, views, and condition. We build a realistic estimate for your cabin during a no-pressure call."] },
      { q: "What kind of guest books in Townsend?", a: ["Townsend draws guests who want the Smokies without the crowds: Cades Cove visitors, Little River tubers, hikers, and families looking for a slower pace. That profile rewards a full calendar and a genuinely five-star experience over chasing the highest possible peak-weekend rate, which is exactly how we operate here."] },
      { q: "How do I get started with Haven in Townsend?", a: ["It starts with a single call. We look at your property and the Townsend market, show you what it can realistically earn, then handle the switch end to end. If Haven is not the right fit, you keep the estimate for free."] },
    ],
    closingHeading: "Let's talk about your Townsend cabin",
    closingParagraph:
      "Townsend is a market that rewards a local team that knows how it actually behaves. Book a no-pressure call and we will show you what your cabin can earn on the peaceful side of the Smokies.",
    relatedCities: ["gatlinburg", "pigeon-forge", "sevierville", "wears-valley"],
  },

  /* ========================= CHALET VILLAGE (nbhd) ========================= */
  {
    slug: "chalet-village",
    name: "Chalet Village",
    kind: "neighborhood",
    county: "Sevier County",
    associatedCity: "Gatlinburg",
    associatedCitySlug: "gatlinburg",
    primaryKeyword: "Chalet Village cabin management",
    heroPhoto: "heroExterior",
    metaTitle: "Chalet Village Cabin Management, Gatlinburg | Haven",
    metaDescription:
      "Chalet Village cabin management on Ski Mountain, Gatlinburg TN. Local pricing, winter demand near Ober, and Gatlinburg TRP compliance handled.",
    heroEyebrow: "Gatlinburg, Ski Mountain",
    h1: "Chalet Village Cabin & Chalet Management",
    heroSubhead:
      "Chalet Village sits on Ski Mountain above downtown Gatlinburg, minutes from Ober Mountain and the Parkway. Haven manages its view chalets to earn like the premium properties they are.",
    introHeading: "Chalet Village is a premium view market with its own rhythm",
    introParagraphs: [
      "Chalet Village is one of the best-known cabin communities in the Smokies for Chalet Village cabin management and Gatlinburg view rentals, set on Ski Mountain just above downtown. Its chalets range from cozy one-bedrooms to eight-bedroom mountain homes that sleep large groups, and the draw is the combination of big views, quick access to the Parkway and Great Smoky Mountains National Park, and a short drive to Ober Mountain and downtown shops and restaurants.",
      "That mix creates real revenue upside and real competition. Guests who book Chalet Village expect a view, a clean and well-appointed chalet, and a winter option near the slopes, which means photography, pricing around ski and leaf seasons, and a five-star guest experience decide who wins the booking. This is a community where professional operations lift a good chalet into a great-earning one.",
      "Haven is a local team based right here in the Smokies. We price Chalet Village chalets around this specific micro-market and its seasonal demand, and we run the whole operation for you.",
    ],
    snapshot: null,
    character: {
      heading: "What makes Chalet Village work for owners",
      highlights: [
        { icon: "mountain", title: "Big views, strong rate", body: "Ski Mountain elevation means the view cabins that guests pay a premium for. We price and market to that premium instead of racing to the bottom." },
        { icon: "compass", title: "Walkable to town and Ober", body: "A short drive to the Gatlinburg Parkway, Great Smoky Mountains National Park, and Ober Mountain. We put that central Ski Mountain location front and center in your listing." },
        { icon: "users", title: "One to eight-bedroom range", body: "From couples' getaways to large group chalets. We tailor pricing, amenities, and guest care to whichever segment your property serves." },
        { icon: "star", title: "Winter demand most owners miss", body: "Ski, snow tubing, and Ober keep Chalet Village booking through winter. A calendar built for four seasons, not just summer, is real money." },
      ],
    },
    regHeading: "Gatlinburg rules, and confirming your exact jurisdiction",
    regParagraphs: [
      "Most of Chalet Village sits within Gatlinburg city limits, which means the Gatlinburg framework generally applies: a Tourist Residency Permit, an annual fire and building inspection, the roughly 12.75% combined Sevier County lodging tax, and zoning that decides whether a given parcel can operate as a short-term rental at all.",
      "In the Smokies, though, a mailing address does not always match the governing jurisdiction, and a handful of parcels near community edges can fall under county rather than city rules. Before we do anything, Haven confirms your specific parcel's jurisdiction and permit status, so you are never operating on an assumption.",
    ],
    regDisclaimer:
      "Chalet Village is generally within Gatlinburg. Verify your parcel's jurisdiction and permit status before relying on any rule. See our Gatlinburg page and the Sevier County guide below, or let Haven confirm it for you.",
    whyHeading: "Why Chalet Village owners choose Haven",
    whyParagraphs: [
      "View chalets reward sharp pricing and standout marketing, and they punish neglect fast, because a slow response or a missed clean shows up in reviews that follow the property for months. Our local team answers guests 24/7, inspects every turnover, and coordinates trusted local maintenance so small issues never become bad reviews.",
      "The result is a Chalet Village chalet that ranks well, holds a strong rate, and earns ahead of the market, all handled by one local team.",
    ],
    faqs: [
      { q: "Do you manage cabins in Chalet Village, Gatlinburg?", a: ["Yes. Haven provides full-service management for Chalet Village cabins and chalets on Ski Mountain, from one-bedroom getaways to large group homes. We handle listing, pricing, guest care, cleaning, maintenance, and compliance end to end."] },
      { q: "What rules apply to a Chalet Village rental?", a: ["Most of Chalet Village is within Gatlinburg city limits, so the Gatlinburg framework generally applies: a Tourist Residency Permit, an annual fire and building inspection, and the roughly 12.75% combined Sevier County lodging tax. We confirm your specific parcel's jurisdiction and permit status before relying on any rule."] },
      { q: "Is Chalet Village a good place to own a rental?", a: ["It is one of the most recognized cabin communities in the Smokies, with strong view-driven demand and genuine four-season booking thanks to nearby Ober Mountain. Returns vary by cabin, so location, views, and condition matter. We will give you a grounded estimate for your specific property."] },
      { q: "Does Chalet Village book in the winter?", a: ["Yes, and it is an advantage many owners underuse. Skiing, snow tubing, and Ober Mountain keep the community booking through winter. We build a calendar and pricing strategy around all four seasons, not just summer."] },
      { q: "How is Haven different from a national manager for my Chalet Village chalet?", a: ["We are local, minutes from Ski Mountain, not a call center. A real revenue manager who knows this micro-market sets your rates, and our team can be on-site quickly. That local presence is what protects your reviews and your revenue."] },
      { q: "How do I get started?", a: ["Book a no-pressure call. We review your Chalet Village property and the local market, show you what it can realistically earn, and handle the switch end to end if it is a fit."] },
    ],
    closingHeading: "Let's talk about your Chalet Village chalet",
    closingParagraph:
      "Book a call with a local Haven advisor for a straight look at what your Ski Mountain chalet can earn under professional management.",
    relatedCities: ["gatlinburg", "pigeon-forge", "sevierville", "wears-valley"],
  },

  /* ============================ SKY HARBOR (nbhd) ========================== */
  {
    slug: "sky-harbor",
    name: "Sky Harbor",
    kind: "neighborhood",
    county: "Sevier County",
    associatedCity: "Pigeon Forge",
    associatedCitySlug: "pigeon-forge",
    primaryKeyword: "Sky Harbor cabin management",
    heroPhoto: "exteriorAlt",
    metaTitle: "Sky Harbor Cabin Management, Pigeon Forge | Haven",
    metaDescription:
      "Sky Harbor cabin management between Pigeon Forge and Gatlinburg on the Spur. Haven confirms jurisdiction first, then runs pricing, guests, and compliance locally.",
    heroEyebrow: "The Pigeon Forge and Gatlinburg corridor",
    h1: "Sky Harbor Cabin Management",
    heroSubhead:
      "Sky Harbor sits right on the Spur between Pigeon Forge and Gatlinburg, one of the most central locations in the Smokies. Haven turns that location into bookings.",
    introHeading: "Sky Harbor's location is its superpower",
    introParagraphs: [
      "Sky Harbor is a large cabin community tucked into the hills off the Spur, the stretch that connects Pigeon Forge and Gatlinburg. For guests, that central position is the whole appeal: they are minutes from Dollywood and the Pigeon Forge Parkway in one direction and downtown Gatlinburg and the National Park in the other. Several hundred privately owned cabins sit on quiet, well-maintained community roads, so guests get seclusion without giving up access.",
      "For owners, that means a listing that can market to two demand engines at once, which is a genuine advantage when you price and position it correctly. It also means competition from a lot of nearby cabins, so photography, pricing, and guest experience decide who gets the booking.",
      "Haven is local and knows this corridor well. We build your Sky Harbor calendar around demand from both markets and run the entire operation for you.",
    ],
    snapshot: null,
    character: {
      heading: "What makes Sky Harbor work for owners",
      highlights: [
        { icon: "compass", title: "Central to everything", body: "On the Spur between Pigeon Forge and Gatlinburg, minutes from Dollywood, the Parkway, downtown Gatlinburg, and the National Park. We market to both." },
        { icon: "leaf", title: "Seclusion without isolation", body: "Quiet, wooded community roads and creeks give guests a retreat feel while staying close to the action. That combination books well." },
        { icon: "chartUp", title: "Two demand engines", body: "A Sky Harbor cabin can capture Pigeon Forge family travel and Gatlinburg Park traffic. Pricing that reads both is how you keep the calendar full." },
        { icon: "shield", title: "Jurisdiction done right", body: "Corridor properties can fall under city or unincorporated county rules. We confirm which applies to your parcel before anything else." },
      ],
    },
    regHeading: "Confirming your Sky Harbor jurisdiction first",
    regParagraphs: [
      "Sky Harbor sits in the corridor between two cities, and in the Smokies that is exactly where jurisdiction gets misread. A cabin can carry a Pigeon Forge or Gatlinburg mailing address and still fall under unincorporated Sevier County rules, or under a city, and the permitting and inspection requirements differ depending on which one governs your parcel.",
      "This is not a detail to guess at, because operating under the wrong rulebook is how owners end up out of compliance. Haven confirms your specific parcel's jurisdiction on the county records first, then manages the correct permit, inspection, and roughly 12.75% Sevier County lodging tax accordingly.",
    ],
    regDisclaimer:
      "Sky Harbor parcels may fall under a city or unincorporated Sevier County. Do not assume based on your mailing address. Haven verifies jurisdiction before relying on any rule. See the Sevier County guide below.",
    whyHeading: "Why Sky Harbor owners choose Haven",
    whyParagraphs: [
      "A central location only pays off if the operation behind it is sharp. We answer guests 24/7, price around demand from both the Pigeon Forge and Gatlinburg sides, and keep turnovers inspected and hotel-clean so your reviews stay strong.",
      "Because we are local, we can be on-site quickly when a cabin on those community roads needs attention. All of it is handled by one local team, with clean monthly statements.",
    ],
    faqs: [
      { q: "Do you manage cabins in Sky Harbor?", a: ["Yes. Haven provides full-service management for Sky Harbor cabins in the corridor between Pigeon Forge and Gatlinburg. We handle listing, pricing, guest communication, cleaning, maintenance, and compliance end to end."] },
      { q: "Is Sky Harbor in Pigeon Forge or Gatlinburg?", a: ["Sky Harbor sits on the Spur between the two, so it is associated with both. What matters for rules is your parcel's governing jurisdiction, which can be a city or unincorporated Sevier County. We confirm which applies to your specific property before we rely on any regulation."] },
      { q: "What makes Sky Harbor a strong rental location?", a: ["Its central position. Guests are minutes from Dollywood and the Pigeon Forge Parkway on one side and downtown Gatlinburg and the National Park on the other, while the community itself feels quiet and secluded. That lets a well-run listing pull from two demand engines."] },
      { q: "What taxes and permits apply to a Sky Harbor rental?", a: ["Sevier County rentals carry a roughly 12.75% combined lodging tax, and permit and inspection requirements depend on whether your parcel is inside a city or in unincorporated county. Haven verifies your jurisdiction, then handles the correct permit, inspection, and tax remittance for you."] },
      { q: "How is Haven different from a national manager here?", a: ["We are local and know this corridor. A real revenue manager sets your rates around both markets, and our team can reach your cabin quickly. That beats a distant call center that treats every property the same."] },
      { q: "How do I get started?", a: ["Book a no-pressure call. We review your Sky Harbor cabin, confirm its jurisdiction, and show you what it can realistically earn before you commit to anything."] },
    ],
    closingHeading: "Let's talk about your Sky Harbor cabin",
    closingParagraph:
      "Book a call with a local Haven advisor and we will show you what a central Sky Harbor cabin can earn under professional management.",
    relatedCities: ["pigeon-forge", "gatlinburg", "sevierville", "wears-valley"],
  },

  /* ========================= ENGLISH MOUNTAIN (nbhd) ====================== */
  {
    slug: "english-mountain",
    name: "English Mountain",
    kind: "neighborhood",
    county: "Sevier County",
    associatedCity: "Sevierville",
    associatedCitySlug: "sevierville",
    primaryKeyword: "English Mountain cabin management",
    heroPhoto: "exteriorCraftsman",
    metaTitle: "English Mountain Cabin Management, Sevierville | Haven",
    metaDescription:
      "English Mountain cabin management near Sevierville, TN. Gated community at 2,600 feet; Haven confirms county vs. city jurisdiction and runs full-service ops.",
    heroEyebrow: "Sevierville, the value side",
    h1: "English Mountain Cabin Management",
    heroSubhead:
      "English Mountain is a secluded, gated cabin community above Sevierville at 2,600 feet. Haven runs its cabins so a quiet, value-priced asset still earns like a professional listing.",
    introHeading: "English Mountain is a value market that rewards operations",
    introParagraphs: [
      "English Mountain is a gated cabin community set at about 2,600 feet on the Sevierville side of the Smokies, roughly seven miles from downtown Sevierville and a short drive from Pigeon Forge and Gatlinburg. It draws guests who want seclusion, cooler mountain air, and community amenities like a pool and clubhouse, at a more approachable price point than the in-town Parkway markets.",
      "That value positioning is an opportunity and a challenge. Entry prices are friendlier, so more owners buy here, which means the cabins that keep their calendars full are the ones with strong photography, smart pricing, and genuinely five-star guest care. A newer or well-kept English Mountain cabin can perform well above its purchase price with the right operation behind it.",
      "Haven is a local team that treats a value-market cabin with the same rigor as a luxury one. We price it, market it, and run it end to end, so more of what it earns stays yours.",
    ],
    snapshot: null,
    character: {
      heading: "What makes English Mountain work for owners",
      highlights: [
        { icon: "tag", title: "Approachable entry, real upside", body: "Friendlier purchase prices than in-town markets. With professional operations, a well-kept cabin here can earn well above what its price suggests." },
        { icon: "leaf", title: "Seclusion and cool air", body: "At 2,600 feet with a gated, wooded setting, English Mountain sells the quiet-retreat experience guests increasingly search for." },
        { icon: "users", title: "Community amenities", body: "Pool, clubhouse, and shared amenities add booking appeal. We feature them in your listing to lift conversion." },
        { icon: "compass", title: "Central to the Smokies", body: "Minutes to Sevierville and a short drive to Pigeon Forge, Gatlinburg, and the Park. Guests get seclusion without sacrificing access." },
      ],
    },
    regHeading: "Confirming your English Mountain jurisdiction",
    regParagraphs: [
      "English Mountain carries a Sevierville mailing address, but much of the community sits in unincorporated Sevier County rather than inside city limits, and that distinction changes which rules apply. Unincorporated parcels follow Sevier County requirements, including the county short-term rental permit and its annual life-safety inspection, rather than the City of Sevierville framework.",
      "Getting this right is exactly the kind of thing that separates a compliant, sellable asset from a headache. Haven confirms your parcel's jurisdiction on the county records first, then manages the correct permit, inspection, and roughly 12.75% Sevier County lodging tax on your behalf.",
    ],
    regDisclaimer:
      "Much of English Mountain is unincorporated Sevier County despite a Sevierville address. Confirm your parcel's jurisdiction before relying on any rule. See the Sevier County guide below, or let Haven handle it.",
    whyHeading: "Why English Mountain owners choose Haven",
    whyParagraphs: [
      "In a value market, disciplined operations and honest management decide your real return. We keep costs in check and never pad your statement with hidden booking markups, so the savings do not quietly disappear. Then we do the work that lifts a value cabin: sharp pricing, strong marketing, inspected turnovers, and 24/7 guest communication.",
      "Because we are local, we can be on-site quickly when a gated-community cabin needs attention, and we keep your county permit and inspection on schedule so the asset stays compliant and easy to sell later.",
    ],
    faqs: [
      { q: "Do you manage cabins on English Mountain?", a: ["Yes. Haven provides full-service management for English Mountain cabins near Sevierville, handling listing, pricing, guest care, cleaning, maintenance, and compliance end to end."] },
      { q: "Is English Mountain in Sevierville city limits?", a: ["It carries a Sevierville mailing address, but much of the community is in unincorporated Sevier County, which follows county rules rather than the City of Sevierville framework. We confirm your specific parcel's jurisdiction before relying on any rule."] },
      { q: "Is English Mountain a good value for a rental investment?", a: ["It is one of the more approachable entry points in the Smokies, with seclusion, elevation, and community amenities that guests search for. Returns depend on the specific cabin and how well it is run, so professional operations matter more here than in a premium in-town market. We will give you a grounded estimate."] },
      { q: "What permit and taxes apply to an English Mountain rental?", a: ["Unincorporated parcels follow Sevier County rules, including the county short-term rental permit and an annual life-safety inspection, plus the roughly 12.75% combined Sevier County lodging tax. Haven confirms your jurisdiction and manages the permit, inspection, and tax remittance for you."] },
      { q: "How is Haven different from a national manager?", a: ["We are local and transparent. In a value market, honest pricing and strong local execution are what protect your net. A distant call center with hidden markups can quietly erase the savings that made the cabin attractive in the first place."] },
      { q: "How do I get started?", a: ["Book a no-pressure call. We review your English Mountain cabin, confirm its jurisdiction, and show you what it can realistically earn under professional management."] },
    ],
    closingHeading: "Let's talk about your English Mountain cabin",
    closingParagraph:
      "Book a call with a local Haven advisor for an honest look at what your English Mountain cabin can earn with a local, full-service team.",
    relatedCities: ["sevierville", "pigeon-forge", "gatlinburg", "wears-valley"],
  },
];

export const AREA_BY_SLUG = Object.fromEntries(AREAS.map((a) => [a.slug, a]));
