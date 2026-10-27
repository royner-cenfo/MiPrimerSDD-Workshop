import { expect, test } from "@playwright/test";

test("retains additions, edits, status changes, and deletions after reload", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Add task" }).click();
  await page.getByLabel("Title").fill("Original title");
  await page.getByLabel("Description").fill("Original details");
  await page.getByRole("button", { name: "Save task" }).click();
  await page.getByRole("button", { name: /Original title/ }).click();

  await page.getByRole("button", { name: "Edit" }).click();
  await page.getByLabel("Title").fill("Updated title");
  await page.getByLabel("Description").fill("Updated details");
  await page.getByRole("button", { name: "Save changes" }).click();
  await page.getByRole("button", { name: "Mark as done" }).click();
  await page.reload();

  await page.getByRole("button", { name: "Done", exact: true }).click();
  await page.getByRole("button", { name: /Updated title/ }).click();
  await expect(page.getByText("Updated details")).toBeVisible();
  await expect(page.getByText("Done", { exact: true })).toBeVisible();

  await page.getByRole("button", { name: "Delete" }).click();
  await page.getByRole("button", { name: "Confirm delete" }).click();
  await page.reload();
  await expect(page.getByText(/no tasks/i)).toBeVisible();
});

test("reports a failed save without showing the task as saved", async ({ page }) => {
  await page.addInitScript(() => {
    const originalSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = function setItem(key, value) {
      if (key === "curso-pswe-07.tasks") {
        throw new DOMException("Storage is full", "QuotaExceededError");
      }
      return originalSetItem.call(this, key, value);
    };
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Add task" }).click();
  await page.getByLabel("Title").fill("Do not lose this");
  await page.getByRole("button", { name: "Save task" }).click();

  await expect(page.getByRole("alert")).toContainText(/could not be saved/i);
  await expect(page.getByRole("button", { name: /Do not lose this/ })).toHaveCount(0);
  await expect(page.getByLabel("Title")).toHaveValue("Do not lose this");
});
