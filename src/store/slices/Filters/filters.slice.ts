import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FiltersState, StateOption } from './filters.type';
import { ALL_STATES } from './filters.util';

const initialState: FiltersState = {
  priceRange: {
    min: 0,
    max: 0
  },
  states: {
    searchInput: '',
    selectedStates: [],
    dropdownIsOpen: false,
    dropdownOptions: ALL_STATES
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
    setStatesDropdownIsOpen: (state, action: PayloadAction<boolean>) => {
      state.states.dropdownIsOpen = action.payload
    },
    setStatesSearchInput: (state, action: PayloadAction<string>) => {
      state.states.searchInput = action.payload
      state.states.dropdownOptions = filterStatesDropdownOptions(state.states.selectedStates, action.payload)
    },
    unselectState: (state, action: PayloadAction<string>) => {
      state.states.selectedStates = state.states.selectedStates.filter((option) => option.value !== action.payload)
      state.states.dropdownOptions = filterStatesDropdownOptions(state.states.selectedStates, state.states.searchInput)
    },
    selectState: (state, action: PayloadAction<StateOption>) => {
      state.states.selectedStates.push(action.payload)
      state.states.dropdownOptions = filterStatesDropdownOptions(state.states.selectedStates, state.states.searchInput)
    }
  },
});

export const { setMinPrice, setMaxPrice, setStatesDropdownIsOpen, setStatesSearchInput, unselectState, selectState } = favoritesSlice.actions;
export default favoritesSlice.reducer;

const filterStatesDropdownOptions = (selectedOptions: StateOption[], searchInput: string) => {
  const normalized = searchInput.trim().toLowerCase()

  return ALL_STATES.filter((state) => {
    if (selectedOptions.some((selected) => selected.value === state.value)) {
      return false
    }

    if (!normalized) {
      return true
    }

    return (
      state.label.toLowerCase().includes(normalized) ||
      state.value.toLowerCase().includes(normalized)
    )
  })
}