# HomeVision Test App

A small React + TypeScript + Vite application for browsing houses, filtering by price and state, and saving favorites.

## Overview

HomeVision is a house browsing application designed to simplify the property search experience. This front-end application  loads house data from an external API and provides:

- a **Home** page with an infinite scrolling list of homes
- a **Favorites** page for saved house cards
- a **Filters** sidebar for price and state filtering
- client-side favorites persistence using **localStorage**

## Value Proposition

HomeVision solves the challenge of efficiently browsing and filtering through large property listings. Whether you're a real estate professional or a homebuyer, HomeVision helps you:

- **Browse Efficiently**: Infinite scroll through property listings without page reloads, allowing you to view homes at your own pace
- **Filter Smart**: Quickly narrow down properties by price range and location (state) to focus on what matters most to you
- **Save & Revisit**: Build and maintain a personalized list of favorite properties that persists across sessions, even after closing the browser
- **Seamless Experience**: Enjoy a fast, interface optimized for desktop browsing with instant filtering and smooth navigation

## Tech Stack

- React.js
- TypeScript
- Vite
- Redux Toolkit
- React Query (TanStack)
- Emotion (for styles)
- React Router
- React Icons

## Running Locally

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file at the project root with your API endpoint:

```env
VITE_HOUSES_API_URL=https://api.example.com/houses
```

3. Start the development server:

```bash
npm run dev
```

4. Open the local app in your browser at `http://localhost:5173`.

## Live demo

https://test-homevision.vercel.app/