export type FiltersState = {
  price: {
    min: number | null;
    max: number | null;
  }
  states: {
    searchInput: string;
    selectedStates: string[];
    dropdownIsOpen: boolean
  };
};
