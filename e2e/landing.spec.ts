import { test, expect } from "@playwright/test";

// Landing umkm-analytics adalah etalase tool CLI: yang diuji adalah
// konten + interaksi halamannya (tab algoritma, tombol salin, navigasi).
// Tool CLI-nya sendiri diuji di job build-test CI (make test) — bukan
// di browser.

test("landing tampil: status bar, terminal hero, 6 algoritma", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/umkm-analytics/i);
  await expect(page.locator("text=algoritmaSorting").first()).toBeVisible();
  await expect(page.locator("text=Bubble Sort").first()).toBeVisible();
  await expect(page.locator("text=Quick Sort").first()).toBeVisible();
  await expect(page.locator("text=Shell Sort").first()).toBeVisible();
  // jendela terminal hero menampilkan perintah + output asli
  await expect(page.locator("text=gcc -O0 -Wall").first()).toBeVisible();
  await expect(page.locator("text=Waktu Eksekusi").first()).toBeVisible();
  // kursor berkedip ada (detail khas)
  await expect(page.locator(".cursor")).toHaveCount(1);
});

test("tab algoritma: ganti tab menampilkan output asli algoritma itu", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "Quick Sort" }).click();
  await expect(page.locator("#panel-output")).toContainText("Algoritma     : Quick Sort");
  await expect(page.locator("#panel-output")).toContainText("3000 kata");
  await page.getByRole("tab", { name: "Bubble Sort" }).click();
  await expect(page.locator("#panel-output")).toContainText("Algoritma     : Bubble Sort");
  await expect(page.locator("#panel-output")).toContainText("1000 integer");
});

test("tombol salin perintah build menyalin 'make'", async ({ page }) => {
  await page.goto("/");
  await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.getByRole("button", { name: /salin perintah build/i }).click();
  const clip = await page.evaluate(() => navigator.clipboard.readText());
  expect(clip).toContain("make");
  await expect(page.getByRole("button", { name: /tersalin/i })).toBeVisible();
});

test("mobile 390px: tanpa scroll horizontal", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBe(0);
});

test("og-image + favicon termuat (bukan 404)", async ({ page }) => {
  const og = await page.request.get("/og-image.png");
  expect(og.status()).toBe(200);
  expect(og.headers()["content-type"] ?? "").toMatch(/image\//);
  const fav = await page.request.get("/favicon.svg");
  expect(fav.status()).toBe(200);
});
