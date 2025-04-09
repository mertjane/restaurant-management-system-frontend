import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export type ToastType = "success" | "error" | "info" | "warning";

interface ToastState {
  isOpen: boolean;
  message: string;
  description?: string;
  type: ToastType;
}

const initialState: ToastState = {
  isOpen: false,
  message: "",
  description: "",
  type: "success",
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (
      state,
      action: PayloadAction<{ message: string; description: string; type: ToastType }>
    ) => {
      state.isOpen = true;
      state.message = action.payload.message;
      state.description = action.payload.description;
      state.type = action.payload.type;
    },
    hideToast: (state) => {
      state.isOpen = false;
      state.message = "";
      state.description = "";
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;

