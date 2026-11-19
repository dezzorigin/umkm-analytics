# CHANGELOG.md — umkm-analytics

Semua perubahan penting dicatat di sini. Format mengikuti
[Keep a Changelog](https://keepachangelog.com/id/1.1.0/).

## [1.0.0] — 2026-11-19

### Ditambahkan

- **Proper P1 (#41):** LICENSE MIT, `.gitignore`, README standar,
  `docs/` lengkap (PRD, arsitektur, cara pakai, testing, deploy,
  DESIGN, diagram), CHANGELOG ini.
- **Makefile:** target `test` (smoke test nyata) dan `clean`;
  `-Wextra` ditambahkan ke flags (build asli `gcc -O0 -Wall`
  dipertahankan).
- **Smoke test** (`scripts/smoke-test.sh`): menjalankan binary dan
  meng-assert output — hasil Bubble terurut menaik, hasil Merge
  terurut leksikografis, input tidak valid ditolak.
- **CI** (`.github/workflows/ci.yml`): build-test (gcc + make test +
  benchmark 6 algoritma), static-checks (html-validate + gate P0),
  advisory-sweep OSV (0 dep produksi), Playwright e2e landing,
  smoke repo.
- **Landing statis** (`index.html`, `styles.css`, `app.js`):
  sesi terminal hero dengan output asli, tab 6 algoritma dengan
  kutipan output asli, grafik bar ASCII benchmark contoh, cara pakai,
  struktur repo. Arah desain: terminal fosfor amber
  (`docs/DESIGN.md`).
- **OG preview:** tag og:/twitter: lengkap + `og-image.png`
  1200×630 (digambar PIL mengikuti palet landing, bukan screenshot).
- **Deploy:** Cloudflare Pages — https://umkm-analytics.pages.dev/

### Diperbaiki

- README lama (461 karakter, tanpa penjelasan build/jalan) diganti
  README standar dengan contoh input/output asli.

### Catatan

- Nama repo menyesatkan (isinya tugas sorting, bukan analitik UMKM) —
  didokumentasikan jujur di PRD dan README, tidak diarang fitur UMKM.
- Screenshot README + video demo: follow-up (browser live / saat VM
  pulih), bukan gate merge.
