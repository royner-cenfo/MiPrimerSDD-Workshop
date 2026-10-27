---
description: "Implementation tasks for Curso-PSWE-07 To-Do List"
---

# Tasks: Curso-PSWE-07 To-Do List

**Input**: Design documents from `/specs/001-todo-list/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/ui.md`, and `quickstart.md`

**Testing**: Tests are required by the project constitution. For every production change, write and
run a failing test first, implement the minimum code to pass it, then refactor. Keep tests fast and
independent. Each user story has browser acceptance coverage.

**Organization**: Tasks are grouped by user story after shared setup and foundational prerequisites.
All three user stories are Priority P1 in the specification; their phase ordering provides a practical
incremental delivery sequence.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Tasks can run in parallel because they touch different files and have no unmet dependency.
- **[Story]**: User-story label maps to the corresponding story in `spec.md`.
- Every task includes the exact file path it creates, changes, or validates.

## Path Conventions

- Single static browser project: `src/` and `tests/` at the repository root.
- Planning and validation documents: `specs/001-todo-list/`.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Configure the dependency-free browser app and the development test and lint tools.

- [X] T001 Create `package.json` with `test:unit`, `test:acceptance`, and `lint` scripts and development dependencies for Playwright and ESLint.
- [X] T002 [P] Configure ESLint for the project's browser and Node.js ES modules in `eslint.config.js`.
- [X] T003 [P] Configure Playwright to run browser acceptance tests from `tests/acceptance/` in `playwright.config.js`.
- [X] T004 Install and lock the development dependencies in `package-lock.json`, then install the Chromium runtime required by `playwright.config.js` using Playwright's browser installer.

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Prove and implement the shared browser persistence boundary before user-facing stories.

- [X] T005 Write and run failing storage unit tests for task collection reads/writes and write failures in `tests/unit/task-storage.test.js`.
- [X] T006 Implement the `localStorage` persistence interface in `src/task-storage.js`; scope data to one app-specific key and report write failures to the caller.

**Checkpoint**: Test and storage foundation is ready; user-story tasks can begin.

## Phase 3: User Story 1 - Organize and find tasks (Priority: P1) 🎯 MVP

**Goal**: Create tasks and find them in the list using the three completion filters.

**Independent Test**: Add tasks with and without descriptions, open a task, verify Pending status and
the All/Pending/Done filters, and verify empty states remain usable.

### Tests for User Story 1

> Write these tests first and verify they fail before implementation.

- [X] T007 [P] [US1] Write and run failing unit tests for rejection of empty/whitespace-only titles, new-task Pending status, and All/Pending/Done filtering in `tests/unit/tasks.test.js`.
- [X] T008 [P] [US1] Write and run failing browser acceptance tests for the app title, task creation with optional description, opening a task, all filters, empty states, touch-target size, contrast, and 320 px reflow in `tests/acceptance/task-list.spec.js`.

### Implementation for User Story 1

- [X] T009 [US1] Implement task creation, title validation, stable unique IDs, task listing, and status filtering in `src/tasks.js`; titles are required and MUST NOT be empty or whitespace-only; descriptions are optional; new tasks MUST start as `pending`.
- [X] T010 [P] [US1] Create the semantic browser application shell, `Curso-PSWE-07` document title, list header, and app mount point in `src/index.html`.
- [X] T011 [P] [US1] Style the list, filter controls, task rows, empty states, and add form in `src/styles.css` with one sans-serif family, a light background, generous whitespace, one accent color, specified contrast, 44x44 px minimum targets, and responsive layout from 320 px.
- [X] T012 [US1] Connect task operations and storage to the list UI in `src/app.js`; implement Add task, optional description, task-row opening, All/Pending/Done filters, and empty states.

**Checkpoint**: User Story 1 can be demonstrated and its unit and browser acceptance tests pass independently.

## Phase 4: User Story 2 - Review and maintain a task (Priority: P1)

**Goal**: View task details, edit or cancel changes, change completion status, and delete with confirmation.

**Independent Test**: Open a task, verify its details, edit and save, cancel a separate edit, toggle status
both ways, and test both canceling and confirming deletion.

### Tests for User Story 2

> Write these tests first and verify they fail before implementation.

- [X] T013 [P] [US2] Write and run failing unit tests for task updates, edit validation, status transitions, and deletion in `tests/unit/tasks.test.js`.
- [X] T014 [P] [US2] Write and run failing browser acceptance tests for detail content, muted `No description`, Edit/Save/Cancel, validation, status-action labels, and delete-confirmation choices in `tests/acceptance/task-detail.spec.js`.

### Implementation for User Story 2

- [X] T015 [US2] Implement task edit, status toggle, and delete operations in `src/tasks.js`; preserve saved values on invalid input or canceled edits and persist only valid changes.
- [X] T016 [US2] Implement task detail, back control, reused edit form, Save/Cancel behavior, status-dependent action labels, and confirmed deletion in `src/app.js`.
- [X] T017 [P] [US2] Style the detail screen, form actions, status label, warning-colored delete action, and confirmation state in `src/styles.css` while retaining the specified contrast, target sizes, and responsive behavior.

