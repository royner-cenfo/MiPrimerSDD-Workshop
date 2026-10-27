# Feature Specification: Curso-PSWE-07 To-Do List

**Feature Branch**: `[001-todo-list]`

**Created**: 2026-10-26

**Status**: Draft

**Input**: User description: "Build Curso-PSWE-07 as a responsive browser-based to-do app with a task list and detail screen, task creation and editing, completion filters and status changes, deletion with confirmation, persistent tasks, and a clean, accessible visual design. Do not include accounts, categories, due dates, priorities, search, or sync."

## Clarifications

### Session 2026-10-26

- Q: Should Curso-PSWE-07 be a responsive web app that opens in a browser, or an installed desktop app? → A: Responsive web app opened in a browser.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Organize and find tasks (Priority: P1)

As a user, I want to add tasks, view them in a list, and filter by completion so I can focus on the tasks I need to track.

**Why this priority**: Creating and finding tasks is the central value of the application.

**Independent Test**: Add tasks with and without descriptions, verify each appears in the list and opens, then verify the All, Pending, and Done filters show the matching tasks.

**Acceptance Scenarios**:

1. **Given** the To-Do List screen is open, **When** the user adds a task with a title and no description, **Then** the task appears with Pending status.
2. **Given** the To-Do List screen is open, **When** the user adds a task with a title and description, **Then** the task appears and can be opened.
3. **Given** tasks with different completion statuses exist, **When** the user selects All, Pending, or Done, **Then** the list shows all tasks or only tasks matching the selected status.
4. **Given** no tasks exist or no tasks match the selected filter, **When** the user views the list, **Then** a short, friendly empty message appears and the user can still add a task.
5. **Given** the To-Do List screen is displayed in a browser, **When** the user views its header and browser tab/window title, **Then** both show "Curso-PSWE-07".

---

### User Story 2 - Review and maintain a task (Priority: P1)

As a user, I want to view, edit, complete, reopen, or delete a task so its details and status stay accurate.

**Why this priority**: Task details and lifecycle actions let users maintain a useful and current list.

**Independent Test**: Open a task, verify its details and status, edit and save it, change its status in both directions, and delete it after confirming.

**Acceptance Scenarios**:

1. **Given** a task is listed, **When** the user opens it, **Then** the detail screen shows its title, status, and description, or a muted "No description" message when the description is empty.
2. **Given** the user is viewing a task, **When** the user chooses Edit, changes the title or description, and saves, **Then** the updated details are shown.
3. **Given** the user is editing a task, **When** the user cancels, **Then** unsaved changes are discarded and the task remains unchanged.
4. **Given** the user is adding or editing a task, **When** the title is empty or contains only whitespace, **Then** a validation message appears and the task is not saved.
5. **Given** a task is Pending, **When** the user chooses Mark as done, **Then** its status becomes Done; when it is Done, the action is Mark as not done and changes its status to Pending.
6. **Given** the user chooses Delete, **When** the confirmation is shown and the user cancels, **Then** the task remains; when the user confirms, **Then** the task is deleted and no longer appears in the list.

---

### User Story 3 - Keep tasks between sessions (Priority: P1)

As a user, I want my tasks and saved changes to remain after I close and reopen the application so I can rely on the list over time.

**Why this priority**: A list that loses task data on close cannot reliably track daily work.

**Independent Test**: Add, edit, complete, and delete tasks, close and reopen the application, and verify that saved changes remain and deleted tasks remain absent.

**Acceptance Scenarios**:

1. **Given** tasks have been added or changed, **When** the application is closed and reopened, **Then** the latest saved titles, descriptions, and statuses are present.
2. **Given** a task has been deleted, **When** the application is closed and reopened, **Then** the deleted task remains absent.
3. **Given** a task change cannot be saved, **When** the save fails, **Then** the user is told it was not saved and the application does not show it as successfully saved.

### Edge Cases

