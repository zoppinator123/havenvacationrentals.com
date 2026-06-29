export const meta = {
  name: 'haven-geo-copy',
  description: 'Write unique, fact-accurate, owner-focused copy for Haven geo + hub + home pages',
  phases: [
    { title: 'Write' },
    { title: 'Verify' },
    { title: 'Dedup' },
  ],
};

/* ---------------- shared brand context ---------------- */
const BRAND = `
COMPANY: Haven Vacation Rentals. A local, full-service vacation rental and cabin property management company in the Smoky Mountains of Tennessee (Sevier County). Locally owned since 2016.
AUDIENCE: cabin and vacation rental OWNERS (and prospective owners/investors). Never write to guests. The goal is to convert owners into "Book a Call About Your Property" leads.
VOICE: trusted advisor. Professional, data-backed, warm but authoritative. Confident, specific, never hypey or salesy. Speak plainly.

HARD STYLE RULE (non-negotiable): NO em dashes and NO en dashes anywhere ( — or – ). Use periods, commas, parentheses, or colons instead. This rule is checked automatically and will fail the page.

BRAND PILLARS (weave in with LOCAL framing, do not just list them):
1. A local team, based right here in the Smokies, not a national call center.
2. Smart human pricing. A real revenue manager who knows this market sets rates, not just an algorithm.
3. Guest-obsessed. A five-star guest experience drives five-star reviews, which drive ranking and revenue.

PROOF POINTS (these are Haven's own figures; use naturally and sparingly, do not stuff every section):
- Around 70% average occupancy versus a market average near 55%.
- Roughly 30% ahead of the market on revenue.
- 4.9 stars from 4,000+ Google reviews.
- Top 1, 5, and 10 percent of Airbnb listings worldwide.
- Local since 2016.

SERVICES (full-service, one flat fee): bookings and calendar across Airbnb/Vrbo/Booking.com/direct; smart human revenue pricing; professional marketing and listings; housekeeping and inspected turnovers; 24/7 guest communication; maintenance and trusted local contractors; clean monthly statements and direct-deposit payouts; reviews and reputation.

PROCESS: 1) we evaluate your property and market, 2) we make profitable improvements, 3) you start earning more while we run the day to day.

MARKET CONTEXT (2026): Smoky Mountains average nightly rate (ADR) is about $321, roughly flat year over year. Supply growth has cooled to about 1% year over year (down from about 8% the prior year), so 2026 rewards operational excellence rather than a rising tide. This favors professional management.

OUTPUT: Return ONLY the structured fields requested. Plain text in each field (no markdown, no HTML, no bullet characters). Paragraph arrays should contain complete, substantive paragraphs.
`;

