# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start dev server (Vite HMR)
pnpm build      # Type-check + build for production (tsc -b && vite build)
pnpm lint       # Run ESLint
pnpm preview    # Preview production build locally
```

## Stack

- **React 19** with TypeScript, built with **Vite**
- **React Router v7** for client-side routing
- **TanStack React Query v5** for server/async state
- **Zustand v5** for client-side global state
- **Build Tool**: Vite

## Architecture

Personal inflation tracker SPA. State is split across two layers:

- **TanStack Query** — fetching, caching, and synchronizing remote/async data (e.g., inflation API calls)
- **Zustand** — client-side global state; stores live in `src/store/`
  - `uiTheme.ts` — `isDark: boolean`, `toggleDark()`
  - `user.ts` — `user: User | null`, `login(user)`, `logout()`
- **React Router** — routing via `createBrowserRouter` in `src/app/router.tsx`

Entry point: `src/main.tsx` → `<RouterProvider>`. Routes:
- `/` → `src/app/routes/home/HomePage.tsx`
- `/dashboard` → `src/app/routes/dashboard/DashboardPage.tsx`

Shared types live in `src/types/` (e.g., `User` interface).

## TypeScript Config

Strict mode enforced: `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`, `erasableSyntaxOnly`. Target is ES2023.
