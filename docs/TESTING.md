# TESTING.md — Pengujian

## 1. Smoke test binary C (`make test`)

Skrip: `scripts/smoke-test.sh`. Dijalankan lokal (`make test`) dan di
CI (job `build-test`). Ini **bukan** echo sukses — skrip menjalankan
binary sungguhan dengan input pipa dan meng-assert **sifat output**:

| # | Yang diuji | Cara assert |
|---|---|---|
| 1 | Header program muncul | grep `Tugas 2 Praktikum Struktur Data dan Algoritma B` |
| 2 | Bubble Sort jalan | grep `Algoritma     : Bubble Sort` + `Jumlah Data   : 1000 integer` + `Waktu Eksekusi: N.NNNNNN detik` |
| 3 | Hasil Bubble **terurut menaik** | awk: 10 angka pertama setelah `Data SETELAH sorting - Bubble Sort` harus monoton naik |
| 4 | Merge Sort jalan + dataset termuat | grep `Berhasil memuat 3000 kata` + `Jumlah Data   : 3000 kata` + waktu eksekusi |
| 5 | Hasil Merge **terurut leksikografis** | awk: 10 kata pertama setelah `Data SETELAH sorting - Merge Sort` harus monoton naik (string) |
| 6 | Input tidak valid ditolak, program tidak crash | input `x`, `9`, `3` → ada `Input tidak valid` + `Pilihan tidak valid` + `Terima kasih! Program selesai.` |

Kenapa assert sifat, bukan nilai pasti: data diacak tiap jalan
(`srand(time(NULL))`), jadi angka/waktu pasti berbeda — yang harus
selalu benar adalah **hasil terurut**.

Hasil lokal (19 Nov 2026, gcc 13.3.0):

```
OK: smoke test lolos — bubble terurut (1000 int), merge terurut (3000 kata), input tidak valid ditolak
```

## 2. Benchmark contoh (bukan tes)

CI job `build-test` juga menjalankan keenam algoritma sekali jalan
dan mencatat waktunya di log (bukti binary jalan, bukan gate).
Contoh satu kali jalan di VM (gcc 13.3.0, `-O0`):

| Algoritma | Data | Waktu |
|---|---|---|
| Bubble Sort | 1000 integer | 0.005368 dtk |
| Insertion Sort | 1000 integer | 0.001614 dtk |
| Selection Sort | 1000 integer | 0.003065 dtk |
| Merge Sort | 3000 kata | 0.002673 dtk |
| Quick Sort | 3000 kata | 0.002035 dtk |
| Shell Sort | 3000 kata | 0.002914 dtk |

Waktu berubah tiap jalan. Jangan bandingkan antar kelompok (dataset
berbeda).

## 3. CI (`.github/workflows/ci.yml`)

| Job | Isi | Gate |
|---|---|---|
| `build-test` | `make` + `make test` + benchmark 6 algoritma | harus hijau |
| `static-checks` | `html-validate index.html` + `npm run validate` (gate P0 anti-slop + tag OG/Twitter) | harus hijau |
| `advisory-sweep` | `scripts/advisory-sweep.py` (OSV batch; 0 dep produksi) | HIGH/CRITICAL = gagal |
| `playwright-e2e` | Playwright terhadap server statis lokal (desktop + mobile): tab algoritma, tombol salin, tanpa overflow 390px, og-image 200 | harus hijau |
| `smoke` | `npm run smoke` — file deploy ada & tidak kosong, og-image ≥ 10 KB, href/src lokal valid | harus hijau |

Semua job memakai `npm install` (bukan `npm ci`) dan **tanpa**
`cache: npm` — repo belum punya `package-lock.json` (lihat catatan
di `ci.yml`). Lockfile hasil instalasi CI diunggah sebagai artifact.

## 4. Yang TIDAK diuji di VM dev (batas sandbox)

- `npm install` lokal: gagal deterministik EPERM (proses yang sudah
  I/O jaringan tidak boleh tulis file) — hanya di CI.
- Chromium/Playwright lokal: tidak bisa start (mmap memfd ditolak
  EPERM) — e2e hanya di CI.
- Screenshot/video demo: follow-up lewat browser live, bukan gate
  merge.
