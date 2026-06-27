/* Small rendering utilities. */

export function escapeHtml(s = "") {
  return String(s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
export function escapeAttr(s = "") {
  return String(s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

/* Render an array of plain-text paragraphs to <p> tags. */
export function paragraphs(arr = []) {
  return arr.filter(Boolean).map((p) => `<p>${escapeHtml(p)}</p>`).join("\n");
}

/* Count words across strings / arrays / nested objects of strings.
   Used by QA to verify the 1,500+ word target per page. */
export function wordCount(value) {
  let text = "";
  const walk = (v) => {
    if (v == null) return;
    if (typeof v === "string") { text += " " + v; return; }
    if (Array.isArray(v)) { v.forEach(walk); return; }
    if (typeof v === "object") { Object.values(v).forEach(walk); }
  };
  walk(value);
  const words = text.trim().split(/\s+/).filter(Boolean);
  return words.length;
}

/* Guard against em dashes anywhere in copy (project style rule). */
export function findEmDashes(value) {
  const hits = [];
  const walk = (v, path) => {
    if (v == null) return;
    if (typeof v === "string") { if (/[—–]/.test(v)) hits.push({ path, text: v }); return; }
    if (Array.isArray(v)) { v.forEach((x, i) => walk(x, `${path}[${i}]`)); return; }
    if (typeof v === "object") { Object.entries(v).forEach(([k, x]) => walk(x, path ? `${path}.${k}` : k)); }
  };
  walk(value, "");
  return hits;
}

export function jsonLdScript(obj) {
  // JSON-LD must not contain raw </script>; escape the forward slash.
  return `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, "\\u003c")}</script>`;
}