**Checkpoint**: User Stories 1 and 2 work; each has its own passing unit and browser acceptance tests.

## Phase 5: User Story 3 - Keep tasks between sessions (Priority: P1)

**Goal**: Ensure saved additions, edits, status changes, and deletions survive a normal close and reopen,
and report storage failures without showing them as successful saves.

**Independent Test**: Save task changes, reload or reopen the app in the same browser profile and origin,
and verify the latest saved data and deleted-task absence; simulate read/write errors and verify clear
failure feedback without loss of unsaved in-memory edits.

### Tests for User Story 3

> Write these tests first and verify they fail before implementation.

- [X] T018 [P] [US3] Write and run failing browser acceptance tests for persistence after reload and clear user feedback when a task change cannot be saved in `tests/acceptance/task-persistence.spec.js`.
- [X] T019 [P] [US3] Add failing storage round-trip, delete, and write-error propagation tests in `tests/unit/task-storage.test.js`.

### Implementation for User Story 3

- [X] T020 [US3] Connect save failures to a visible error message in `src/app.js`; do not clear unsaved form state or report a change as saved when persistence fails.

**Checkpoint**: All three user stories pass their independent acceptance tests, including reload and storage-failure scenarios.

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Run all required quality gates and verify the feature walkthrough.

- [X] T021 [P] Run all unit and browser acceptance tests through the scripts in `package.json` and resolve any failures.
- [X] T022 [P] Run ESLint through the `lint` script in `package.json` and resolve any reported issues.
- [X] T023 Run every scenario in `specs/001-todo-list/quickstart.md` and record or fix any mismatch in the implemented app under `src/` and `tests/`.

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No source dependencies; complete before running configured tests.
- **Foundational (Phase 2)**: Depends on setup; storage unit tests MUST fail before the storage
  implementation; blocks user stories that use persistent tasks.
- **User Story 1 (Phase 3)**: Depends on setup and foundation; independently delivers the list MVP.
- **User Story 2 (Phase 4)**: Depends on User Story 1's list shell and task selection behavior.
- **User Story 3 (Phase 5)**: Depends on the task create/edit/delete flows from User Stories 1 and 2.
- **Polish (Phase 6)**: Depends on all three stories being implemented.

### User Story Dependencies

- **US1 (P1)**: Starts after the foundation; no dependency on another user story.
- **US2 (P1)**: Follows US1 because detail, edit, and delete are actions on tasks opened from its list.
- **US3 (P1)**: Follows US1 and US2 so reload acceptance covers the complete specified set of task
  changes and the storage-failure UI.

### Within Each User Story

- Unit and browser acceptance tests are written and shown failing before the production behavior they
  specify is implemented.
- `src/tasks.js` owns task rules and transitions; `src/task-storage.js` owns browser persistence;
  `src/app.js` owns screen rendering and user interaction. UI code MUST NOT access storage directly.
- Complete and pass the current story's tests before proceeding to the next story.

### Parallel Opportunities

- After T001, T002 and T003 can run in parallel because they configure separate files. T004 follows
  T001 to produce the lockfile.
- T007 and T008 can run in parallel; T009–T012 wait for their relevant tests.
- T013 and T014 can run in parallel; T015–T017 wait for the relevant tests.
- T018 and T019 can run in parallel; T020 waits for the failure-feedback test.
- T021 and T022 can run in parallel after feature work; T023 runs after both pass.
- User stories are sequential in this plan because later stories extend the prior list and detail flows.

## Parallel Example: User Story 1

```text
# After Phase 2 and setup are complete, write both failing tests in parallel:
T007 -> tests/unit/tasks.test.js
T008 -> tests/acceptance/task-list.spec.js

# After tests fail, implement domain and independent shell/style files:
T009 -> src/tasks.js
T010 -> src/index.html
T011 -> src/styles.css

# Integrate after the list shell, styles, task logic, and storage exist:
T012 -> src/app.js
```

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete setup and the storage foundation.
2. Write and fail the US1 unit and browser tests.
3. Implement list creation, opening, filtering, empty states, and responsive list styling.
4. Stop and validate US1 independently before moving on.

### Incremental Delivery

1. Setup and storage foundation → ready to implement and test the app.
2. US1 → independently usable task list MVP.
3. US2 → details, edits, completion changes, and confirmed deletion.
4. US3 → reload persistence and explicit storage-error feedback.
5. Run all unit tests, browser acceptance tests, lint, and the quickstart walkthrough.

### Parallel Team Strategy

1. Complete shared setup and storage foundation first.
2. Within each story, parallelize the separate failing unit and browser test files.
3. Parallelize independent HTML/CSS and task-logic changes only after their story's tests are in
   place; integrate UI after its dependencies are ready.
4. Keep story implementation sequential because detail and persistence flows depend on the list and
   task lifecycle.

## Notes

- Every task has a checkbox, sequential ID, applicable parallel/story labels, and an exact file path.
- `[P]` marks only separate-file work with no unmet dependency.
- TDD is mandatory: observe a failing test before implementing production behavior.
- No categories, due dates, priorities, search, accounts, synchronization, external services, or
  production dependencies are included.
