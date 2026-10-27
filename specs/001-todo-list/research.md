# Research: Curso-PSWE-07 To-Do List

## Browser app platform and dependencies

**Decision**: Use plain HTML, CSS, and JavaScript with browser-native APIs. Do not add a UI framework
or production dependency. Use ESLint for the constitution's lint gate and Playwright as a
development-only browser acceptance-test dependency.

**Rationale**: The app has two screens, one entity, and no server-side or external-service
requirements. Browser-native code is sufficient and minimizes runtime complexity. The lint tool
enforces the required quality gate, while Playwright exercises actual UI, responsive viewports, and
persistence across page reloads.

**Alternatives considered**: A UI framework or full-stack server would add a dependency and
architecture not required by the spec. Manual-only browser verification would not provide repeatable
acceptance tests for each user story.

## Task persistence

**Decision**: Store the small task collection as JSON in `localStorage` under an app-specific key,
behind the task-storage interface. Use a stable origin during development and deployment.

**Rationale**: `localStorage` persists string values across normal browser sessions and fits the
single-user, same-browser scope. Its synchronous API and browser-native availability avoid a backend,
account system, or larger data-store abstraction.

**Alternatives considered**: IndexedDB, persistence-permission requests, and a backend would add
complexity without a stated need for large data, guaranteed backup, or cross-device access.

**Constraints and failure handling**:

- Persistence is limited to the same origin and browser profile. A change of browser, profile,
  origin, browser storage settings, or user-cleared data can make tasks unavailable.
- Browser storage is best-effort, not a guaranteed backup; private browsing or browser storage
  policies may make it unavailable or short-lived.
- A failed save MUST be surfaced and MUST NOT appear successful.
- Serve the app from a stable HTTP(S) origin; `file:` URL storage behavior is not a portable basis
  for persistence.

**Sources**:

- [MDN: Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [MDN: Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
- [MDN: Using the Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)
- [MDN: Storage quotas and eviction criteria](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria)

## Responsive visual validation

**Decision**: Validate the specified text contrast, minimum target dimensions, and narrow-screen
layout in browser acceptance tests.

**Rationale**: These checks directly cover the specified visual design and responsive criteria.

**Sources**:

- [WCAG 2.2: Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- [WCAG 2.2: Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- [WCAG 2.2: Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)
