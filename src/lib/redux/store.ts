import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { toastSlice } from "./slices/toastSlice";
import { sortSlice } from "./slices/sortSlice";
import { filterSlice } from "./slices/filterSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    toast: toastSlice.reducer,
    sort: sortSlice.reducer,
    filter: filterSlice.reducer,
  },
});

// Typescript types for the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
