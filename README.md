# HomeVision Test App

A small React + TypeScript + Vite application for browsing houses, filtering by price and state, and saving favorites.

## Overview

This project is a front-end application built with React, Vite, Redux Toolkit, React Query, and Emotion. It loads house data from an external API and provides:

- a **Home** page with an infinite scrolling list of homes
- a **Favorites** page for saved house cards
- a **Filters** sidebar for price and state filtering
- client-side favorites persistence using **localStorage**

## Tech Stack

- React.js
- TypeScript
- Vite
- Redux Toolkit
- React Query (@tanstack/react-query)
- Emotion (for css)
- React Router
- React Icons
- ESLint

## Project Structure

- `src/main.tsx`
  - app entrypoint
  - wraps components with Redux `Provider` and React Query `QueryClientProvider`
  - applies global Emotion styles

- `src/App.tsx`
  - configures routing with `BrowserRouter`
  - mounts the `NavBar`
  - exposes `/` (home) and `/favorites`

- `src/pages/`
  - `Home.page.tsx` — main listing with infinite scroll, filtering, and favorite state
  - `Favorites.page.tsx` — renders saved houses from Redux state

- `src/components/`
  - `Filters.tsx` — price and location controls
  - `Card.tsx` — house card display
  - `NavBar.tsx` — navigation between Home and Favorites
  - `LoadingIcon.tsx` — shared loading indicator
  - `Button.tsx` — reusable button UI element

- `src/store/`
  - `store.ts` — Redux store setup
  - `hooks.ts` — typed hooks for Redux dispatch and selector
  - `slices/`
    - `Favorites/` — favorite house IDs persistence and toggle behavior
    - `Filters/` — price range and state filter logic

- `src/api/`
  - `client.ts` — fetches house data from `VITE_HOUSES_API_URL`
  - `type.ts` — `House` and API response types

- `src/queries/house.queries.ts`
  - React Query definitions for `infinite` and `amount` house queries

- `vite.config.ts`
  - Vite configuration using `@vitejs/plugin-react`

## Notes

- Favorite house IDs are stored in `localStorage` under `favoriteHousesIds`.
- Filtering is done on the client using Redux state for price range and selected U.S. states.
- The home page fetches paged results and uses the intersection observer to load more houses when the bottom sentinel becomes visible.

## Recommended Node Version

Use Node 18+ for best compatibility with Vite and the workspace dependencies.
