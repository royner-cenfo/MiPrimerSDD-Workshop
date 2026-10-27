import {
  createTask,
  deleteTask,
  filterTasks,
  toggleTaskStatus,
  updateTask,
} from "./tasks.js";
import { createTaskStorage } from "./task-storage.js";

const app = document.querySelector("#app");
let taskStorage;

let tasks = [];
let currentFilter = "all";
let selectedTaskId = null;
let formMode = null;
let formValues = { title: "", description: "" };
let errorMessage = "";
let deleteConfirmationOpen = false;

function createElement(tagName, className, text) {
  const element = document.createElement(tagName);

  if (className) {
    element.className = className;
  }

  if (text !== undefined) {
    element.textContent = text;
  }

  return element;
}

function createButton(label, className, onClick) {
  const button = createElement("button", className, label);
  button.type = "button";
  button.addEventListener("click", onClick);
  return button;
}

function showPageError(message) {
  app.replaceChildren(createElement("p", "page-error", message));
  app.firstElementChild.setAttribute("role", "alert");
}

function saveTasks(nextTasks) {
  try {
    taskStorage.saveTasks(nextTasks);
    tasks = nextTasks;
    errorMessage = "";
    return true;
  } catch (error) {
    errorMessage = `Your task could not be saved. ${error.message}`;
    return false;
  }
}

function renderError(parent) {
  if (!errorMessage) {
    return;
  }

  const message = createElement("p", "save-error", errorMessage);
  message.setAttribute("role", "alert");
  parent.append(message);
}

function createHeader(title, subtitle) {
  const header = createElement("header", "page-header");
  header.append(createElement("h1", "", title));

  if (subtitle) {
    header.append(createElement("p", "muted", subtitle));
  }

  return header;
}

function createTaskForm() {
  const isEditing = formMode === "edit";
  const form = createElement("form", "task-form");
  form.noValidate = true;

  const titleLabel = createElement("label", "", "Title");
  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.name = "title";
  titleInput.autocomplete = "off";
  titleInput.value = formValues.title;
  titleLabel.append(titleInput);

  const descriptionLabel = createElement("label", "", "Description");
  const descriptionInput = document.createElement("textarea");
  descriptionInput.name = "description";
  descriptionInput.value = formValues.description;
  descriptionLabel.append(descriptionInput);

  const actions = createElement("div", "form-actions");
  const saveButton = createElement(
    "button",
    "primary-button",
    isEditing ? "Save changes" : "Save task",
  );
  saveButton.type = "submit";
  const cancelButton = createButton("Cancel", "secondary-button", () => {
    formMode = null;
    formValues = { title: "", description: "" };
    errorMessage = "";
    render();
  });
  actions.append(saveButton, cancelButton);
  form.append(titleLabel, descriptionLabel);
  renderError(form);
  form.append(actions);

  form.addEventListener("input", () => {
    formValues = {
      title: titleInput.value,
      description: descriptionInput.value,
    };
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    formValues = {
      title: titleInput.value,
      description: descriptionInput.value,
    };

    if (!formValues.title.trim()) {
      errorMessage = "Task title is required.";
      render();
      return;
    }

    const selectedTask = tasks.find((task) => task.id === selectedTaskId);
    const changedTask = isEditing
      ? updateTask(selectedTask, formValues.title, formValues.description)
      : createTask(formValues.title, formValues.description);
    const nextTasks = isEditing
      ? tasks.map((task) => (task.id === selectedTaskId ? changedTask : task))
      : [...tasks, changedTask];

    if (!saveTasks(nextTasks)) {
      render();
      return;
    }

    selectedTaskId = isEditing ? changedTask.id : null;
    formMode = null;
    formValues = { title: "", description: "" };
    render();
  });

  return form;
}

