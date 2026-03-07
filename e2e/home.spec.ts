import { expect, test } from "@playwright/test";

test("homepage renders core CRASH Lab sections", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("h1")).toContainText("Responsible AI");
  await expect(page.locator("h1")).toContainText("built for Healthcare.");
  await expect(
    page.getByRole("link", { name: /Explore Open Projects/i }).first(),
  ).toBeVisible();
  await expect(page.getByText("The Problems We Work On")).toBeVisible();
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "Radiology's Last Exam (RadLE)",
    }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /All Posts/i })).toBeVisible();
});

test("theme follows the user system preference on first load", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(248, 250, 252)");

  await page.emulateMedia({ colorScheme: "dark" });
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(10, 15, 30)");
});

test("theme toggle switches between dark and light", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");

  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(10, 15, 30)");

  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(248, 250, 252)");

  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(10, 15, 30)");
});

test("theme preference persists on reload", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");

  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await page.reload();

  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(248, 250, 252)");
});
