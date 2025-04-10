import { createSlice } from "@reduxjs/toolkit";


interface FilterState {
  isOpen: boolean;
}


const initialState: FilterState = {
  isOpen: false,
};


export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    openFilter: (state) => {
      state.isOpen = true;
    },
    closeFilter: (state) => {
      state.isOpen = false;
    },
    toggleFilter: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openFilter, closeFilter, toggleFilter } = filterSlice.actions;
export default filterSlice.reducer;
