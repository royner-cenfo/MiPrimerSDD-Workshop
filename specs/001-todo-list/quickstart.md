# Quickstart: Curso-PSWE-07

This guide validates the planned feature after implementation. It does not prescribe or contain
implementation code.

## Prerequisites

- Node.js LTS and npm
- Python 3 for the local static HTTP server
- A current desktop or mobile browser

## Set up and run checks

From the repository root:

1. Install the project's locked development dependencies with `npm ci`.
2. Run business-logic unit tests with `npm run test:unit`.
3. Run browser acceptance tests with `npm run test:acceptance`.
4. Run the required lint gate with `npm run lint`.
5. Serve the static app at a stable local origin with `py -m http.server 8000 --directory src`.
   If the Python launcher is unavailable, use `python -m http.server 8000 --directory src`.
6. Open `http://localhost:8000` in a browser.

The scripts and lockfile are implementation deliverables; the commands above describe the intended
validation interface.

## Acceptance walkthrough

Use an isolated browser profile for each run. Keep the same profile and `http://localhost:8000`
origin for persistence checks.

1. **Create and find tasks**: Add a titled task without a description and another with a description.
   Verify new tasks show Pending, can be opened, and appear under All and Pending but not Done.
2. **Filter and empty states**: Mark one task Done, verify All, Pending, and Done filters, and verify
   the empty message when a filter has no matches. Verify Add task remains available.
3. **Detail and editing**: Open both tasks. Verify status, description, and muted `No description`
   for the task without a description. Edit and save one task; cancel a separate edit and verify
   its saved values remain unchanged.
4. **Validation**: Attempt to add and save an empty and whitespace-only title. Verify the form
   identifies the error and does not save either task.
5. **Status and deletion**: Toggle a task in both directions. Start deletion and cancel; verify the
   task remains. Confirm deletion and verify it is absent from every filter.
6. **Persistence**: Add, edit, complete, and delete tasks, close the browser page, reopen the same
   origin and profile, and verify the latest saved values remain and the deleted task is absent.
7. **Responsive visual use**: Verify the list and detail screens at 320 px and desktop widths,
   check no horizontal page scrolling, and measure 44 × 44 px minimum targets and specified text
   contrast.

Expected outcomes: all unit and browser acceptance tests pass, lint reports no errors, and each
walkthrough step matches the UI contract and feature requirements.
