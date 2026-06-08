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
