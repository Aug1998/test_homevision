export type FiltersState = {
  priceRange: {
    min: number;
    max: number;
  }
  states: {
    searchInput: string;
    selectedStates: StateOption[];
    dropdownIsOpen: boolean;
    dropdownOptions: StateOption[]
  };
};

export type StateOption = {
  value: string
  label: string
}