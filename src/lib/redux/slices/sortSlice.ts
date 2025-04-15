import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SortOption = 'name_asc' | 'name_desc' | 'newest' | 'oldest' | 'today_to_future';

interface SortState {
  customers: SortOption;
  bookings: SortOption;
}

const initialState: SortState = {
  customers: 'newest',
  bookings: 'newest',
};

export const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setCustomerSort: (state, action: PayloadAction<SortOption>) => {
      state.customers = action.payload;
    },
    setBookingSort: (state, action: PayloadAction<SortOption>) => {
      state.bookings = action.payload;
    },
  },
});

export const { setCustomerSort, setBookingSort } = sortSlice.actions;
export default sortSlice.reducer;
