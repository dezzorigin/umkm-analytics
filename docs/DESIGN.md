# DESIGN.md — Kontrak Arah Desain UMKM Analytics

> Ditulis SEBELUM coding (standar anti-slop P1). Referensi dulu, baru bangun.
> Produk: **bukan app web** — ini tool CLI C (Tugas 2 Praktikum Struktur Data
> dan Algoritma B) yang mengimplementasikan 6 algoritma sorting dan mengukur
> waktu eksekusinya. Landing di repo ini adalah **etalase**: menjelaskan tool,
> menampilkan output asli, dan cara install/build. Produknya tetap binary C.

## Kejujuran isi (penting)

Nama repo `umkm-analytics` menyesatkan: isi repo aslinya adalah program
sorting (Bubble/Insertion/Selection pada 1.000 integer acak; Merge/Quick/
Shell pada 3.000 kata dari `words.txt`), bukan analitik UMKM. Tidak ada
fitur UMKM yang di-invent di sini — landing menjelaskan tool apa adanya,
dengan nama tim asli (Virzi Mayhand Syahputra, Nabil Aulia Dika, Ahmad
Wazir Sahfikri) dan angka benchmark dari **satu kali jalan nyata** di VM
(gcc 13.3.0, `-O0`), dilabeli "contoh — waktu berubah tiap jalan karena
data diacak + `clock()`". Tidak ada statistik vanity, tidak ada klaim
"10x lebih cepat".

## Referensi

**Pemenang: Developer Terminal — StyleKit**
https://www.stylekit.top/en/styles/developer-terminal

Kenapa menang: seluruh situs adalah **satu sesi terminal** — perintah,
output, komentar `#`, daftar ala `ls -la`, status bar ala tmux, kursor
berkedip. Itu persis cara tool ini dipakai: `$ make`, lalu
`./algoritmaSorting`, lalu output. Strukturnya yang di-clone: halaman
sebagai sesi shell (blok perintah + blok output berpasangan), header
status-bar, dan tipografi mono di semua level.
Yang diubah: palet fosfor hijau diganti **fosfor amber** (CRT amber P3 —
garis keturunan terminal yang sama, tapi bukan klise hijau-lime), latar
bukan hitam murni, dan isi disesuaikan ke 6 algoritma + benchmark nyata.

Kandidat yang kalah:

- **Terminal Green — designmd.app**
  https://designmd.app/library/terminal-green
  Kalah: palet hijau fosfor `#39d353` di `#0d1117` adalah klise
  "near-black + lime" yang masuk daftar orde-kedua terlarang; yang
  dipinjam hanya prinsip "mono non-negotiable + scanline tipis".
- **Supabase Dark Emerald — designmd.app**
  https://designmd.app/library/supabase-dark-emerald
  Kalah: emerald mewah + spasi lega adalah bahasa dashboard SaaS,
  bukan bahasa tool CLI kampus; yang dipinjam hanya prinsip "satu
  aksen dominan, jangan berebut".

## Palet (6 warna bernama, tiap warna punya tugas)

| Nama | Hex | Peran |
|---|---|---|
| Arang Malam | `#12100B` | Latar utama halaman (hitam hangat, bukan hitam murni) |
| Panel Kayu | `#1B1813` | Latar panel/kartu terminal |
| Fosfor Amber | `#FFB000` | Prompt `$`, aksen, CTA, kursor — satu-satunya warna sorot |
| Kertas Hangat | `#EDE6D6` | Teks utama |
| Abu Kapur | `#8A8272` | Teks redup, komentar `#`, metadata |
| Daun Sortir | `#58B368` | Status "terurut / OK" dan bar benchmark tercepat |

Garis pembatas: `#2E2A22`. Tidak ada gradient, tidak ada ungu/biru.

## Tipografi (1 keluarga)

**JetBrains Mono** untuk semuanya — display, body, data, angka
(tabular-nums bawaan mono). Hierarki dibedakan ukuran + warna + bobot,
bukan keluarga font. Fallback: `ui-monospace, "Cascadia Mono", Menlo,
Consolas, monospace`. Berbeda dari #40 (Archivo + IBM Plex Mono).

## Layout (satu kalimat + satu detail khas)

Satu kolom sempit (max 880px) yang dibaca seperti sesi terminal dari
atas ke bawah: status bar → jendela terminal hero (perintah + output
asli) → daftar algoritma ala `ls` → dua grafik bar ASCII → cara pakai
→ footer status bar. **Detail khas: kursor blok amber yang berkedip di
akhir perintah terakhir, dan grafik benchmark digambar dengan karakter
`█` (bukan SVG chart generik).**

## Beda dari #40 (bem-election) — 5 dari 5 sumbu

| Sumbu | #40 bem-election | #41 umkm-analytics |
|---|---|---|
| Palet | kertas `#FDFBF3` + teal + merah coblos (terang) | arang gelap + fosfor amber (terminal) |
| Tipografi | Archivo display + IBM Plex Mono | JetBrains Mono saja |
| Layout | hero 2 kolom + kartu surat suara | satu kolom sesi terminal |
| Radius/spacing | kartu rounded, spasi lega | sudut tajam 2px, rapat ala terminal |
| Detail khas | kartu surat suara + simulasi coblos | kursor berkedip + bar chart ASCII |

## Larangan P0 yang dicek

Nol gradient, nol Inter/Roboto/system font, nol hero tengah + 3 kartu
identik, nol emoji sebagai ikon (ikon = SVG stroke tipis atau karakter
ASCII), nol statistik vanity, nol headline gradient, nol tema mentah,
nol `rounded-2xl shadow-lg` di semua permukaan, nol copy generik.
Gate ini dijalankan CI di `scripts/check-static.mjs`.
