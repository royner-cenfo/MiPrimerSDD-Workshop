import { expect, test } from "@playwright/test";

async function createTask(page, title, description = "") {
  await page.getByRole("button", { name: "Add task" }).click();
  await page.getByLabel("Title").fill(title);
  if (description) {
    await page.getByLabel("Description").fill(description);
  }
  await page.getByRole("button", { name: "Save task" }).click();
  await page.getByRole("button", { name: new RegExp(title) }).click();
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("shows task detail, including the empty-description message", async ({ page }) => {
  await createTask(page, "Call dentist");
  await expect(page.getByRole("heading", { name: "Call dentist" })).toBeVisible();
  await expect(page.getByText("Pending")).toBeVisible();
  await expect(page.getByText("No description")).toBeVisible();
  await expect(page.getByRole("button", { name: "Mark as done" })).toBeVisible();
});

test("edits a task and cancels unsaved changes", async ({ page }) => {
  await createTask(page, "Book hotel", "For the weekend");
  await page.getByRole("button", { name: "Edit" }).click();
  await page.getByLabel("Title").fill("Reserve hotel");
  await page.getByLabel("Description").fill("For the trip");
  await page.getByRole("button", { name: "Save changes" }).click();
  await expect(page.getByRole("heading", { name: "Reserve hotel" })).toBeVisible();

  await page.getByRole("button", { name: "Edit" }).click();
  await page.getByLabel("Title").fill("Unsaved title");
  await page.getByRole("button", { name: "Cancel" }).click();
  await expect(page.getByRole("heading", { name: "Reserve hotel" })).toBeVisible();
});

test("rejects empty and whitespace-only titles", async ({ page }) => {
  await page.getByRole("button", { name: "Add task" }).click();
  await page.getByRole("button", { name: "Save task" }).click();
  await expect(page.getByRole("alert")).toContainText(/title is required/i);

  await page.getByLabel("Title").fill("   ");
  await page.getByRole("button", { name: "Save task" }).click();
  await expect(page.getByRole("alert")).toContainText(/title is required/i);
});

test("toggles status both ways and confirms deletion", async ({ page }) => {
  await createTask(page, "Submit form");
  await page.getByRole("button", { name: "Mark as done" }).click();
  await expect(page.getByRole("button", { name: "Mark as not done" })).toBeVisible();
  await page.getByRole("button", { name: "Mark as not done" }).click();
  await expect(page.getByRole("button", { name: "Mark as done" })).toBeVisible();

  await page.getByRole("button", { name: "Delete" }).click();
  await expect(page.getByRole("dialog", { name: "Delete task?" })).toBeVisible();
  await page.getByRole("button", { name: "Cancel" }).click();
  await expect(page.getByRole("heading", { name: "Submit form" })).toBeVisible();

  await page.getByRole("button", { name: "Delete" }).click();
  await page.getByRole("button", { name: "Confirm delete" }).click();
  await expect(page.getByRole("button", { name: /Submit form/ })).toHaveCount(0);
});
