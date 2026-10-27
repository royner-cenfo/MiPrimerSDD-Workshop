import assert from "node:assert/strict";
import test from "node:test";
import { createTaskStorage } from "../../src/task-storage.js";

function createMemoryStorage() {
  const values = new Map();

  return {
    getItem(key) {
      return values.get(key) ?? null;
    },
    setItem(key, value) {
      values.set(key, value);
    },
  };
}

test("returns an empty collection when no tasks have been saved", () => {
  const storage = createTaskStorage(createMemoryStorage());

  assert.deepEqual(storage.getTasks(), []);
});

test("saves and reads the task collection", () => {
  const storage = createTaskStorage(createMemoryStorage());
  const tasks = [{ id: "1", title: "Read", description: "", status: "pending" }];

  storage.saveTasks(tasks);

  assert.deepEqual(storage.getTasks(), tasks);
});

test("propagates storage write failures to its caller", () => {
  const failingStorage = {
    getItem() {
      return null;
    },
    setItem() {
      throw new Error("storage is full");
    },
  };
  const storage = createTaskStorage(failingStorage);

  assert.throws(() => storage.saveTasks([]), /storage is full/);
});
