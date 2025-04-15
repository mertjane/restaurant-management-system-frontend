import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterValues {
  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  status?: string;
}


interface FilterState {
  isOpen: boolean;
  bookings: FilterValues;
}


const initialState: FilterState = {
  isOpen: false,
  bookings: {},
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
    setBookingFilters: (state, action: PayloadAction<FilterValues>) => {
      state.bookings = { ...state.bookings, ...action.payload };

    },
    clearBookingFilters: (state) => {
      state.bookings = {};
    },
  },

});

export const { openFilter,
  closeFilter,
  toggleFilter,
  setBookingFilters,
  clearBookingFilters,
} = filterSlice.actions;
export default filterSlice.reducer;
