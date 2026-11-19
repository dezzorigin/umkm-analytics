// Gate P0 anti-slop + kelengkapan tag OG/Twitter untuk landing.
// Dijalankan CI (npm run validate) — gagal = PR tidak merge.
// Aturan dari ~/workspace/github-actions/ui-anti-slop.md §2-3.
import { readFileSync, existsSync } from "node:fs";

const html = readFileSync("index.html", "utf8");
const css = readFileSync("styles.css", "utf8");
const failures = [];
const notes = [];

function fail(msg) {
  failures.push(msg);
}
function check(cond, msg) {
  if (!cond) fail(msg);
}

// ── P0: gradient ──────────────────────────────────────────────────────────
check(!/linear-gradient|radial-gradient|conic-gradient/i.test(css + html),
  "P0: gradient terlarang di hero/background");
// ── P0: headline gradient (bg-clip-text) ──────────────────────────────────
check(!/bg-clip-text|background-clip:\s*text/i.test(css + html),
  "P0: teks headline gradient terlarang");
// ── P0: font Inter / Roboto / system font untuk semuanya ──────────────────
check(!/font-family:\s*[^;]*\bInter\b/i.test(css),
  "P0: font Inter terlarang");
check(!/font-family:\s*[^;]*\bRoboto\b/i.test(css),
  "P0: font Roboto terlarang");
check(/JetBrains Mono/.test(css), "font display harus JetBrains Mono");
// ── P0: emoji mentah sebagai ikon fungsi ──────────────────────────────────
const emojiRe = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u;
check(!emojiRe.test(html), "P0: emoji mentah sebagai ikon terlarang");
// ── P0: copy generik ──────────────────────────────────────────────────────
for (const phrase of ["Elevate your workflow", "Unlock the power", "Supercharge"]) {
  check(!html.toLowerCase().includes(phrase.toLowerCase()),
    `P0: copy generik terlarang: "${phrase}"`);
}
// ── P0: rounded-2xl shadow-lg di semua permukaan ──────────────────────────
check(!/rounded-2xl/.test(html) && !/border-radius:\s*(1rem|16px)/.test(css),
  "P0: rounded-2xl di semua permukaan terlarang");
// ── P0: statistik vanity tanpa sumber ─────────────────────────────────────
for (const phrase of ["99.9% uptime", "10x faster", "50k+ users", "10x lebih cepat"]) {
  check(!html.includes(phrase), `P0: statistik vanity tanpa sumber: "${phrase}"`);
}

// ── Orde-kedua: krim + terracotta, near-black + lime, label mono all-caps
// di mana-mana, hiasan 01/02/03 ────────────────────────────────────────────
check(!/#39d353|#4af626/i.test(css), "orde-kedua: lime fosfor terlarang — pakai amber");
check(!/Krim|Terracotta|#e2725b/i.test(css), "orde-kedua: krim+terracotta terlarang");

// ── Tag OG + Twitter wajib lengkap ────────────────────────────────────────
const ogRequired = [
  ["og:title", /<meta property="og:title" content="[^"]+"/],
  ["og:description", /<meta property="og:description" content="[^"]+"/],
  ["og:type", /<meta property="og:type" content="website"/],
  ["og:url", /<meta property="og:url" content="https:\/\/umkm-analytics\.pages\.dev\/"/],
  ["og:image", /<meta property="og:image" content="https:\/\/umkm-analytics\.pages\.dev\/og-image\.png"/],
  ["twitter:card", /<meta name="twitter:card" content="summary_large_image"/],
  ["twitter:title", /<meta name="twitter:title" content="[^"]+"/],
  ["twitter:description", /<meta name="twitter:description" content="[^"]+"/],
  ["twitter:image", /<meta name="twitter:image" content="https:\/\/umkm-analytics\.pages\.dev\/og-image\.png"/],
];
for (const [name, re] of ogRequired) {
  check(re.test(html), `tag ${name} tidak ada / tidak absolut ke umkm-analytics.pages.dev`);
}
check(existsSync("og-image.png"), "og-image.png tidak ada di root");
check(existsSync("favicon.svg"), "favicon.svg tidak ada di root");

// ── Angka benchmark dilabeli contoh (jujur) ───────────────────────────────
check(/contoh/i.test(html) && /berubah tiap jalan/i.test(html),
  "angka benchmark harus dilabeli contoh + berubah tiap jalan");

// ── Marker landing ────────────────────────────────────────────────────────
check(html.includes("algoritmaSorting"), "marker 'algoritmaSorting' tidak ada");
check(html.includes("Bubble Sort") && html.includes("Quick Sort"),
  "daftar 6 algoritma tidak lengkap di landing");

if (failures.length > 0) {
  console.error(`FAIL: ${failures.length} pelanggaran:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}
console.log("OK: gate P0 + tag OG/Twitter + marker landing lolos");
for (const n of notes) console.log("note: " + n);
