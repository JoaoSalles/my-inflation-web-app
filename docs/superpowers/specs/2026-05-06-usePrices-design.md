# usePrices Hook — Design Spec

**Date:** 2026-05-06

## Goal

Provide a typed, cached React hook that fetches price records from the local inflation API, with optional filtering by date range and pagination.

## Files

| File | Action | Purpose |
|---|---|---|
| `src/api/prices.ts` | Create | Raw fetch function — isolated from React |
| `src/hooks/usePrices.ts` | Replace `usePrices.js` | TanStack Query hook |
| `src/main.tsx` | Update | Add `QueryClientProvider` |

## API Layer — `src/api/prices.ts`

Exports a single function:

```ts
fetchPrices(params?: PricesParams): Promise<Price[]>
```

`PricesParams`:
```ts
interface PricesParams {
  from?: string      // ISO 8601, e.g. "2026-05-01T00:00:00Z"
  to?: string        // ISO 8601
  page?: number
  pageSize?: number
}
```

- Builds `URLSearchParams` from whichever params are provided (omits undefined keys).
- Fetches `http://localhost:8080/prices?<params>`.
- Throws an `Error` on non-2xx responses (`response.ok === false`).
- Returns parsed `Price[]` (type already defined in `src/types/price.ts`).

## Hook — `src/hooks/usePrices.ts`

Exports:

```ts
usePrices(params?: PricesParams): UseQueryResult<Price[]>
```

- Uses `useQuery` from `@tanstack/react-query`.
- `queryKey: ['prices', params]` — separate cache entry per param combination.
- `queryFn: () => fetchPrices(params)`.
- Returns the full `UseQueryResult` so consumers access `data`, `isLoading`, `isError`, `error`, etc.

## Provider — `src/main.tsx`

Wrap `<RouterProvider>` with `<QueryClientProvider client={queryClient}>` where `queryClient` is a module-level `new QueryClient()`. This makes TanStack Query available throughout the app.

## Error Handling

`fetchPrices` throws on non-OK HTTP responses. TanStack Query catches this and surfaces it via `isError` / `error` on the query result. No additional error handling needed inside the hook itself.

## Out of Scope

- Mutations / POST endpoints.
- Pagination UI components.
- Retry configuration (TanStack Query defaults apply).
