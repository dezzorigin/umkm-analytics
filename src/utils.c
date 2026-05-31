#include "utils.h"
#include <stdlib.h>
#include <string.h>

void swap_int(int *a, int *b) {
  int tmp = *a;
  *a = *b;
  *b = tmp;
}

void swap_str(char a[], char b[]) {
  char tmp[MAX_WORD_LEN];
  strcpy(tmp, a);
  strcpy(a, b);
  strcpy(b, tmp);
}

void shuffle_int(int arr[], int n) {
  for (int i = n - 1; i > 0; i--) {
    int j = rand() % (i + 1);
    swap_int(&arr[i], &arr[j]);
  }
}

void shuffle_str(char arr[][MAX_WORD_LEN], int n) {
  for (int i = n - 1; i > 0; i--) {
    int j = rand() % (i + 1);
    swap_str(arr[i], arr[j]);
  }
}

void cetak_pemisah(void) {
    printf("------------------------------------------------------------\n");
}

// untuk menampikan data integer pertama dari array
void tampil_int(int arr[], int n) {
    int limit = (n < DISPLAY_COUNT) ? n : DISPLAY_COUNT;
    for (int i = 0; i < limit; i++)
        printf("  [%4d] %d\n", i + 1, arr[i]);
    if (n > DISPLAY_COUNT)
        printf("  ... (%d data berikutnya tidak ditampilkan)\n",
               n - DISPLAY_COUNT);
}

// untuk menampilkan DISPLAY_COUNT kata pertama dari array string
void tampil_str(char arr[][MAX_WORD_LEN], int n) {
    int limit = (n < DISPLAY_COUNT) ? n : DISPLAY_COUNT;
    for (int i = 0; i < limit; i++)
        printf("  [%4d] %s\n", i + 1, arr[i]);
    if (n > DISPLAY_COUNT)
        printf("  ... (%d kata berikutnya tidak ditampilkan)\n",
               n - DISPLAY_COUNT);
}