function renderList() {
  const page = createElement("section", "page");
  page.append(createHeader("Curso-PSWE-07", "A simple place to keep track of your tasks."));

  const filters = createElement("nav", "filter-list");
  filters.setAttribute("aria-label", "Filter tasks");
  for (const [label, value] of [
    ["All", "all"],
    ["Pending", "pending"],
    ["Done", "done"],
  ]) {
    const filterButton = createButton(label, "filter-button", () => {
      currentFilter = value;
      render();
    });
    filterButton.setAttribute("aria-pressed", String(currentFilter === value));
    if (currentFilter === value) {
      filterButton.classList.add("is-active");
    }
    filters.append(filterButton);
  }
  page.append(filters);

  const visibleTasks = filterTasks(tasks, currentFilter);
  if (visibleTasks.length === 0) {
    const message = tasks.length === 0
      ? "No tasks yet. Add a task to get started."
      : "No tasks match this filter. Add a task whenever you are ready.";
    page.append(createElement("p", "empty-state", message));
  } else {
    const list = createElement("ul", "task-list");
    for (const task of visibleTasks) {
      const item = createElement("li", "");
      const row = createButton(task.title, "task-row", () => {
        selectedTaskId = task.id;
        formMode = null;
        errorMessage = "";
        render();
      });
      if (task.status === "done") {
        row.classList.add("is-done");
      }
      const indicator = createElement("span", "task-indicator");
      indicator.setAttribute("aria-hidden", "true");
      const title = createElement("span", "task-title", task.title);
      row.replaceChildren(indicator, title);
      item.append(row);
      list.append(item);
    }
    page.append(list);
  }

  if (formMode !== "create") {
    renderError(page);
  }
  if (formMode !== "create") {
    page.append(createButton("Add task", "primary-button", () => {
      formMode = "create";
      formValues = { title: "", description: "" };
      errorMessage = "";
      render();
    }));
  }
  if (formMode === "create") {
    page.append(createTaskForm());
  }
  app.replaceChildren(page);
}

function renderDeleteConfirmation(page) {
  const backdrop = createElement("div", "confirmation-backdrop");
  const dialog = createElement("section", "confirmation-dialog");
  dialog.setAttribute("role", "dialog");
  dialog.setAttribute("aria-modal", "true");
  dialog.setAttribute("aria-labelledby", "delete-title");
  const heading = createElement("h2", "", "Delete task?");
  heading.id = "delete-title";
  dialog.append(heading);
  dialog.append(createElement("p", "", "This task will be permanently deleted."));

  const actions = createElement("div", "detail-actions");
  actions.append(createButton("Cancel", "secondary-button", () => {
    deleteConfirmationOpen = false;
    errorMessage = "";
    render();
  }));
  actions.append(createButton("Confirm delete", "danger-button", () => {
    const nextTasks = deleteTask(tasks, selectedTaskId);
    if (saveTasks(nextTasks)) {
      selectedTaskId = null;
      deleteConfirmationOpen = false;
    }
    render();
  }));
  dialog.append(actions);
  renderError(dialog);
  backdrop.append(dialog);
  page.append(backdrop);
}

function renderDetail() {
  const task = tasks.find((item) => item.id === selectedTaskId);
  if (!task) {
    selectedTaskId = null;
    renderList();
    return;
  }

  const page = createElement("section", "page");
  page.append(createButton("Back", "secondary-button", () => {
    selectedTaskId = null;
    formMode = null;
    errorMessage = "";
    render();
  }));

  if (formMode === "edit") {
    page.append(createHeader("Edit task"));
    page.append(createTaskForm());
    app.replaceChildren(page);
    return;
  }

  const card = createElement("article", "detail-card");
  card.append(createElement("h2", "", task.title));
  card.append(createElement(
    "p",
    task.description ? "task-description" : "muted",
    task.description || "No description",
  ));
  card.append(createElement(
    "p",
    "detail-status",
    task.status === "done" ? "Done" : "Pending",
  ));

  const actions = createElement("div", "detail-actions");
  actions.append(createButton("Edit", "secondary-button", () => {
    formMode = "edit";
    formValues = { title: task.title, description: task.description };
    errorMessage = "";
    render();
  }));
  actions.append(createButton(
    task.status === "done" ? "Mark as not done" : "Mark as done",
    "primary-button",
    () => {
      const nextTask = toggleTaskStatus(task);
      const nextTasks = tasks.map((item) => item.id === task.id ? nextTask : item);
      if (saveTasks(nextTasks)) {
        render();
        return;
      }
      render();
    },
  ));
  actions.append(createButton("Delete", "danger-button", () => {
    deleteConfirmationOpen = true;
    errorMessage = "";
    render();
  }));
  card.append(actions);
  renderError(card);
  page.append(card);
  if (deleteConfirmationOpen) {
    renderDeleteConfirmation(page);
  }
  app.replaceChildren(page);
}

function render() {
  if (selectedTaskId === null) {
    renderList();
  } else {
    renderDetail();
  }
}

try {
  taskStorage = createTaskStorage(window.localStorage);
  tasks = taskStorage.getTasks();
  render();
} catch (error) {
  showPageError(`Your tasks could not be loaded. ${error.message}`);
}