- An empty or whitespace-only title is rejected with a visible validation message when adding or saving.
- A task with no description remains valid, and its detail view displays "No description" in muted text.
- A selected filter with no matching tasks displays a friendly empty state distinct from the populated list.
- Canceling task editing discards the unsaved changes.
- Canceling the delete confirmation leaves the task unchanged.
- A save failure is communicated and is not presented as a successful save.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The application MUST provide a To-Do List screen and a To-Do Detail screen.
- **FR-002**: The To-Do List screen MUST display tasks and allow the user to add a task and open an existing task.
- **FR-003**: Each task MUST have a required title, an optional description, and a completion status of Done or Pending.
- **FR-004**: A newly added task MUST have Pending status. The application MUST reject an empty or whitespace-only title when adding or saving and display a validation message.
- **FR-005**: The To-Do List screen MUST offer All, Pending, and Done filters and display only the tasks matching the selected filter.
- **FR-006**: Each task row MUST show a status indicator and title. Done task titles MUST have strikethrough styling and muted color.
- **FR-007**: The To-Do List screen MUST display a short, friendly empty state when there are no tasks or when the selected filter has no matches.
- **FR-008**: The To-Do List header and browser tab/window title MUST show "Curso-PSWE-07".
- **FR-009**: The To-Do Detail screen MUST provide a back control and display the selected task's title, status label, and description. When the description is empty, it MUST display "No description" in muted text.
- **FR-010**: The To-Do Detail screen MUST provide Edit, Mark as done or Mark as not done, and Delete actions. The status action label MUST correspond to the task's current status.
- **FR-011**: Edit mode MUST reuse the task form, with title and description fields and Save and Cancel actions. Cancel MUST discard unsaved changes.
- **FR-012**: Delete MUST use a distinct warning color and require confirmation before deleting the task.
- **FR-013**: The application MUST retain task additions, edits, status changes, and deletions when closed and reopened.
- **FR-014**: If a task change cannot be saved, the application MUST communicate the failure and MUST NOT present the change as saved.
- **FR-015**: The visual design MUST use a light background, generous whitespace, one sans-serif font family, and a single accent color for primary actions and the active filter. Titles MUST be visually larger and bolder than descriptions.
- **FR-016**: Text MUST have sufficient contrast; every touch or click target MUST be at least 44 by 44 pixels; and the layout MUST be usable on mobile and desktop screens.
- **FR-017**: The application MUST NOT include accounts, categories, due dates, priorities, search, or synchronization.

### Key Entities *(include if feature involves data)*

- **Task**: A user-managed item with a required title, optional description, and Done or Pending completion status. Tasks with identical titles are permitted as separate tasks.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: At least 90% of first-time users in usability testing can add a task and open its details without assistance within two minutes.
- **SC-002**: At least 90% of users in usability testing can change a task's status and find it with the matching filter without assistance within one minute.
- **SC-003**: In all persistence acceptance tests, 100% of task additions, edits, status changes, and deletions that are reported as saved are reflected after closing and reopening the application.
- **SC-004**: At least 90% of users in usability testing can edit and delete a task without assistance within two minutes.
- **SC-005**: All touch and click targets measure at least 44 by 44 pixels, and text meets a minimum contrast ratio of 4.5:1 for regular text and 3:1 for large text.
- **SC-006**: The list and detail screens remain usable at mobile and desktop viewport sizes from 320 to 1920 pixels wide without horizontal page scrolling.

## Assumptions

- The application serves one user's task list; accounts, sharing, and collaboration are out of scope.
- The application is a responsive web app opened in a browser.
- Tasks are kept for the same application installation between normal close and reopen; cross-device synchronization is not provided.
- A newly created task has Pending status, and title validation rejects values containing only whitespace.
- No title or description length limit is imposed by this specification.
- Duplicate task titles are allowed; each task remains independently manageable.
- The English screen and action labels in this specification are the initial user-facing language.
- The application uses no external services for the described task-management flows.
