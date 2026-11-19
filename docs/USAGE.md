# USAGE.md — Cara Pakai

## Prasyarat

- `gcc` (atau compiler C apa pun) + `make`
- Tidak ada dependensi lain — tanpa library eksternal, tanpa instalasi.

Cek: `gcc --version && make --version`

## Build

```sh
git clone https://github.com/dezzorigin/umkm-analytics.git
cd umkm-analytics
make
```

Hasil: binary `./algoritmaSorting` di root repo.

```sh
make clean   # hapus binary hasil build
```

## Menjalankan

```sh
./algoritmaSorting
```

Program menampilkan header, lalu menu utama:

```
===== MENU UTAMA =====
1. Sorting Dasar
2. Advance Sorting
3. Keluar
Pilih menu :
```

### 1 — Sorting Dasar

Pilih metode: **1** Bubble Sort, **2** Insertion Sort, **3** Selection
Sort, **4** kembali. Program generate 1000 integer acak (1–10000),
menampilkan 10 pertama, mengacaknya (Fisher-Yates), menampilkan 10
pertama lagi, mengurutkan, lalu menampilkan 10 pertama hasil + waktu:

```
Data SETELAH sorting - Bubble Sort (10 data pertama):
------------------------------------------------------------
  [   1] 2
  [   2] 32
  ...
------------------------------------------------------------
  Algoritma     : Bubble Sort
  Jumlah Data   : 1000 integer
  Waktu Eksekusi: 0.005368 detik
```

### 2 — Advance Sorting

Pilih metode: **1** Merge Sort, **2** Quick Sort, **3** Shell Sort,
**4** kembali. Pada kunjungan pertama, program memuat `words.txt`
(3000 kata) — file ini **harus ada di direktori yang sama dengan
binary**. Kalau tidak ada:

```
  [ERROR] File 'words.txt' tidak ditemukan.
  Pastikan file berada di direktori yang sama dengan program.
```

Alurnya sama: tampilkan 10 kata pertama → shuffle → tampilkan lagi →
sort → tampilkan hasil + waktu.

### 3 — Keluar

```
Terima kasih! Program selesai.
```

## Input tidak valid

- Huruf di menu → `Input tidak valid! Masukkan angka 1-3.` (program
  tetap jalan).
- Angka di luar 1–3 → `Pilihan tidak valid! Masukkan angka 1-3.`

## Menjalankan tanpa mengetik (pipa)

Karena menunya membaca stdin, pilihan bisa dipipa — berguna untuk
pengujian dan demo:

```sh
# Bubble Sort sekali, lalu keluar
printf '1\n1\n4\n3\n' | ./algoritmaSorting

# Semua advance sorting sekali jalan
printf '2\n1\n2\n3\n4\n3\n' | ./algoritmaSorting
```

## Smoke test

```sh
make test
```

Menjalankan binary dengan input pipa dan meng-assert outputnya:
hasil Bubble terurut menaik, hasil Merge terurut leksikografis,
input tidak valid ditolak. Lihat `docs/TESTING.md`.