/* ---------------- per-market facts + distinct angle ---------------- */
const MARKETS = [
  {
    slug: 'gatlinburg', city: 'Gatlinburg',
    primaryKeyword: 'vacation rental management Gatlinburg',
    secondary: ['Gatlinburg property management', 'Gatlinburg cabin rental management', 'Airbnb management Gatlinburg TN'],
    angle: 'Gatlinburg is the in-town, gateway-to-the-National-Park market: high competition, premium in-town and view cabins, and zoning that genuinely decides whether a parcel can be an STR at all. Lead on competition, the Parkway/Park demand engine, and getting zoning and permits right.',
    facts: `
PERMIT: Tourist Residency Permit (TRP) required before renting. Base fee $200 for two bedrooms or fewer, plus $75 per additional bedroom. Apply at the Gatlinburg Customer Service Center (912 East Parkway) or by mail to City Hall. City contact (865) 436-1400.
INSPECTION: fire and building inspection required before the permit is issued; renews annually.
BUSINESS LICENSES: city and county business licenses, $15 each.
TAXES: combined about 12.75% (9.75% state and local sales tax plus 3% county lodging tax). Airbnb auto-collects the 9.75%; the 3% county lodging tax is self-remitted monthly to the Sevier County Trustee by the 20th. Vrbo and direct bookings: the host remits everything.
STAY LENGTH: each stay 89 days or fewer; no annual cap on nights.
ZONING: STRs prohibited in R-1A and R-2A; allowed in R-3 high-density residential, tourism development zones, and commercial C-1 and C-2. Verify a parcel's zoning before purchase.
PROPERTY TAX: an STR that is not the owner's principal residence may be reclassified from residential (25% assessment ratio) to commercial (40%), raising the assessed value and tax bill.
CLIMATE 2026: stable and STR-friendly, no active local crackdowns. State bills SB 104 and HB 109 are worth monitoring but have no immediate impact.
DEMAND DRIVERS: Great Smoky Mountains National Park gateway, the Parkway, Ober Mountain, peak summer, fall color season, and holidays.`,
  },
  {
    slug: 'pigeon-forge', city: 'Pigeon Forge',
    primaryKeyword: 'vacation rental management Pigeon Forge',
    secondary: ['Pigeon Forge property management', 'Pigeon Forge cabin management', 'Airbnb management Pigeon Forge', 'STR management Pigeon Forge TN'],
    angle: 'Pigeon Forge is the family/group entertainment market (Dollywood, The Island). Two things define it: a hard occupancy cap of 12 people, and R-1 zoning where only grandfathered permits survive. Lead on group-cabin economics, the occupancy cap, and verifying that a grandfathered permit is active and transfers.',
    facts: `
OCCUPANCY RULES: maximum 2 guests per bed, 2 beds per room, and an overall property maximum of 12 people.
PERMIT / REGISTRATION: Transient Rental Registration, cited at $125 initial and $75 annual renewal. STRU permit application fee cited at $300.
CITY BUSINESS LICENSE: $35 base plus $3 per $1,000 of gross receipts.
ZONING: new STR development restricted in R-1 residential districts. Properties operating as STRs before August 13, 2018 with a valid permit at that time may be grandfathered. If buying in R-1, verify the property has an active grandfathered permit AND that it transfers with the sale. Generally permitted in R-2 and higher and in all commercial zones.
TAXES: same combined ~12.75% structure as the rest of Sevier County (9.75% sales + 3% county lodging; 3% self-remitted monthly to the Sevier County Trustee).
DEMAND DRIVERS: Dollywood, The Island, the Parkway entertainment corridor, and year-round family and group travel.`,
  },
  {
    slug: 'sevierville', city: 'Sevierville',
    primaryKeyword: 'vacation rental management Sevierville',
    secondary: ['Sevierville property management', 'Sevierville cabin rental management', 'Airbnb management Sevierville TN'],
    angle: 'Sevierville is the emerging value market: newer construction, lower entry prices, strong revenue. Frame it for owners who bought (or are buying) newer builds and want professional management to maximize a newer asset. Lead on value, newer cabins, and the mandatory fire-department inspection.',
    facts: `
PERMIT: Short-Term Rental Operational Permit. Initial application fee $150, annual renewal $50.
INSPECTION: mandatory life-safety inspection by the Sevierville Fire Department before approval and annually after.
BUSINESS LICENSE: city business license required for properties within city limits.
TAXES: same combined ~12.75% structure as the rest of Sevier County.
POSITIONING: Sevierville is an emerging value market with newer construction, more affordable entry prices, and strong revenue performance. Good for owners who want a professional team to maximize a newer asset.
DEMAND DRIVERS: outlet shopping, the Tennessee Smokies ballpark, newer large cabins, and an affordable gateway to the Park.`,
  },
  {
    slug: 'wears-valley', city: 'Wears Valley',
    primaryKeyword: 'vacation rental management Wears Valley',
    secondary: ['Wears Valley cabin management', 'short term rental management Wears Valley TN', 'Sevier County cabin property management'],
    angle: 'Wears Valley is unincorporated, so COUNTY rules apply, not city rules. This is the differentiating, uncontested page. Lead hard on jurisdiction confusion (a Pigeon Forge or Gatlinburg mailing address can still be outside city limits), the county STRU permit and detailed life-safety inspection, the Three Strikes policy, and why a responsive local manager matters most here. Quieter, nature-forward setting.',
    facts: `
JURISDICTION (lead with this): Wears Valley is unincorporated, so it follows COUNTY rules, not city rules. A property can have a Pigeon Forge or Gatlinburg mailing address and still sit outside city limits, which changes everything. Owners must verify the parcel's jurisdiction on the Sevier County GIS map before any paperwork.
PERMIT: County STRU annual operational permit from the Sevier County Fire Marshal's Office. $250 per year for properties sleeping 12 or fewer; $250 plus $25 per additional occupant for 13 or more. Operating without a permit carries a $50 per day penalty. In effect since January 1, 2024.
INSPECTION: annual life-safety inspection (the county hired eight full-time inspectors working by district). Permit issued only after the inspection passes.
INSPECTION CHECKLIST: interconnected UL-217 smoke alarms (wireless interconnection allowed for homes built after 1993), CO alarms within 15 feet of every bedroom door, at least one 2A:10BC fire extinguisher per level (professionally tagged annually), proper egress from every sleeping room including rooms with sofa beds, street numbers at least 4 inches tall on the building, gas grills on a 60-minute shut-off timer positioned at least 18 inches from any structure, and fire sprinklers for properties sleeping more than 12.
PERMIT TRANSFER: if kept current and never lapsed, the permit can pass with the sale of the property.
THREE STRIKES: a Three Strikes policy (T.C.A. 13-7-604) allows permit revocation after three documented violations for noise, trash, or parking. A responsive local manager is genuinely valuable here.
SCALE: roughly 6,500 rentals operate outside the cities in Sevier County.
TAXES: same combined ~12.75% structure as the rest of Sevier County.
DEMAND DRIVERS: quiet, nature-forward settings, National Park access at Metcalf Bottoms, and the Foothills Parkway.`,
  },
];

