# Data Model: Curso-PSWE-07 To-Do List

## Task

Represents one independently manageable item in the user's list.

| Field | Type | Rules |
|---|---|---|
| `id` | String | Required, stable, and unique among stored tasks. Identifies a task independently of its title. |
| `title` | String | Required; leading/trailing whitespace is removed on save; the resulting value MUST NOT be empty. No length limit is specified. |
| `description` | String | Optional; empty when omitted. No length limit is specified. |
| `status` | `pending` \| `done` | Required. New tasks start as `pending`; the status action switches between `pending` and `done`. |

### Identity and duplicates

Task titles are not unique. Each task has a separate identifier so that tasks with identical titles
can be opened, edited, completed, and deleted independently.

### Lifecycle

1. **Create**: A valid title creates a task with `pending` status and an optional description.
2. **Edit**: A valid title and description replace the saved values; canceling leaves the saved task
   unchanged.
3. **Complete / reopen**: Status transitions between `pending` and `done`.
4. **Delete**: Confirmed deletion removes the task; canceling confirmation preserves it.

### Persistence boundary

The persistence interface stores and returns the task collection. The browser implementation
serializes the collection to `localStorage` under one app-specific key. Save errors are returned to
the application layer for explicit user feedback; the UI MUST NOT access storage directly.

No timestamps, categories, due dates, priorities, account ownership, or synchronization metadata
are included.
