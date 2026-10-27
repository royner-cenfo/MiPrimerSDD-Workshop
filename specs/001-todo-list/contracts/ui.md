# User Interface Contract: Curso-PSWE-07

This feature exposes a browser interface only; it has no public API or external service contract.
The contract below defines the user-visible screen states and interactions.

## Application shell

- The browser tab/window title and To-Do List header display `Curso-PSWE-07`.
- Use one sans-serif font family, a light background, generous whitespace, and one accent color for
  primary actions and the selected filter.
- Maintain the specified text contrast, minimum 44 × 44 px interactive targets, and usability from
  320 to 1920 CSS pixels wide without horizontal page scrolling.
- Use labeled controls for the title and description fields, and associate validation messages with
  the title field.

## To-Do List screen

- Show All, Pending, and Done filter controls; expose which one is active and display only matching
  tasks.
- Each task row shows a status indicator and task title. Done task titles use strikethrough and
  muted color.
- Opening a task row displays that task's detail screen.
- The visible Add task action opens a form with a required title and optional description.
- When no tasks exist or the active filter has no matches, show a short friendly empty state and
  keep Add task available.

## To-Do Detail screen

- Provide a back control, prominent title, description, and visible Done or Pending status.
- An empty description is displayed as muted `No description`.
- Provide Edit, the status-dependent Mark as done / Mark as not done action, and Delete.
- Delete is visually distinct with a warning color and opens a confirmation with confirm and cancel
  choices. Cancel leaves the task unchanged.

## Add and edit form

- Provide title and description fields. Title is required and whitespace-only input is invalid.
- Adding a task creates it as Pending. Editing reuses the same fields and provides Save and Cancel.
- Save persists before reporting success. On validation or persistence failure, identify the error
  and do not report the task as saved.
- Cancel discards unsaved edits.

## State and visual feedback

- Empty lists, empty filter results, validation errors, deletion confirmation, and persistence errors
  are distinct user-visible states.