/* ---------------- JSON schemas ---------------- */
const strArr = (min) => ({ type: 'array', minItems: min, items: { type: 'string' } });
const GEO_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['metaTitle','metaDescription','heroEyebrow','h1','heroSubhead','introHeading','introParagraphs','snapshotHeading','snapshotParagraphs','servicesIntro','whyHeading','whyParagraphs','regHeading','regIntro','regClosing','processIntro','faqs','testimonial','closingHeading','closingParagraph','crossLinkBlurb'],
  properties: {
    metaTitle: { type: 'string' }, metaDescription: { type: 'string' },
    heroEyebrow: { type: 'string' }, h1: { type: 'string' }, heroSubhead: { type: 'string' },
    introHeading: { type: 'string' }, introParagraphs: strArr(2),
    snapshotHeading: { type: 'string' }, snapshotParagraphs: strArr(2),
    servicesIntro: { type: 'string' },
    whyHeading: { type: 'string' }, whyParagraphs: strArr(2),
    regHeading: { type: 'string' }, regIntro: strArr(1), regClosing: { type: 'string' },
    processIntro: { type: 'string' },
    faqs: { type: 'array', minItems: 6, maxItems: 8, items: { type: 'object', additionalProperties: false, required: ['q','a'], properties: { q: { type: 'string' }, a: strArr(1) } } },
    testimonial: { type: 'object', additionalProperties: false, required: ['quote','name','role','location'], properties: { quote: { type: 'string' }, name: { type: 'string' }, role: { type: 'string' }, location: { type: 'string' } } },
    closingHeading: { type: 'string' }, closingParagraph: { type: 'string' },
    crossLinkBlurb: { type: 'string' },
  },
};
const HUB_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['metaTitle','metaDescription','heroEyebrow','h1','heroSubhead','introHeading','introParagraphs','servicesIntro','servicesDetail','whyHeading','whyParagraphs','areasIntro','areasNote','feesHeading','feesParagraphs','faqs','closingHeading','closingParagraph'],
  properties: {
    metaTitle: { type: 'string' }, metaDescription: { type: 'string' },
    heroEyebrow: { type: 'string' }, h1: { type: 'string' }, heroSubhead: { type: 'string' },
    introHeading: { type: 'string' }, introParagraphs: strArr(2),
    servicesIntro: { type: 'string' }, servicesDetail: strArr(2),
    whyHeading: { type: 'string' }, whyParagraphs: strArr(2),
    areasIntro: { type: 'string' }, areasNote: { type: 'string' },
    feesHeading: { type: 'string' }, feesParagraphs: strArr(2),
    faqs: { type: 'array', minItems: 6, maxItems: 8, items: { type: 'object', additionalProperties: false, required: ['q','a'], properties: { q: { type: 'string' }, a: strArr(1) } } },
    closingHeading: { type: 'string' }, closingParagraph: { type: 'string' },
  },
};
const HOME_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['metaTitle','metaDescription','heroEyebrow','h1','heroSubhead','introHeading','introParagraphs','servicesIntro','valueHeading','valueParagraphs','faqs','closingHeading','closingParagraph'],
  properties: {
    metaTitle: { type: 'string' }, metaDescription: { type: 'string' },
    heroEyebrow: { type: 'string' }, h1: { type: 'string' }, heroSubhead: { type: 'string' },
    introHeading: { type: 'string' }, introParagraphs: strArr(2),
    servicesIntro: { type: 'string' },
    valueHeading: { type: 'string' }, valueParagraphs: strArr(2),
    faqs: { type: 'array', minItems: 5, maxItems: 6, items: { type: 'object', additionalProperties: false, required: ['q','a'], properties: { q: { type: 'string' }, a: strArr(1) } } },
    closingHeading: { type: 'string' }, closingParagraph: { type: 'string' },
  },
};

