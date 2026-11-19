# ARCHITECTURE.md — umkm-analytics

> Arsitektur program CLI C (bukan app web). Landing statis di root repo
> adalah etalase — arsitektur di bawah ini adalah arsitektur **binary**
> `algoritmaSorting`. Diagram visual: `docs/diagrams.html`.

## 1. Gambaran

```
┌──────────────┐
│   main.c     │  menu utama + header program
│  (entry)     │
└──────┬───────┘
       │ pilih 1 / 2
       ▼
┌──────────────┐      ┌──────────────┐
│ basic_       │      │ advance_     │
│ sorting.c    │      │ sorting.c    │
│ bubble /     │      │ merge /      │
│ insertion /  │      │ quick /      │
│ selection    │      │ shell        │
└──────┬───────┘      └──────┬───────┘
       │                     │
       └─────────┬───────────┘
                 ▼
        ┌──────────────┐
        │   utils.c    │
        │ swap ·       │
        │ shuffle ·    │
        │ tampil ·     │
        │ load_words   │
        └──────────────┘
                 │
                 ▼
        ┌──────────────┐
        │  words.txt   │  dataset (advance sorting)
        │  3000 kata   │
        └──────────────┘
```

## 2. Modul

| File | Tanggung jawab | Detail penting |
|---|---|---|
| `src/main.c` | Entry point, menu utama, header | Loop `scanf`, tolak input bukan angka (kuras stdin), keluar di pilihan 3 |
| `src/basic_sorting.c` | 3 algoritma dasar + menunya | Generate 1000 int acak per pilihan; `srand(time(NULL))`; ukur `clock()` |
| `src/advance_sorting.c` | 3 algoritma lanjut + menunya | Muat `words.txt` sekali ke buffer statis `g_words`; salin ke `g_work` tiap jalan; shuffle; ukur `clock()` |
| `src/utils.c` | Utilitas bersama | `swap_int/swap_str`, `shuffle_int/shuffle_str` (Fisher-Yates), `tampil_int/tampil_str` (10 pertama, `DISPLAY_COUNT`), `load_words` (lewati header `word`, potong CSV di koma pertama) |
| `src/utils.h` | Konstanta bersama | `MAX_DATA 1000`, `MAX_WORDS 450000`, `MAX_WORD_LEN 64`, `DISPLAY_COUNT 10`, `DATASET_FILE "words.txt"` |

## 3. Algoritma — catatan implementasi

- **Bubble Sort** — dengan early-exit (`swapped` flag).
- **Insertion Sort** — geser klasik.
- **Selection Sort** — cari minimum, tukar sekali per iterasi.
- **Merge Sort** — rekursif, buffer gabung statis `_merge_L/_merge_R`
  (masing-masing `MAX_WORDS/2 + 2` baris) supaya tidak `malloc` berulang.
- **Quick Sort** — pivot **median-of-three** (low/mid/high), partisi
  Lomuto, tail-call elimination: rekursi hanya pada partisi yang lebih
  kecil, partisi besar dilanjutkan dengan loop.
- **Shell Sort** — urutan gap Knuth (`gap = 3*gap + 1`, lalu `/= 3`).

Perbandingan string memakai `strcmp` (leksikografis, case-sensitive —
huruf besar sebelum huruf kecil: `AIDS` < `African`).

## 4. Alur data (satu pilihan menu)

1. **Generate/muat** — basic: 1000 int acak; advance: salin
   `g_words` → `g_work` (dataset sudah dimuat di kunjungan pertama).
2. **Tampilkan** 10 data pertama ("SEBELUM shuffle & sorting").
3. **Shuffle** Fisher-Yates, tampilkan 10 pertama ("SESUDAH shuffle,
   SEBELUM sorting").
4. **Sort + ukur** `clock()` di sekitar pemanggilan algoritma.
5. **Tampilkan** 10 pertama hasil + ringkasan (nama, jumlah, waktu).

## 5. Build

`Makefile` — satu target `algoritmaSorting`:

```
gcc -O0 -Wall -Wextra -o algoritmaSorting \
  src/main.c src/utils.c src/basic_sorting.c src/advance_sorting.c
```

`-O0` disengaja (tugas praktikum: waktu diukur pada kode tanpa
optimasi compiler). Target tambahan: `make test` (smoke test nyata),
`make clean`.

## 6. Landing (etalase, bukan produk)

`index.html` + `styles.css` + `app.js` di root repo — situs statis
yang di-deploy ke Cloudflare Pages. Tidak ada backend, tidak ada
build step. Isinya: sesi terminal hero (output asli), tab 6 algoritma
(output asli per tab), grafik bar ASCII (benchmark contoh), cara pakai,
struktur repo. Arah desain: `docs/DESIGN.md`.
