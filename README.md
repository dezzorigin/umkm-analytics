# umkm-analytics — 6 Algoritma Sorting di C, Diukur Waktunya

Program CLI bahasa C yang mengimplementasikan **6 algoritma sorting**
dan mengukur waktu eksekusinya secara modular.
**Tugas 2 — Praktikum Struktur Data dan Algoritma B.**

> **Catatan jujur soal nama repo:** repo ini bernama `umkm-analytics`,
> tapi isinya adalah program sorting — bukan analitik UMKM. Tidak ada
> fitur UMKM yang diarang di sini; landing dan docs menjelaskan tool
> apa adanya.

**Landing (etalase):** https://umkm-analytics.pages.dev/

---

## Anggota Kelompok

| No | Nama | NIM |
|----|------|-----|
| 1  | Virzi Mayhand Syahputra | 250810701100077 |
| 2  | Nabil Aulia Dika        | 250810701100090 |
| 3  | Ahmad Wazir Sahfikri    | 250810701100050 |

---

## Yang dilakukan program ini

| Kelompok | Algoritma | Data |
|---|---|---|
| Sorting Dasar | Bubble Sort, Insertion Sort, Selection Sort | 1000 integer acak (1–10000) |
| Advance Sorting | Merge Sort, Quick Sort, Shell Sort | 3000 kata dari `words.txt` |

Setiap algoritma yang dipilih menampilkan: data sebelum shuffle,
sesudah shuffle, sesudah sorting (10 pertama), lalu ringkasan —
nama algoritma, jumlah data, dan **waktu eksekusi** (`clock()`,
detik, 6 desimal).

## Cara build & jalan

Prasyarat: `gcc` + `make`. Tanpa dependensi lain.

```sh
git clone https://github.com/dezzorigin/umkm-analytics.git
cd umkm-analytics
make                    # menghasilkan ./algoritmaSorting
./algoritmaSorting      # menu interaktif
make test               # smoke test: assert output binary
make clean              # hapus binary
```

Menu: **1** Sorting Dasar · **2** Advance Sorting · **3** Keluar.
`words.txt` harus berada di direktori yang sama dengan binary
(untuk Advance Sorting).

## Contoh output asli

```sh
$ printf '1\n1\n4\n3\n' | ./algoritmaSorting
```

```
============================================================
  Tugas 2 Praktikum Struktur Data dan Algoritma B
  Implementasi dan Analisis Algoritma Sorting - Bahasa C
============================================================
...
Data SETELAH sorting - Bubble Sort (10 data pertama):
------------------------------------------------------------
  [   1] 2
  [   2] 32
  [   3] 34
  [   4] 36
  [   5] 46
  ...
------------------------------------------------------------
  Algoritma     : Bubble Sort
  Jumlah Data   : 1000 integer
  Waktu Eksekusi: 0.005368 detik
------------------------------------------------------------
```

Contoh satu kali jalan penuh (19 Nov 2026, VM, gcc 13.3.0, `-O0`) —
**waktu berubah tiap jalan** karena data diacak:

| Algoritma | Data | Waktu |
|---|---|---|
| Bubble Sort | 1000 integer | 0.005368 dtk |
| Insertion Sort | 1000 integer | 0.001614 dtk |
| Selection Sort | 1000 integer | 0.003065 dtk |
| Merge Sort | 3000 kata | 0.002673 dtk |
| Quick Sort | 3000 kata | 0.002035 dtk |
| Shell Sort | 3000 kata | 0.002914 dtk |

Jangan bandingkan antar kelompok — datasetnya berbeda.

## Struktur repo

```
.
├── Makefile                  # build + test + clean
├── words.txt                 # 3000 kata, dataset advance sorting
├── src/
│   ├── main.c                # menu utama
│   ├── utils.c / utils.h     # swap, shuffle Fisher-Yates, tampil, load_words
│   ├── basic_sorting.c/.h    # bubble, insertion, selection
│   └── advance_sorting.c/.h  # merge, quick (median-of-three), shell
├── scripts/                  # smoke-test.sh, advisory-sweep.py (OSV)
├── docs/                     # PRD, arsitektur, cara pakai, testing, deploy, DESIGN
├── e2e/                      # Playwright (landing, CI saja)
├── index.html                # landing statis (etalase, di-deploy ke Pages)
└── og-image.png              # kartu preview 1200x630 (digambar PIL)
```

Detail arsitektur: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) ·
diagram SVG: [`docs/diagrams.html`](docs/diagrams.html) ·
cara pakai: [`docs/USAGE.md`](docs/USAGE.md) ·
pengujian: [`docs/TESTING.md`](docs/TESTING.md).

## Pengujian

```sh
make test
```

Smoke test menjalankan binary sungguhan dan meng-assert outputnya:
hasil Bubble terurut menaik, hasil Merge terurut leksikografis, input
tidak valid ditolak. CI (`.github/workflows/ci.yml`): build-test
(gcc), static-checks (html-validate + gate P0), advisory-sweep OSV,
Playwright e2e landing, smoke repo.

## Lisensi

MIT — lihat [LICENSE](LICENSE).