/* ---------------- helpers ---------------- */
const countWords = (v) => {
  let t = '';
  const walk = (x) => { if (x == null) return; if (typeof x === 'string') { t += ' ' + x; return; } if (Array.isArray(x)) { x.forEach(walk); return; } if (typeof x === 'object') Object.values(x).forEach(walk); };
  walk(v); return t.trim().split(/\s+/).filter(Boolean).length;
};
const hasDash = (v) => /[—–]/.test(JSON.stringify(v));
const lc = (v) => JSON.stringify(v).toLowerCase();

function checkCommon(copy) {
  const issues = [];
  if (hasDash(copy)) issues.push('Remove ALL em dashes and en dashes. Replace each with a period, comma, parentheses, or colon.');
  const t = (copy.metaTitle || '').length;
  if (t < 46 || t > 62) issues.push(`metaTitle is ${t} characters. Rewrite it to 50 to 60 characters, ending with "| Haven" or "| Haven Vacation Rentals".`);
  const d = (copy.metaDescription || '').length;
  if (d < 148 || d > 162) issues.push(`metaDescription is ${d} characters. Rewrite it to land between 150 and 160 characters, owner-focused, with the city and a soft call to action.`);
  return issues;
}
function checkGeo(copy, m) {
  const issues = checkCommon(copy);
  const wc = countWords(copy);
  if (wc < 1500) issues.push(`Body copy is about ${wc} words. Expand to at least 1550 words of substantive, non-repetitive, owner-focused copy (longer FAQ answers, richer intro and snapshot and regulations sections).`);
  if (!lc(copy).includes(m.primaryKeyword.toLowerCase())) issues.push(`The exact primary keyword "${m.primaryKeyword}" must appear naturally at least once (ideally in the H1 or first intro paragraph, and again in an FAQ).`);
  if (!copy.faqs || copy.faqs.length < 6) issues.push('Provide 6 to 8 FAQs, several specific to this market.');
  return issues;
}
function checkHub(copy) {
  const issues = checkCommon(copy);
  const wc = countWords(copy);
  if (wc < 1500) issues.push(`Body copy is about ${wc} words. Expand to at least 1550 words (add depth under services, fees, and FAQs).`);
  return issues;
}
function checkHome(copy) {
  const issues = checkCommon(copy);
  const wc = countWords(copy);
  if (wc < 650) issues.push(`Body copy is about ${wc} words. Expand to at least 700 words.`);
  return issues;
}

async function writeAndVerify(kind, spec, schema, check, promptText) {
  let copy = await agent(promptText, { label: `write:${spec.slug}`, phase: 'Write', schema });
  if (!copy) return null;
  for (let attempt = 0; attempt < 3; attempt++) {
    const issues = check(copy);
    if (!issues.length) break;
    log(`${spec.slug}: fixing ${issues.length} issue(s) (attempt ${attempt + 1})`);
    const fixPrompt = `${BRAND}

You previously wrote the JSON copy below for the Haven ${spec.label} page. Revise it to fix these specific problems while keeping everything that already works and preserving the trusted-advisor voice and all factual accuracy:

PROBLEMS TO FIX:
${issues.map((x, i) => `${i + 1}. ${x}`).join('\n')}

CURRENT JSON:
${JSON.stringify(copy)}

Return the corrected JSON in the same schema.`;
    const revised = await agent(fixPrompt, { label: `fix:${spec.slug}`, phase: 'Verify', schema });
    if (revised) copy = revised;
  }
  return { slug: spec.slug, kind, copy, words: countWords(copy), remainingIssues: check(copy) };
}

