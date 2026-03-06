import { expect, test } from "@playwright/test";

test("homepage renders core CRASH Lab sections", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("h1")).toContainText("Responsible AI");
  await expect(page.locator("h1")).toContainText("built for Healthcare.");
  await expect(page.getByRole("link", { name: /Explore Open Research/i })).toBeVisible();
  await expect(page.getByText("The Problems We Work On")).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 2, name: "Radiology's Last Exam (RadLE)" })
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /All Posts/i })).toBeVisible();
});
