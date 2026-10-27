<!--
Sync Impact Report
Version change: unratified scaffold → 1.0.0
Modified principles: none; established six new principles (I–VI below) from the unratified scaffold.
Added sections: Planning and Scope; Quality Gate.
Removed sections: none.
Follow-up TODO: Confirm the original ratification date.
-->

# Curso-PSWE-07 Constitution

## Core Principles

### I. SIMPLICITY FIRST (YAGNI)
Implement only what the spec requires and choose the simplest solution that works. Do not add
features, abstractions, configuration options, or dependencies "just in case". Any added complexity
MUST be justified in writing in the plan. Rationale: avoiding speculative work keeps delivery focused
and maintainable.

### II. SIMPLE, CLEAR DESIGN
Functions and modules MUST be small and have a single responsibility. Names MUST clearly express
intent. Avoid duplication only when it is real; do not create an abstraction for a single use, and
do not optimize prematurely. Rationale: clear, focused code is easier to understand and change.

### III. STRUCTURED ARCHITECTURE
Code MUST be separated into UI (screens and components), application logic (task operations), and
persistence (storage) layers. Dependencies MUST flow UI → logic → persistence. UI code MUST NOT
access storage directly. Persistence MUST be hidden behind a small interface that can be replaced
or faked in tests. Rationale: explicit boundaries enable independent testing and replacement.

### IV. TEST-DRIVEN DEVELOPMENT (NON-NEGOTIABLE)
Development MUST follow Red-Green-Refactor: write a failing test, make it pass with the minimum code,
then refactor. Production code MUST have a test that required it. Business logic MUST have unit
tests, and each user story MUST have at least one acceptance test mirroring its acceptance scenarios.
Tests MUST be fast and independent. Rationale: test-first development verifies behavior while
limiting regressions.

### V. SPEC IS THE SOURCE OF TRUTH
Every implementation task MUST trace to a requirement in the spec; anything not specified is out of
scope. Ambiguous requirements MUST be clarified before implementation. Rationale: traceability keeps
implementation aligned with agreed user needs.

### VI. DEPENDENCIES AND QUALITY
Prefer the standard library and platform features. Add a third-party dependency only when it clearly
removes more complexity than it adds. Code MUST pass linting and all tests before it is considered
done. Rationale: restrained dependencies and enforced checks reduce maintenance risk.

## Planning and Scope

Plans MUST include a "Constitution Check" that verifies compliance with these principles before
implementation begins.

## Quality Gate

Work MUST NOT be considered complete until linting and all tests pass.

## Governance

This constitution overrides other practices. Amendments MUST include a written rationale and a
version bump. Versioning follows semantic versioning: MAJOR for backward-incompatible governance
changes, MINOR for new principles or materially expanded guidance, and PATCH for non-semantic
clarifications. Plans and reviews MUST verify compliance with this constitution.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE): Confirm original adoption date. | **Last Amended**: 2026-10-26
