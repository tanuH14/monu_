# Everything Soft — Vite + React Export

Plain Vite + React 19 + Tailwind v4 version of the project (no SSR, no TanStack Start/Router).

## Quick start

```bash
npm install     # or pnpm install / bun install / yarn
npm run dev     # http://localhost:5173
npm run build
npm run preview
```

## Structure

```
index.html
vite.config.ts
tsconfig.json
src/
  main.tsx           # React entry
  App.tsx            # Single-page composition of all dreamy sections
  styles.css         # Tailwind v4 + design tokens + animations
  components/
    dreamy/          # All custom interactive components
    ui/              # shadcn/ui primitives
  hooks/
  lib/
    placard-data.ts  # Letters / placards / constellation copy
    utils.ts
```

Path alias `@/*` -> `src/*` is configured in both `vite.config.ts` and `tsconfig.json`.
