import assert from "node:assert/strict";
import test from "node:test";
import {
  createTask,
  deleteTask,
  filterTasks,
  toggleTaskStatus,
  updateTask,
} from "../../src/tasks.js";

const pending = { id: "1", title: "Read", description: "", status: "pending" };
const done = { id: "2", title: "Write", description: "Draft notes", status: "done" };

test("creates a pending task with an optional description", () => {
  const task = createTask("Read", "Chapter one");

  assert.equal(task.title, "Read");
  assert.equal(task.description, "Chapter one");
  assert.equal(task.status, "pending");
  assert.ok(task.id);
});

test("creates an empty description when one is omitted", () => {
  assert.equal(createTask("Read").description, "");
});

test("rejects empty and whitespace-only titles", () => {
  assert.throws(() => createTask(""), /title is required/i);
  assert.throws(() => createTask(" \t "), /title is required/i);
  assert.throws(() => updateTask(pending, "  ", ""), /title is required/i);
});

test("updates title and description without changing identity or status", () => {
  assert.deepEqual(updateTask(done, "Write report", "Draft"), {
    ...done,
    title: "Write report",
    description: "Draft",
  });
});

test("toggles task completion between pending and done", () => {
  assert.equal(toggleTaskStatus(pending).status, "done");
  assert.equal(toggleTaskStatus(done).status, "pending");
});

test("filters all, pending, and done tasks", () => {
  assert.deepEqual(filterTasks([pending, done], "all"), [pending, done]);
  assert.deepEqual(filterTasks([pending, done], "pending"), [pending]);
  assert.deepEqual(filterTasks([pending, done], "done"), [done]);
});

test("deletes only the task with the requested identifier", () => {
  assert.deepEqual(deleteTask([pending, done], "1"), [done]);
  assert.deepEqual(deleteTask([pending, done], "missing"), [pending, done]);
});
