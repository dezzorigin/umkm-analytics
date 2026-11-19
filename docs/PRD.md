# PRD — umkm-analytics

> Versi 1.0.0 — 19 Nov 2026. Dokumen ini menjelaskan produk **apa adanya**:
> tool CLI C untuk Tugas 2 Praktikum Struktur Data dan Algoritma B.
> Nama repo (`umkm-analytics`) tidak mencerminkan isinya — tidak ada fitur
> analitik UMKM di repo ini, dan PRD ini tidak mengarangnya.

## 1. Ringkasan

Program CLI bahasa C yang mengimplementasikan **6 algoritma sorting** dan
mengukur waktu eksekusinya secara modular:

| Kelompok | Algoritma | Data | Ukuran |
|---|---|---|---|
| Sorting Dasar | Bubble Sort, Insertion Sort, Selection Sort | integer acak 1–10000 | 1000 |
| Advance Sorting | Merge Sort, Quick Sort, Shell Sort | kata dari `words.txt` | 3000 |

Setiap kali algoritma dipilih, program menampilkan data sebelum shuffle,
sesudah shuffle, sesudah sorting (10 pertama), lalu ringkasan: nama
algoritma, jumlah data, waktu eksekusi (`clock()`, detik, 6 desimal).

## 2. Pengguna & konteks

- **Pengguna:** mahasiswa Praktikum Struktur Data dan Algoritma B (USK)
  dan siapa pun yang ingin membandingkan kecepatan 6 algoritma sorting
  klasik di C.
- **Tim pembuat:** Virzi Mayhand Syahputra (250810701100077), Nabil Aulia
  Dika (250810701100090), Ahmad Wazir Sahfikri (250810701100050).
- **Konteks:** tugas kelompok mata kuliah — kode ditulis kolaboratif,
  tiap anggota menyumbang modul.

## 3. Kebutuhan fungsional

1. **Menu utama interaktif** — pilih 1 (Sorting Dasar), 2 (Advance
   Sorting), 3 (Keluar). Input bukan angka / di luar 1–3 ditolak dengan
   pesan, program tidak crash.
2. **Sorting Dasar** — generate 1000 integer acak (`rand() % 10000 + 1`,
   seed `time(NULL)`), shuffle Fisher-Yates, sort dengan algoritma
   pilihan, tampilkan 10 data pertama di tiap tahap + waktu eksekusi.
3. **Advance Sorting** — muat `words.txt` sekali (maks 450.000 kata,
   maks 64 karakter/kata; baris header `word` dilewati), salin ke buffer
   kerja, shuffle, sort, tampilkan 10 kata pertama + waktu eksekusi.
4. **Pengukuran waktu** — `clock()` sebelum/sesudah sort, dicetak
   `%.6f detik`.
5. **Dataset** — `words.txt` (3000 kata) wajib berada di direktori yang
   sama dengan binary; kalau tidak ada, program mencetak `[ERROR]` dan
   kembali ke menu.

## 4. Kebutuhan non-fungsional

- **Build:** `make` saja — `gcc -O0 -Wall -Wextra`, tanpa dependensi
  eksternal, tanpa instalasi.
- **Portabilitas:** C standar (C99+), jalan di Linux/macOS/Windows
  (MinGW) selama ada compiler C.
- **Keterbacaan:** tiap algoritma di file/modul sendiri, komentar
  Bahasa Indonesia.
- **Determinisme hasil:** hasil sorting **selalu terurut** (diuji
  `make test`); nilai waktunya memang berubah tiap jalan karena data
  diacak — itu sifat program, bukan bug.

## 5. Batasan (jujur)

- Bukan aplikasi analitik UMKM — nama repo adalah nama yang diberikan
  saat repo dibuat, isinya tugas sorting.
- Tidak ada mode non-interaktif (argumen CLI) — semua lewat menu.
- Dataset advance sorting terbatas pada `words.txt` yang disertakan.
- Waktu eksekusi diukur dengan `clock()` (CPU time), bukan wall time.
- Quick Sort memakai pivot median-of-three + tail-call elimination
  pada partisi kecil; Merge Sort memakai buffer statis (maks setengah
  dari `MAX_WORDS`).

## 6. Kriteria selesai (proper P1)

- LICENSE MIT, `.gitignore`, README standar, docs lengkap.
- `make` + `make test` hijau (lokal & CI).
- CI: build-test (gcc), static-checks, advisory-sweep OSV, e2e
  Playwright landing, smoke repo.
- Landing statis live di Cloudflare Pages dengan tag OG/Twitter
  lengkap + og-image 1200×630.
