import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FavoritesState } from './favorites.type';
import { getFavoriteHousesFromLocalStorage, setFavoriteHousesInLocalStorage } from './favorites.util';

const initialState: FavoritesState = { 
  favoritesIds: getFavoriteHousesFromLocalStorage()
}

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavoriteHouseId: (state, action: PayloadAction<number | undefined>) => {
      if (action.payload === undefined) return

      const ids = getFavoriteHousesFromLocalStorage()

      if (ids.includes(action.payload)) {
        const newFavorites = ids.filter((_id) => _id !== action.payload)
        setFavoriteHousesInLocalStorage(newFavorites)
        state.favoritesIds = newFavorites;
      } else {
        const newFavorites = [...ids, action.payload]
        setFavoriteHousesInLocalStorage(newFavorites)
        state.favoritesIds = newFavorites;
      }
    },
  },
});

export const { toggleFavoriteHouseId } = favoritesSlice.actions;
export default favoritesSlice.reducer;
