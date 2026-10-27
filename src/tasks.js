function requireTitle(title) {
  const normalizedTitle = title.trim();

  if (!normalizedTitle) {
    throw new Error("Task title is required.");
  }

  return normalizedTitle;
}

export function createTask(title, description = "") {
  return {
    id: crypto.randomUUID(),
    title: requireTitle(title),
    description,
    status: "pending",
  };
}

export function updateTask(task, title, description = "") {
  return {
    ...task,
    title: requireTitle(title),
    description,
  };
}

export function toggleTaskStatus(task) {
  return {
    ...task,
    status: task.status === "done" ? "pending" : "done",
  };
}

export function filterTasks(tasks, filter) {
  if (filter === "all") {
    return tasks;
  }

  return tasks.filter((task) => task.status === filter);
}

export function deleteTask(tasks, taskId) {
  return tasks.filter((task) => task.id !== taskId);
}