/* ---------------- prompts ---------------- */
function geoPrompt(m) {
  return `${BRAND}

TASK: Write all copy for a dedicated SEO landing page: "Vacation Rental Management in ${m.city}, TN". This page targets ONE market only. It must read as genuinely local and specific to ${m.city}, never as generic boilerplate with a city name swapped in.

THIS MARKET'S ANGLE: ${m.angle}

PRIMARY KEYWORD (use the exact phrase naturally, at least in the H1 or first intro paragraph and again in one FAQ): "${m.primaryKeyword}"
SECONDARY KEYWORDS (work in naturally, do not stuff): ${m.secondary.join('; ')}

VERIFIED LOCAL FACTS for ${m.city} (write plain-English explanations from these; do NOT invent fees, dates, or rules; position Haven as the team that handles all of it for the owner):
${m.facts}

LENGTH: the full set of copy must total at least 1550 words of real body copy. Make FAQ answers substantive (3 to 5 sentences each).

WRITE THESE FIELDS:
- metaTitle: 50 to 60 characters, format like "${m.city} Vacation Rental Management | Haven". One city only.
- metaDescription: 150 to 160 characters, owner-focused, includes ${m.city} and a soft call to action.
- heroEyebrow: a short label, e.g. "Smoky Mountains property management".
- h1: include the primary service and ${m.city}, TN.
- heroSubhead: one or two sentences capturing ${m.city}'s specific character for owners.
- introHeading and introParagraphs (2 to 3 paragraphs, 200 to 260 words total): a problem-agitate intro speaking to ${m.city} owners about the local dynamic (competition, demand, regulation, seasonality), then position Haven.
- snapshotHeading and snapshotParagraphs (2 to 3 paragraphs): prose around the local market data (ADR near $321, ~70% Haven occupancy vs ~55%, ~1% supply growth, plus this market's demand drivers). Explain what it means for an owner here.
- servicesIntro: 2 to 3 sentences introducing full-service management for ${m.city} owners (the service list is shown separately).
- whyHeading and whyParagraphs (2 to 3 paragraphs): why ${m.city} owners specifically choose Haven, framing the five pillars locally.
- regHeading, regIntro (1 to 2 paragraphs lead-in to local rules), regClosing (1 paragraph: Haven handles all of it).
- processIntro: 1 to 2 sentences leading into the 3-step process.
- faqs: 6 to 8 questions and answers, several specific to ${m.city} (permits, taxes, zoning or jurisdiction, what owners earn, fees, the switching process). Answers must be accurate to the facts above.
- testimonial: a believable, representative owner quote (no specific unverifiable dollar figures). Attribute generically, e.g. name "Mark T." or "The Bradleys", role "Cabin owner", location "${m.city}, TN". This is a placeholder to be replaced with a real testimonial, so keep it honest and plausible.
- closingHeading and closingParagraph: a strong final call to action for ${m.city} owners.
- crossLinkBlurb: ONE sentence (under 18 words) describing ${m.city} management, used when other pages link to this one.`;
}

function hubPrompt() {
  return `${BRAND}

TASK: Write all copy for the HUB page at /property-management/ titled around Smoky Mountain / Sevier County vacation rental management. This page is the regional overview that links down to four city pages (Gatlinburg, Pigeon Forge, Sevierville, Wears Valley). It must be substantial (at least 1550 words of body copy) and must NOT stuff individual city names into the title (the cities have their own pages). Keep Townsend and Knoxville mentioned as also-served areas in the areasNote field.

WRITE THESE FIELDS:
- metaTitle: 50 to 60 characters, regional focus, ending "| Haven Vacation Rentals" or "| Haven".
- metaDescription: 150 to 160 characters, owner-focused regional description with a soft CTA.
- heroEyebrow, h1 (regional, e.g. "Full-Service Vacation Rental Management in the Smoky Mountains"), heroSubhead.
- introHeading and introParagraphs (2 to 3 paragraphs): what Haven does and who it is for, framed around net owner revenue.
- servicesIntro (2 to 3 sentences) and servicesDetail (2 to 4 paragraphs adding real depth under the service grid, explaining how pricing, marketing, guest care, cleaning, and maintenance actually drive revenue).
- whyHeading and whyParagraphs (2 to 3 paragraphs): the five pillars, regionally framed.
- areasIntro (1 to 2 sentences leading into the four market cards) and areasNote (1 to 2 sentences noting Townsend and Knoxville are also served).
- feesHeading and feesParagraphs (2 to 3 paragraphs): how the flat fee works, what is included, and what owners typically earn (use the proof points honestly, note figures should be confirmed for a specific property).
- faqs: 6 to 8 general (non-city-specific) owner questions: how fees work, what owners earn, the switching process, what full-service includes, how Haven differs from national managers.
- closingHeading and closingParagraph: strong regional call to action.`;
}

