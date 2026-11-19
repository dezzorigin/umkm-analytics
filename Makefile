# umkm-analytics — Tugas 2 Praktikum Struktur Data dan Algoritma B
# CLI C: 6 algoritma sorting + pengukuran waktu eksekusi.
#
#   make            -> build ./algoritmaSorting
#   make test       -> smoke test nyata (jalankan binary, assert output)
#   make clean      -> hapus binary hasil build
#
# Target build asli dipertahankan (gcc -O0 -Wall), ditambah -Wextra
# dan target test/clean.

CC ?= gcc
CFLAGS ?= -O0 -Wall -Wextra

SRCS = src/main.c src/utils.c src/basic_sorting.c src/advance_sorting.c

algoritmaSorting: $(SRCS) src/*.h
	$(CC) $(CFLAGS) -o algoritmaSorting $(SRCS)

.PHONY: test clean

test: algoritmaSorting
	@bash scripts/smoke-test.sh

clean:
	rm -f algoritmaSorting *.o
