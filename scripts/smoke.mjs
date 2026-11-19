// Smoke folder repo — persis yang di-deploy ke Cloudflare Pages.
// Dijalankan CI (npm run smoke): pastikan semua file yang dirujuk
// landing ada dan tidak kosong; jangan sampai deploy berisi link mati.
import { existsSync, statSync, readFileSync } from "node:fs";

const required = [
  "index.html",
  "styles.css",
  "app.js",
  "og-image.png",
  "favicon.svg",
  "README.md",
  "LICENSE",
  "Makefile",
  "src/main.c",
  "src/utils.c",
  "src/basic_sorting.c",
  "src/advance_sorting.c",
  "words.txt",
];

const failures = [];
for (const f of required) {
  if (!existsSync(f)) {
    failures.push(`${f} tidak ada`);
  } else if (statSync(f).size === 0) {
    failures.push(`${f} kosong (0 byte)`);
  }
}

// og-image minimal 10 KB (kartu desain, bukan placeholder 1 KB)
if (existsSync("og-image.png") && statSync("og-image.png").size < 10 * 1024) {
  failures.push(`og-image.png < 10 KB (${statSync("og-image.png").size} byte)`);
}

// semua href/src lokal di index.html harus mengarah ke file yang ada
const html = readFileSync("index.html", "utf8");
for (const m of html.matchAll(/(?:href|src)="([^":#]+)"/g)) {
  const p = m[1];
  if (p.startsWith("http") || p.startsWith("data:") || p.startsWith("#")) continue;
  if (!existsSync(p)) failures.push(`index.html merujuk ${p} yang tidak ada`);
}

if (failures.length > 0) {
  console.error(`FAIL: smoke repo:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}
console.log("OK: smoke repo lolos — semua file deploy ada dan tidak kosong");
