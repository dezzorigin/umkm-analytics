#!/usr/bin/env bash
# Smoke test nyata untuk ./algoritmaSorting — BUKAN echo sukses.
# Menjalankan binary dengan input pipa (menu interaktif) dan meng-assert:
#   1. exit code 0 di semua jalur
#   2. header program muncul
#   3. Bubble Sort: 1000 integer, ada "Waktu Eksekusi", dan 10 data pertama
#      SETELAH sorting benar-benar terurut menaik (dicek dengan awk)
#   4. Merge Sort: dataset 3000 kata termuat, ada "Waktu Eksekusi",
#      dan 10 kata pertama SETELAH sorting terurut leksikografis
#   5. Jalur keluar: "Terima kasih! Program selesai."
#   6. Input tidak valid ditolak dengan pesan, program tidak crash
#
# Dipakai `make test` dan CI (job build-test). Data diacak tiap jalan
# (srand(time)), jadi yang di-assert adalah SIFAT output, bukan nilai
# pastinya — kecuali urutan terurut, yang harus selalu benar.
set -euo pipefail
cd "$(dirname "$0")/.."

BIN=./algoritmaSorting
[ -x "$BIN" ] || { echo "FAIL: $BIN tidak ada — jalankan 'make' dulu"; exit 1; }

fail() { echo "FAIL: $1"; exit 1; }

# --- 1. Bubble Sort (menu 1 -> 1 -> kembali -> keluar) ---------------------
OUT_BUBBLE=$(printf '1\n1\n4\n3\n' | "$BIN")
echo "$OUT_BUBBLE" | grep -q "Tugas 2 Praktikum Struktur Data dan Algoritma B" \
  || fail "header program tidak muncul (bubble)"
echo "$OUT_BUBBLE" | grep -q "Algoritma     : Bubble Sort" \
  || fail "label Bubble Sort tidak muncul"
echo "$OUT_BUBBLE" | grep -q "Jumlah Data   : 1000 integer" \
  || fail "jumlah data bubble bukan 1000 integer"
echo "$OUT_BUBBLE" | grep -qE "Waktu Eksekusi: [0-9]+\.[0-9]+ detik" \
  || fail "waktu eksekusi bubble tidak tercetak"
echo "$OUT_BUBBLE" | grep -q "Terima kasih! Program selesai." \
  || fail "pesan keluar tidak muncul (bubble)"

# 10 data pertama SETELAH sorting harus menaik — ambil blok setelah
# "Data SETELAH sorting - Bubble Sort", 10 baris "  [   N] <angka>".
# CATATAN: pakai kelas [ \t] bukan \s (mawk 1.3.4 tidak kenal \s — pola
# \s tidak pernah match dan cek ini lolos hampa), dan nilainya adalah
# $3 ("[", "1]", "2" → $3), bukan $2.
echo "$OUT_BUBBLE" | awk '
  /Data SETELAH sorting - Bubble Sort/ { in_block=1; next }
  in_block && /^[ \t]+\[[ \t]*[0-9]+\] [0-9]+$/ {
    v=$3; n++
    if (prev != "" && v < prev) { print "FAIL: data tidak terurut: " prev " lalu " v; exit 1 }
    prev=v
    if (n==10) exit 0
  }
  in_block && /^[ \t]+\.\.\./ { exit 0 }
' || fail "data hasil Bubble Sort tidak terurut menaik"

# --- 2. Merge Sort (menu 2 -> 1 -> kembali -> keluar) -----------------------
OUT_MERGE=$(printf '2\n1\n4\n3\n' | "$BIN")
echo "$OUT_MERGE" | grep -q "Berhasil memuat 3000 kata" \
  || fail "dataset kata tidak termuat 3000 (merge)"
echo "$OUT_MERGE" | grep -q "Algoritma     : Merge Sort" \
  || fail "label Merge Sort tidak muncul"
echo "$OUT_MERGE" | grep -q "Jumlah Data   : 3000 kata" \
  || fail "jumlah data merge bukan 3000 kata"
echo "$OUT_MERGE" | grep -qE "Waktu Eksekusi: [0-9]+\.[0-9]+ detik" \
  || fail "waktu eksekusi merge tidak tercetak"

echo "$OUT_MERGE" | awk '
  /Data SETELAH sorting - Merge Sort/ { in_block=1; next }
  in_block && /^[ \t]+\[[ \t]*[0-9]+\] / {
    v=$3; n++
    if (prev != "" && v < prev) { print "FAIL: kata tidak terurut: " prev " lalu " v; exit 1 }
    prev=v
    if (n==10) exit 0
  }
  in_block && /^[ \t]+\.\.\./ { exit 0 }
' || fail "kata hasil Merge Sort tidak terurut leksikografis"

# --- 3. Input tidak valid ---------------------------------------------------
OUT_BAD=$(printf 'x\n9\n3\n' | "$BIN")
echo "$OUT_BAD" | grep -q "Input tidak valid" \
  || fail "input huruf tidak ditolak dengan pesan"
echo "$OUT_BAD" | grep -q "Pilihan tidak valid" \
  || fail "pilihan 9 tidak ditolak dengan pesan"
echo "$OUT_BAD" | grep -q "Terima kasih! Program selesai." \
  || fail "program tidak keluar bersih setelah input tidak valid"

echo "OK: smoke test lolos — bubble terurut (1000 int), merge terurut (3000 kata), input tidak valid ditolak"
