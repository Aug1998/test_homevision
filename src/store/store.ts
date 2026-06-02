import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./slices/Favorites/favorites.slice";
import filtersReducer from "./slices/Filters/filters.slice";

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    filters: filtersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;