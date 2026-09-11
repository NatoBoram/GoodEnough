# Copilot instructions

- This is a SvelteKit application built with strict TypeScript and managed with `pnpm`.
- Code that cannot run on the client must be in `src/lib/server`.
- Database code reside in `src/lib/server/db`.
- Environment variables are loaded from `.env.local` by `src/lib/server/env.ts`.
- BetterAuth is configured in `src/lib/server/auth.ts`.
- Styling uses Tailwind 4 and a design language defined at `src/routes/layout.css`.
- All user-facing text must use Paraglide. Its runtime is at `src/lib/paraglide` and translations are at `messages/*.json`.
- To check for linting and formatting errors, always use `pnpm run lint:fix`. The `lint` script is for CI, not for development.
- Before writing Svelte code, first consult with the Svelte tools and Svelte skills.
