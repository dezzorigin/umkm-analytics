// umkm-analytics landing — interaksi kecil: tab algoritma, tombol salin,
// jam status bar. Tanpa framework, tanpa fetch.
"use strict";

// Kutipan output ASLI (satu kali jalan tiap algoritma — angka waktu bisa
// sedikit berbeda antar jalan; yang dijamin: hasil selalu terurut).
const OUTPUTS = {
  bubble: {
    meta: ["Kelompok: Sorting Dasar", "Data: 1000 integer acak (1–10000)", "Kompleksitas: O(n²)"],
    text:
`Data SETELAH sorting - Bubble Sort (10 data pertama):
------------------------------------------------------------
  [   1] 2
  [   2] 32
  [   3] 34
  [   4] 36
  [   5] 46
  [   6] 55
  [   7] 56
  [   8] 56
  [   9] 59
  [  10] 65
  ... (990 data berikutnya tidak ditampilkan)
------------------------------------------------------------
  Algoritma     : Bubble Sort
  Jumlah Data   : 1000 integer
  Waktu Eksekusi: 0.005368 detik
------------------------------------------------------------`,
  },
  insertion: {
    meta: ["Kelompok: Sorting Dasar", "Data: 1000 integer acak (1–10000)", "Kompleksitas: O(n²)"],
    text:
`Data SETELAH sorting - Insertion Sort (10 data pertama):
------------------------------------------------------------
  [   1] 16
  [   2] 26
  [   3] 44
  [   4] 59
  [   5] 63
  [   6] 80
  [   7] 84
  [   8] 93
  [   9] 104
  [  10] 105
  ... (990 data berikutnya tidak ditampilkan)
------------------------------------------------------------
  Algoritma     : Insertion Sort
  Jumlah Data   : 1000 integer
  Waktu Eksekusi: 0.001625 detik
------------------------------------------------------------`,
  },
  selection: {
    meta: ["Kelompok: Sorting Dasar", "Data: 1000 integer acak (1–10000)", "Kompleksitas: O(n²)"],
    text:
`Data SETELAH sorting - Selection Sort (10 data pertama):
------------------------------------------------------------
  [   1] 16
  [   2] 26
  [   3] 44
  [   4] 59
  [   5] 63
  [   6] 80
  [   7] 84
  [   8] 93
  [   9] 104
  [  10] 105
  ... (990 data berikutnya tidak ditampilkan)
------------------------------------------------------------
  Algoritma     : Selection Sort
  Jumlah Data   : 1000 integer
  Waktu Eksekusi: 0.003741 detik
------------------------------------------------------------`,
  },
  merge: {
    meta: ["Kelompok: Advance Sorting", "Data: 3000 kata (words.txt)", "Kompleksitas: O(n log n)"],
    text:
`Data SETELAH sorting - Merge Sort (10 kata pertama):
------------------------------------------------------------
  [   1] AIDS
  [   2] AM
  [   3] African
  [   4] African-American
  [   5] American
  [   6] Arab
  [   7] Asian
  [   8] Bible
  [   9] British
  [  10] CEO
  ... (2990 kata berikutnya tidak ditampilkan)
------------------------------------------------------------
  Algoritma     : Merge Sort
  Jumlah Data   : 3000 kata
  Waktu Eksekusi: 0.002492 detik
------------------------------------------------------------`,
  },
  quick: {
    meta: ["Kelompok: Advance Sorting", "Data: 3000 kata (words.txt)", "Kompleksitas: O(n log n) rata-rata · pivot median-of-three"],
    text:
`Data SETELAH sorting - Quick Sort (10 kata pertama):
------------------------------------------------------------
  [   1] AIDS
  [   2] AM
  [   3] African
  [   4] African-American
  [   5] American
  [   6] Arab
  [   7] Asian
  [   8] Bible
  [   9] British
  [  10] CEO
  ... (2990 kata berikutnya tidak ditampilkan)
------------------------------------------------------------
  Algoritma     : Quick Sort
  Jumlah Data   : 3000 kata
  Waktu Eksekusi: 0.002442 detik
------------------------------------------------------------`,
  },
  shell: {
    meta: ["Kelompok: Advance Sorting", "Data: 3000 kata (words.txt)", "Kompleksitas: O(n log n) praktis · gap 3x+1"],
    text:
`Data SETELAH sorting - Shell Sort (10 kata pertama):
------------------------------------------------------------
  [   1] AIDS
  [   2] AM
  [   3] African
  [   4] African-American
  [   5] American
  [   6] Arab
  [   7] Asian
  [   8] Bible
  [   9] British
  [  10] CEO
  ... (2990 kata berikutnya tidak ditampilkan)
------------------------------------------------------------
  Algoritma     : Shell Sort
  Jumlah Data   : 3000 kata
  Waktu Eksekusi: 0.002601 detik
------------------------------------------------------------`,
  },
};

const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
const panelCode = document.getElementById("panel-code");
const panel = document.getElementById("panel-output");
const meta = document.getElementById("algo-meta");

function selectTab(tab, focus) {
  const algo = tab.dataset.algo;
  const data = OUTPUTS[algo];
  tabs.forEach((t) => {
    const selected = t === tab;
    t.setAttribute("aria-selected", String(selected));
    t.tabIndex = selected ? 0 : -1;
  });
  panelCode.textContent = data.text;
  panel.setAttribute("aria-labelledby", tab.id);
  meta.innerHTML = data.meta
    .map((m) => {
      const i = m.indexOf(":");
      return `<span><strong>${m.slice(0, i + 1)}</strong>${m.slice(i + 1)}</span>`;
    })
    .join("");
  if (focus) tab.focus();
}

tabs.forEach((tab, i) => {
  tab.addEventListener("click", () => selectTab(tab, false));
  tab.addEventListener("keydown", (e) => {
    let next = null;
    if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
    if (e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
    if (e.key === "Home") next = tabs[0];
    if (e.key === "End") next = tabs[tabs.length - 1];
    if (next) {
      e.preventDefault();
      selectTab(next, true);
    }
  });
});
selectTab(tabs[0], false);

// Tombol salin perintah build
const copyBtn = document.getElementById("copy-build");
const copyNote = document.getElementById("copy-note");
const BUILD_CMD =
  "git clone https://github.com/dezzorigin/umkm-analytics.git && cd umkm-analytics && make && ./algoritmaSorting";
copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(BUILD_CMD);
    copyBtn.textContent = "tersalin ✓";
    copyNote.textContent = "perintah build tersalin ke clipboard";
  } catch {
    copyNote.textContent = "clipboard diblokir browser — salin manual: " + BUILD_CMD;
  }
  window.setTimeout(() => {
    copyBtn.textContent = "salin perintah build";
    copyNote.textContent = "";
  }, 3000);
});

// Jam status bar (WIB)
const clock = document.getElementById("clock");
function tick() {
  clock.textContent = new Date().toLocaleTimeString("id-ID", {
    timeZone: "Asia/Jakarta",
    hour12: false,
  }) + " WIB";
}
tick();
window.setInterval(tick, 1000);
