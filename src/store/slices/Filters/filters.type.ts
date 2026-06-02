export type FiltersState = {
  priceRange: {
    min: number;
    max: number;
  }
  states: {
    searchInput: string;
    selectedStates: string[];
    dropdownIsOpen: boolean
  };
};
