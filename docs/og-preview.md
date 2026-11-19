# og-preview.md — umkm-analytics

Kartu preview saat URL ditempel (Open Graph + Twitter).

- **URL live:** https://umkm-analytics.pages.dev/
- **og-image:** https://umkm-analytics.pages.dev/og-image.png
  (1200×630, ~51 KB, digambar PIL dari `scripts/make-og-image.py`
  mengikuti palet landing — **bukan screenshot asli**).
- **Tag:** `og:title`, `og:description`, `og:type`, `og:url`,
  `og:image`, `twitter:card` (`summary_large_image`),
  `twitter:title`, `twitter:description`, `twitter:image` — semua
  absolut ke `umkm-analytics.pages.dev`.
- **Gate CI:** `scripts/check-static.mjs` menggagalkan PR kalau ada
  tag yang hilang, dan `scripts/smoke.mjs` menggagalkan kalau
  `og-image.png` < 10 KB.
- **Verifikasi live:** `/og-image.png` harus 200 dengan
  `Content-Type: image/*` (bukan `text/html` — Pages fallback menipu).

Isi kartu: jendela terminal amber — judul `umkm-analytics`, perintah
`$ ./algoritmaSorting`, ringkasan Bubble Sort asli (1000 integer,
0.005368 detik), dan dua bar ASCII (Bubble vs Insertion).
