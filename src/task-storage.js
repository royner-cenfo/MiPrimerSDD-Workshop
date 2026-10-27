export const TASKS_STORAGE_KEY = "curso-pswe-07.tasks";

export function createTaskStorage(storage = globalThis.localStorage) {
  return {
    getTasks() {
      const savedTasks = storage.getItem(TASKS_STORAGE_KEY);
      return savedTasks === null ? [] : JSON.parse(savedTasks);
    },
    saveTasks(tasks) {
      storage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    },
  };
}
