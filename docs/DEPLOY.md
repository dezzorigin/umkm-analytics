# DEPLOY.md — Deploy

## Yang di-deploy

**Landing statis** di root repo (`index.html`, `styles.css`, `app.js`,
`og-image.png`, `favicon.svg`) ke Cloudflare Pages. Binary C **tidak**
di-deploy — produknya di-build pengguna sendiri dengan `make`
(lihat `docs/USAGE.md`).

## Cara deploy

Skrip: `~/workspace/github-actions/cf_pages.py` (direct-upload API
Cloudflare Pages, token via vault — jangan minta kredensial).

```sh
# 1. Buat proyek (sekali saja — sudah dibuat 19 Nov 2026)
python3 ~/workspace/github-actions/cf_pages.py create-project umkm-analytics

# 2. Deploy root repo sebagai production
python3 ~/workspace/github-actions/cf_pages.py deploy umkm-analytics ~/workspace/umkm-analytics
```

Nama proyek: **`umkm-analytics`** → https://umkm-analytics.pages.dev/
(pilihan pertama langsung tersedia; fallback yang disiapkan:
`umkm-analitik`, `analitik-umkm`).

## Verifikasi live (SEBELUM merge)

Pakai Python `urllib` dengan **User-Agent browser** — UA default
Python kena 403 dari Cloudflare:

```python
import urllib.request
req = urllib.request.Request(
    "https://umkm-analytics.pages.dev/",
    headers={"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"},
)
r = urllib.request.urlopen(req)
html = r.read().decode()
assert r.status == 200
assert "algoritmaSorting" in html            # marker landing
for tag in ["og:title", "og:description", "og:type", "og:url",
            "og:image", "twitter:card", "twitter:title",
            "twitter:description", "twitter:image"]:
    assert tag in html, tag
```

Lalu `/og-image.png` harus 200 dengan `Content-Type: image/*`
(bukan `text/html` — Pages fallback menipu).

## Homepage repo

Setelah live terverifikasi, set About → homepage repo ke URL Pages
(PATCH `/repos/dezzorigin/umkm-analytics`, field `homepage`).

## Catatan

- Deploy ulang tiap ada perubahan landing: jalankan lagi perintah
  `deploy` yang sama (branch production).
- Jangan deploy dari folder lain — root repo adalah sumber kebenaran.
