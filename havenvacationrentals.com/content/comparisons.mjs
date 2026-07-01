/* Category-level comparison / decision pages. These name NO specific
   competitors. They compare Haven's approach against a category (self-managing,
   national managers) using fair, general, verifiable claims. High-intent pages
   for owners who are actively evaluating how to run their cabin.

   Style: no em dashes, owner-facing trusted-advisor voice.
   Table cell values: true, false, or a short string. */

export const COMPARISONS = [
  /* ============ SELF-MANAGING VS A PROPERTY MANAGER ============ */
  {
    slug: "self-managing-vs-property-manager-smoky-mountains",
    name: "Self-managing vs a property manager",
    primaryKeyword: "self managing vs property manager Smoky Mountains",
    heroPhoto: "contactBg",
    metaTitle: "Self-Managing vs a Property Manager in the Smokies | Haven",
    metaDescription:
      "An honest look at self-managing your Smoky Mountain cabin vs hiring a property manager: the real costs in time, revenue, and compliance, and when each fits.",
    heroEyebrow: "The honest comparison",
    h1: "Self-Managing vs Hiring a Property Manager in the Smokies",
    heroSubhead:
      "Should you run your Smoky Mountain cabin yourself or hire a manager? Here is a straight, no-spin breakdown of what each really costs you.",
    introHeading: "The real question is not the fee, it is the net",
    introParagraphs: [
      "Plenty of Smoky Mountain owners start out self-managing, and some do it well. The appeal is obvious: no management fee. But the management fee is only one number in the equation, and focusing on it alone hides the two costs that usually matter more, the hours you pour in and the revenue you leave on the table by pricing, marketing, and operating like an individual instead of a professional team.",
      "This page lays out the tradeoffs honestly, including when self-managing genuinely makes sense. The goal is not to talk you into anything. It is to help you compare the whole picture, not just the line item.",
    ],
    table: {
      colA: "Self-managing",
      colHaven: "Haven",
      rows: [
        { label: "Time you spend each week", a: "All of it", haven: "Almost none" },
        { label: "Nightly pricing", a: "Guesswork or a basic tool", haven: "A real revenue manager, daily" },
        { label: "24/7 guest communication", a: false, haven: true },
        { label: "Inspected turnovers & cleaning", a: "You coordinate it", haven: true },
        { label: "Maintenance & local trades", a: "Your problem at 2 AM", haven: true },
        { label: "Permits, inspections & tax filing", a: "You track it all", haven: true },
        { label: "Professional photos & marketing", a: "Do it yourself", haven: true },
        { label: "Revenue vs. the market", a: "At or below", haven: "~30% ahead" },
        { label: "Cost structure", a: "No fee, but hidden time & revenue cost", haven: "One flat fee, no markups" },
      ],
    },
    sections: [
      {
        heading: "The true cost of self-managing",
        paragraphs: [
          "The management fee you avoid is real, but so are the costs you take on in its place. Self-managing owners typically absorb hours every week on guest messages, calendar and pricing tweaks, cleaner coordination, and the occasional middle-of-the-night maintenance scramble. That time has value, and it is the first hidden cost.",
          "The second is revenue. Individual owners rarely price as sharply as a full-time revenue manager who adjusts daily around demand, events, and seasonality, and they rarely market as effectively as a team producing professional photos and multi-channel listings. Haven-managed homes run roughly 30% ahead of the market on revenue, and that gap often exceeds the entire management fee.",
          "The third is compliance. Sevier County and its cities each have their own permits, inspections, and tax rules, and unincorporated county parcels follow different requirements again. Missing a filing or operating under the wrong rulebook is an expensive mistake that a professional manager exists to prevent.",
        ],
      },
      {
        heading: "When self-managing can make sense",
        paragraphs: [
          "To be fair, self-managing is a reasonable choice in some situations. If you live locally, own a single cabin, genuinely enjoy hosting, and have the time to answer guests quickly and keep up with pricing and compliance, you can run a good operation yourself and keep the fee.",
          "It stops making sense when the property is far from you, when you own more than one, when the day to day starts eating your evenings and weekends, or when you realize the revenue and reviews are not where they should be. At that point a professional manager usually pays for itself.",
        ],
      },
    ],
    relatedPost: { label: "Read the deep dive: the true costs of self-managing in the Smokies", href: "/pm-vs-self-managing-in-the-smokies-true-costs/" },
    faqs: [
      { q: "Is it cheaper to self-manage my Smoky Mountain cabin?", a: ["On paper you avoid a management fee, but self-managing carries hidden costs in your time, in revenue left on the table from weaker pricing and marketing, and in compliance risk. For many owners the revenue a professional team adds, roughly 30% ahead of the market for Haven owners, is larger than the fee itself."] },
      { q: "How much time does self-managing actually take?", a: ["More than most owners expect. Guest communication runs 24/7, pricing needs regular attention, cleaners and maintenance have to be coordinated, and permits and taxes have to be tracked. It is effectively a part-time job, and more so for larger or multiple cabins."] },
      { q: "Will a property manager really make me more money?", a: ["A good one should aim to, after its fee. Haven-managed homes run about 30% ahead of the market on revenue through daily professional pricing, stronger marketing, and a five-star guest experience that drives reviews and repeat bookings. We will build a realistic estimate for your specific cabin."] },
      { q: "What about compliance if I self-manage?", a: ["It is entirely on you. Sevier County and its cities each have distinct permits, inspections, and taxes, and unincorporated parcels follow county rules. Getting it wrong is costly. A manager handles registration, inspections, and correct tax remittance across every booking channel."] },
      { q: "When is self-managing the right call?", a: ["If you live locally, own a single cabin, enjoy hosting, and have time to do it well, self-managing can work. It tends to break down when the property is remote, when you own more than one, or when the workload and missed revenue outweigh the fee you are saving."] },
      { q: "How do I compare my options for my specific cabin?", a: ["Book a no-pressure call. We will look at your property and market, show you what it can realistically earn under professional management, and you can compare that against what you are doing today. If self-managing is better for you, you keep the estimate for free."] },
    ],
    closingHeading: "Compare the whole picture, not just the fee",
    closingParagraph:
      "Book a no-pressure call and we will show you what your cabin can earn with Haven, so you can compare it honestly against self-managing.",
  },

  /* ============ LOCAL VS NATIONAL MANAGEMENT ============ */
  {
    slug: "local-vs-national-property-management-smoky-mountains",
    name: "Local vs national management",
    primaryKeyword: "local vs national vacation rental management",
    heroPhoto: "heroExterior",
    metaTitle: "Local vs National Vacation Rental Management | Haven",
    metaDescription:
      "Local vs national vacation rental management in the Smokies: on-site response, human pricing, market knowledge, and fees compared, and when each fits.",
    heroEyebrow: "The honest comparison",
    h1: "Local vs National Vacation Rental Management in the Smokies",
    heroSubhead:
      "Not all property managers are built the same. Here is how a local Smoky Mountain team compares to a large national manager, and where each one fits.",
    introHeading: "In the Smokies, local is a structural advantage",
    introParagraphs: [
      "Many owners choose a management company by brand recognition, assuming a big national name means better results. Sometimes scale helps. But in a market as local as the Smokies, where regulation changes street by street, cabins need a person on-site, and pricing depends on knowing this specific area, being local is not a nice-to-have. It is a structural advantage.",
      "This page compares the two approaches fairly, category to category, without naming any specific company. It also covers the honest case for a national manager, so you can decide what actually fits your property.",
    ],
    table: {
      colA: "National manager",
      colHaven: "Haven (local)",
      rows: [
        { label: "Where the team is", a: "Call center, often out of state", haven: "Local, in the Smokies" },
        { label: "On-site response", a: "Hours, or a dispatched vendor", haven: "Minutes away" },
        { label: "Nightly pricing", a: "Algorithm", haven: "Human revenue manager + data" },
        { label: "Local market knowledge", a: "Generic", haven: "Deep, street by street" },
        { label: "Portfolio focus", a: "Thousands of homes", haven: "A select group, run well" },
        { label: "Compliance by jurisdiction", a: "One size fits all", haven: "City vs. county, confirmed" },
        { label: "Fee transparency", a: "Booking-fee markups common", haven: "One flat fee, no markups" },
      ],
    },
    sections: [
      {
        heading: "Why local wins in the Smokies",
        paragraphs: [
          "Three things make this market unusually local. First, jurisdiction: a cabin can carry a Pigeon Forge or Gatlinburg mailing address and still fall under unincorporated Sevier County rules, with entirely different permits and inspections. A local team confirms which rulebook governs your parcel. A distant one often assumes.",
          "Second, on-site needs: cabins are physical assets in the mountains, and things happen, a hot tub issue, a lockout, a storm. When a guest needs help or a home needs hands, minutes matter, and being minutes away protects your reviews. Third, pricing: a real revenue manager who knows that a specific weekend will spike for a local event will out-earn an algorithm guessing from a distance.",
        ],
      },
      {
        heading: "What national scale can quietly cost you",
        paragraphs: [
          "Scale has a downside for the individual owner. When a company runs thousands of homes, yours is one line on a very long list, and the model often leans on booking-fee markups and padded charges that widen the gap between what your cabin earns and what you keep. A single transparent flat fee keeps that gap small and predictable.",
          "Haven stays deliberately smaller and manages a select group of homes well rather than thousands at arm's length. That focus is exactly why our owners run ahead of the market on both occupancy and revenue.",
        ],
      },
      {
        heading: "The honest case for a national manager",
        paragraphs: [
          "To be fair, a national manager can be a reasonable fit if you own properties scattered across many far-flung markets and value a single company and one dashboard across all of them, or if brand familiarity matters more to you than local depth. If your cabin is in the Smokies, though, a local team that knows this market and can be on-site quickly is usually the stronger choice for your net revenue.",
        ],
      },
    ],
    relatedPost: null,
    faqs: [
      { q: "Is a local property manager better than a national one?", a: ["In the Smokies, usually yes, for structural reasons. Regulation varies street by street, cabins need on-site attention, and pricing depends on deep local knowledge. A local team like Haven confirms your parcel's jurisdiction, reaches your cabin in minutes, and prices with a human who knows this market."] },
      { q: "What does a national manager do that a local one cannot?", a: ["The genuine advantage is breadth: if you own properties across many distant markets, a national company offers one relationship and one dashboard for all of them. For a single Smoky Mountain market, that breadth rarely outweighs local response, market knowledge, and fee transparency."] },
      { q: "Do national managers charge more?", a: ["Not always in headline rate, but the model often relies on booking-fee markups and padded charges that widen the gap between gross earnings and your net. Haven charges one flat fee with no hidden markups, so what you see is what you keep."] },
      { q: "Why does being local matter for compliance?", a: ["Because a mailing address does not always match the governing jurisdiction. A cabin can sit in unincorporated Sevier County with a city address, which changes the permit, inspection, and tax rules entirely. A local team verifies this before relying on any rule. A distant one may not."] },
      { q: "How does local pricing beat an algorithm?", a: ["An algorithm guesses from patterns. A local revenue manager knows that a particular weekend will spike because of a specific local event, or that a slow stretch needs a smart adjustment. Human judgment on top of good data is how Haven owners run roughly 30% ahead of the market."] },
      { q: "How do I decide what fits my cabin?", a: ["Book a no-pressure call. We will show you what your specific property can earn with a local, flat-fee team, and you can weigh that against any alternative. No obligation, and you keep the estimate."] },
    ],
    closingHeading: "Local team, honest fee, real results",
    closingParagraph:
      "Book a no-pressure call with a local Haven advisor and see what a Smoky Mountain team can do for your cabin's revenue.",
  },
];

export const COMPARISON_BY_SLUG = Object.fromEntries(COMPARISONS.map((c) => [c.slug, c]));
