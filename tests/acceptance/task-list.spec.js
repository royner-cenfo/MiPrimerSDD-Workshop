import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("shows the application name in its header and browser title", async ({ page }) => {
  await expect(page).toHaveTitle("Curso-PSWE-07");
  await expect(page.getByRole("heading", { name: "Curso-PSWE-07" })).toBeVisible();
});

test("creates tasks with and without descriptions and opens a task", async ({ page }) => {
  await page.getByRole("button", { name: "Add task" }).click();
  await page.getByLabel("Title").fill("Read a book");
  await page.getByLabel("Description").fill("Read chapter one");
  await page.getByRole("button", { name: "Save task" }).click();

  await expect(page.getByRole("button", { name: /Read a book/ })).toBeVisible();

  await page.getByRole("button", { name: "Add task" }).click();
  await page.getByLabel("Title").fill("Buy groceries");
  await page.getByRole("button", { name: "Save task" }).click();

  await page.getByRole("button", { name: /Read a book/ }).click();
  await expect(page.getByRole("heading", { name: "Read a book" })).toBeVisible();
  await expect(page.getByText("Read chapter one")).toBeVisible();
});

test("filters tasks by status and offers add task in empty states", async ({ page }) => {
  await expect(page.getByText(/no tasks/i)).toBeVisible();
  await expect(page.getByRole("button", { name: "Add task" })).toBeVisible();

  await page.getByRole("button", { name: "Add task" }).click();
  await page.getByLabel("Title").fill("Pending task");
  await page.getByRole("button", { name: "Save task" }).click();

  await page.getByRole("button", { name: "Pending", exact: true }).click();
  await expect(page.getByRole("button", { name: /Pending task/ })).toBeVisible();

  await page.getByRole("button", { name: "Done", exact: true }).click();
  await expect(page.getByText(/no tasks/i)).toBeVisible();
  await expect(page.getByRole("button", { name: "Add task" })).toBeVisible();

  await page.getByRole("button", { name: "All", exact: true }).click();
  await expect(page.getByRole("button", { name: /Pending task/ })).toBeVisible();
});

test("meets the minimum target size, contrast, and narrow-screen layout", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  const interactive = page.locator("button:visible");

  for (const button of await interactive.all()) {
    const box = await button.boundingBox();
    expect(box?.width).toBeGreaterThanOrEqual(44);
    expect(box?.height).toBeGreaterThanOrEqual(44);
  }

  const contrast = await page.locator("body").evaluate((body) => {
    const text = getComputedStyle(body).color.match(/\d+/g).map(Number);
    const background = getComputedStyle(body).backgroundColor.match(/\d+/g).map(Number);
    const luminance = ([r, g, b]) => {
      const linear = [r, g, b].map((value) => {
        const channel = value / 255;
        return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
    };
    const values = [luminance(text), luminance(background)].sort((a, b) => b - a);
    return (values[0] + 0.05) / (values[1] + 0.05);
  });

  expect(contrast).toBeGreaterThanOrEqual(4.5);
  expect(await page.locator("body").evaluate((body) => body.scrollWidth)).toBeLessThanOrEqual(320);

  await page.getByRole("button", { name: "Add task" }).click();
  await page.getByLabel("Title").fill("Responsive task");
  await page.getByRole("button", { name: "Save task" }).click();
  await page.getByRole("button", { name: /Responsive task/ }).click();
  expect(await page.locator("body").evaluate((body) => body.scrollWidth)).toBeLessThanOrEqual(320);

  await page.setViewportSize({ width: 1920, height: 1080 });
  expect(await page.locator("body").evaluate((body) => body.scrollWidth)).toBeLessThanOrEqual(1920);
});