function homePrompt() {
  return `${BRAND}

TASK: Write all copy for the HOMEPAGE. It is a confident overview that funnels owners toward booking a call and toward the four market pages. Target at least 700 words of body copy. Do not stuff multiple cities into the title.

WRITE THESE FIELDS:
- metaTitle: 50 to 60 characters, e.g. "Smoky Mountain Vacation Rental Management | Haven".
- metaDescription: 150 to 160 characters, owner-focused, with a soft CTA.
- heroEyebrow, h1 (benefit-led, owner-focused), heroSubhead (one or two sentences naming the markets served).
- introHeading and introParagraphs (2 to 3 paragraphs): the Haven difference for owners.
- servicesIntro: 2 to 3 sentences.
- valueHeading and valueParagraphs (2 to 3 paragraphs): why smaller, local, flat-fee, guest-obsessed management produces better net revenue.
- faqs: 5 to 6 general owner questions.
- closingHeading and closingParagraph: warm, confident final CTA.`;
}

/* ---------------- run ---------------- */
phase('Write');

const geoJobs = MARKETS.map((m) => ({ ...m, label: `${m.city} geo` }));

const geoResults = await parallel(
  geoJobs.map((m) => () => writeAndVerify('geo', m, GEO_SCHEMA, (c) => checkGeo(c, m), geoPrompt(m)))
);
const hubResult = await writeAndVerify('hub', { slug: 'hub', label: 'hub (Smoky Mountains)' }, HUB_SCHEMA, checkHub, hubPrompt());
const homeResult = await writeAndVerify('home', { slug: 'home', label: 'homepage' }, HOME_SCHEMA, checkHome, homePrompt());

/* ---------------- dedup report (cross-page similarity) ---------------- */
phase('Dedup');
function shingles(text) {
  const words = String(text).toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(Boolean);
  const s = new Set();
  for (let i = 0; i + 3 <= words.length; i++) s.add(words.slice(i, i + 3).join(' '));
  return s;
}
function jaccard(a, b) {
  const A = shingles(a), B = shingles(b);
  let inter = 0; for (const x of A) if (B.has(x)) inter++;
  const uni = A.size + B.size - inter;
  return uni ? +(inter / uni).toFixed(3) : 0;
}
const geos = geoResults.filter(Boolean);
const proseOf = (r) => [r.copy.introParagraphs, r.copy.snapshotParagraphs, r.copy.whyParagraphs, r.copy.regIntro].flat().join(' ');
const similarity = [];
for (let i = 0; i < geos.length; i++) {
  for (let j = i + 1; j < geos.length; j++) {
    similarity.push({ pair: `${geos[i].slug} vs ${geos[j].slug}`, jaccard: jaccard(proseOf(geos[i]), proseOf(geos[j])) });
  }
}
similarity.sort((a, b) => b.jaccard - a.jaccard);
similarity.forEach((s) => log(`similarity ${s.pair}: ${s.jaccard}`));

const all = [...geos, hubResult, homeResult].filter(Boolean);
all.forEach((r) => log(`${r.slug}: ${r.words} words${r.remainingIssues.length ? ' | UNRESOLVED: ' + r.remainingIssues.join(' / ') : ' | clean'}`));

return {
  pages: all.map((r) => ({ slug: r.slug, kind: r.kind, words: r.words, remainingIssues: r.remainingIssues, copy: r.copy })),
  similarity,
};
