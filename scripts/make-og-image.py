#!/usr/bin/env python3
"""Generate og-image.png 1200x630 for umkm-analytics (PIL, local only).

Design follows docs/DESIGN.md (amber CRT terminal):
Arang Malam #12100B, Panel Kayu #1B1813, Fosfor Amber #FFB000,
Kertas Hangat #EDE6D6, Abu Kapur #8A8272, Daun Sortir #58B368.
Card: terminal window with $ prompt + real bubble-sort output lines
+ ASCII timing bar. No gradients, no emoji, no stock imagery.
NOT a screenshot — a drawn card in the landing's own language.
"""
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
ARANG = (18, 16, 11)      # #12100B
PANEL = (27, 24, 19)      # #1B1813
AMBER = (255, 176, 0)     # #FFB000
KERTAS = (237, 230, 214)  # #EDE6D6
ABU = (138, 130, 114)     # #8A8272
DAUN = (88, 179, 104)     # #58B368
GARIS = (46, 42, 34)      # #2E2A22

MONO = "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf"
MONO_B = "/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf"

img = Image.new("RGB", (W, H), ARANG)
d = ImageDraw.Draw(img)

# terminal window frame
d.rounded_rectangle([48, 48, W - 48, H - 48], radius=4, outline=GARIS, width=2, fill=PANEL)
# title bar
d.rectangle([48, 48, W - 48, 104], fill=(24, 21, 15))
d.ellipse([76, 70, 92, 86], fill=AMBER)
d.ellipse([104, 70, 120, 86], fill=GARIS)
d.ellipse([132, 70, 148, 86], fill=GARIS)
f_bar = ImageFont.truetype(MONO, 26)
d.text((168, 66), "nabil@usk: ~/umkm-analytics", font=f_bar, fill=ABU)

# kicker
f_kick = ImageFont.truetype(MONO_B, 28)
d.text((88, 140), "TOOL CLI  ·  BAHASA C  ·  6 ALGORITMA SORTING", font=f_kick, fill=AMBER)

# title
f_title = ImageFont.truetype(MONO_B, 92)
d.text((84, 186), "umkm-analytics", font=f_title, fill=KERTAS)

# prompt + output lines
f_term = ImageFont.truetype(MONO, 30)
f_term_b = ImageFont.truetype(MONO_B, 30)
y = 316
d.text((88, y), "$ ./algoritmaSorting", font=f_term_b, fill=KERTAS)
y += 52
d.text((88, y), "Algoritma     : Bubble Sort", font=f_term, fill=KERTAS)
y += 46
d.text((88, y), "Jumlah Data   : 1000 integer", font=f_term, fill=KERTAS)
y += 46
d.text((88, y), "Waktu Eksekusi: 0.005368 detik", font=f_term, fill=DAUN)

# ASCII bar (bubble vs insertion, contoh)
f_bar2 = ImageFont.truetype(MONO, 26)
y = 500
d.text((88, y), "Bubble    " + "█" * 14 + "  0.005368 dtk", font=f_bar2, fill=DAUN)
y += 38
d.text((88, y), "Insertion " + "█" * 4 + "  0.001614 dtk", font=f_bar2, fill=ABU)

img.save("/home/hatch/workspace/umkm-analytics/og-image.png", "PNG", optimize=True)
print("saved og-image.png")
