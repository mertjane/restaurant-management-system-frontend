import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SortOption = 'name_asc' | 'name_desc' | 'newest' | 'oldest';

interface SortState {
  value: SortOption;
}

const initialState: SortState = {
  value: 'newest',
};

export const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSort: (state, action: PayloadAction<SortOption>) => {
      state.value = action.payload;
    },
  },
});

export const { setSort } = sortSlice.actions;
export default sortSlice.reducer;
