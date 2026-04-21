import { expect, test } from "@playwright/test";

test("homepage renders core CRASH Lab sections", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("h1")).toContainText("Responsible AI");
  await expect(page.locator("h1")).toContainText("built for Healthcare.");
  await expect(page.getByRole("link", { name: /Join the team/i })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: /The field has outgrown its benchmarks/i })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: /Four pillars. One clock/i })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: /Radiology's Last Exam/i })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: /Hold healthcare AI to the hard test/i })).toBeVisible();
});

test("homepage stays in light mode regardless of system preference", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  expect(await page.locator("html").getAttribute("data-theme")).toBeNull();
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(250, 250, 248)");

  await page.emulateMedia({ colorScheme: "dark" });
  await page.reload();
  expect(await page.locator("html").getAttribute("data-theme")).toBeNull();
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(250, 250, 248)");
});

test("navigation no longer exposes a theme toggle", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("button", { name: /switch to .* theme/i })).toHaveCount(0);
  await expect(page.getByText("Appearance")).toHaveCount(0);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open menu" }).click();

  await expect(page.getByText("Appearance")).toHaveCount(0);
  await expect(page.getByRole("button", { name: /switch to .* theme/i })).toHaveCount(0);
});
