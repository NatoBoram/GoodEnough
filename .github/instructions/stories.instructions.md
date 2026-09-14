---
applyTo: '**/*.stories.svelte'
name: Stories
---

# Stories

- Use Storybook stories for realistic, state-focused examples of Svelte components. Keep each story aligned to how the component is actually used in the app.
- Start every story file with `defineMeta` from `@storybook/addon-svelte-csf` and destructure `Story` from it.
- Set `tags: ['autodocs']` on the meta object for every story file. Add `argTypes: {}` when no custom control metadata is required.
- Use a stable title that matches the feature area and component, such as `Layout/TopBar`, `Categories/CategoryEdit`, or `Colours/Nord`.
- Keep story names descriptive and user-facing: `Default`, `With user`, `With error`, `Owner`, `Admin`, and similar state names are preferred over implementation detail names.
- Define reusable demo data near the top of the file. Prefer small, typed fixtures built from the real database models instead of ad hoc objects.
- When the component accepts persisted data, type fixtures with `Selectable<T>` and `Pick` to include only the fields the component needs.
- Use `as const satisfies ...` for fixture objects so the examples remain readonly and still match the expected shape exactly.
- Use `fn()` from `storybook/test` for event handlers and callback props in `args` to model interactive behaviour without wiring a real backend.
- Prefer project-relative imports such as `$lib/...` and `$app/paths` instead of absolute or unrelated paths.
- For route-aware examples, resolve real path values with `$app/paths` rather than hard-coding URL strings.
- Keep stories minimal and focused on one state or variant per story. Do not mix unrelated states into a single example.
- For rich content examples, use realistic data such as markdown parsed by `$lib/markdown.ts` instead of placeholder HTML.
- When a component depends on browser-only APIs such as `localStorage`, initialise the value in the story `args` so the story remains deterministic and safe in Storybook.
- Do not add mock-heavy or test-only behaviour to a story. The goal is to show real prop shapes and real component states, not artificial scaffolding.
- Follow the existing project pattern of grouping stories by domain, such as `Categories`, `Layout`, and `Colours`.
