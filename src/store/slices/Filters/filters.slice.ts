import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FiltersState } from './filters.type';

const initialState: FiltersState = {
  priceRange: {
    min: 0,
    max: 0
  },
  states: {
    searchInput: '',
    selectedStates: [],
    dropdownIsOpen: false
  }
}

export const favoritesSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setMinPrice: (state, action: PayloadAction<number | undefined>) => {
      if (action.payload === undefined) return
      state.priceRange.min = action.payload
    },
    setMaxPrice: (state, action: PayloadAction<number | undefined>) => {
      if (action.payload === undefined) return
      state.priceRange.max = action.payload
    },
  },
});

export const { setMinPrice, setMaxPrice } = favoritesSlice.actions;
export default favoritesSlice.reducer;
