#!/usr/bin/env python3
"""One-off: remove flat-fee USP language from geo generated copy."""
from __future__ import annotations

import json
import re
from pathlib import Path

APP = Path(__file__).resolve().parents[1] / "content" / "generated"

META = {
    "gatlinburg": "Full-service vacation rental management in Gatlinburg, TN. Local team, smart pricing, five-star guest care. Book a call.",
    "pigeon-forge": "Vacation rental management in Pigeon Forge, TN. Group-cabin pricing, local operations, stronger revenue. Book a call.",
    "sevierville": "Vacation rental management in Sevierville, TN. Local team for newer cabins and full compliance. Book a call.",
    "wears-valley": "Vacation rental management in Wears Valley, TN. County permits, inspections, and guest care handled. Book a call.",
}

INTRO3 = {
    "gatlinburg": "That is where vacation rental management Gatlinburg owners trust comes in. Haven is a local, full-service team based right here in the Smokies. We handle pricing, marketing, guests, housekeeping, maintenance, and every permit and tax detail so your cabin competes at the top of this market and you get your time back.",
    "pigeon-forge": "This is where vacation rental management Pigeon Forge owners trust pays off. Haven is a local team in the Smokies. We price for group travel, run guest care and turnovers, and handle compliance so your cabin earns like a professionally run property without becoming your second job.",
    "sevierville": "That is the gap Haven was built to close. We are a local team in Sevier County, here since 2016. We run the full operation and compliance stack so your newer asset performs the way the market says it should, without you living in guest messages.",
    "wears-valley": "That is where vacation rental management Wears Valley owners trust comes in. Haven is a local team, not a national queue. We handle pricing, guests, housekeeping, maintenance, statements, and county compliance so you keep the upside of a great valley cabin without daily firefighting.",
}


def de_flat(s: str) -> str:
    if not s:
        return s
    s = re.sub(r"\bone simple flat fee\b", "full-service local management", s, flags=re.I)
    s = re.sub(r"\bone flat fee\b", "professional local management", s, flags=re.I)
    s = re.sub(r"\bflat-fee\b", "local", s, flags=re.I)
    s = re.sub(r"\bflat fee\b", "management", s, flags=re.I)
    s = re.sub(r"we are local, we are local, and we are guest-obsessed", "we are local and guest-obsessed", s, flags=re.I)
    s = re.sub(r"with local, local, and guest-obsessed", "with local, guest-obsessed", s, flags=re.I)
    s = re.sub(r"local, local, and guest-obsessed", "local and guest-obsessed", s, flags=re.I)
    s = re.sub(r" ,", ",", s)
    s = re.sub(r",\s*,", ",", s)
    s = re.sub(r"\s+,", ",", s)
    s = re.sub(r"\s{2,}", " ", s)
    return s.strip()


def walk(o):
    if isinstance(o, dict):
        return {k: walk(v) for k, v in o.items()}
    if isinstance(o, list):
        return [walk(x) for x in o]
    if isinstance(o, str):
        return de_flat(o)
    return o


def main():
    for path in sorted(APP.glob("*.json")):
        if path.name in ("home.json", "hub.json"):
            continue
        slug = path.stem
        data = json.loads(path.read_text())
        if slug in META:
            data["metaDescription"] = META[slug]
        if slug in INTRO3 and data.get("introParagraphs") and len(data["introParagraphs"]) >= 3:
            data["introParagraphs"][2] = INTRO3[slug]
        data = walk(data)
        for key in ("whyParagraphs", "valueParagraphs", "servicesIntro", "heroSubhead", "regClosing", "closingParagraph"):
            if key not in data:
                continue
            if isinstance(data[key], str):
                data[key] = de_flat(data[key])
            elif isinstance(data[key], list):
                data[key] = [de_flat(x) if isinstance(x, str) else x for x in data[key]]
        t = data.get("testimonial")
        if t and isinstance(t.get("quote"), str) and "flat" in t["quote"].lower():
            t["quote"] = re.sub(
                r"Best part is[^.]*\.?",
                "The monthly deposits finally matched what we thought we were earning.",
                t["quote"],
                flags=re.I,
            )
            t["quote"] = de_flat(t["quote"])
        for faq in data.get("faqs", []):
            q = (faq.get("q") or "").lower()
            if "charge" in q or "fee" in q or "hidden" in q:
                faq["a"] = [
                    "We walk through management fees and what is included on a call, using your property and market so the numbers are real, not generic.",
                    "Owners switch to Haven for performance, local presence, and clear reporting. We show you exactly how fees and payouts work for your cabin before you decide anything.",
                ]
        path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n")
        print("updated", path.name)


if __name__ == "__main__":
    main()