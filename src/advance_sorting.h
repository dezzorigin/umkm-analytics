#ifndef ADVANCE_SORT_H
#define ADVANCE_SORT_H

#include "utils.h"

void merge_sort(char arr[][MAX_WORD_LEN], int left, int right);
void quick_sort(char arr[][MAX_WORD_LEN], int low, int high);
void shell_sort(char arr[][MAX_WORD_LEN], int n);

void menu_advance_sorting(void);

#endif