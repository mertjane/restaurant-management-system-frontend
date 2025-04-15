import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BookingStatus = "Pending" | "Cancelled" | "Confirmed";

interface CustomerDetails {
  name: string;
  phone: string;
  email: string;
}

interface UpdateBookingValues {
  date: string;
  time: string;
  numPeople: number;
  status: BookingStatus;
}

interface CreateBookingValues extends UpdateBookingValues {
  customer: CustomerDetails;
}

interface ModalState {
  isUpdateOpen: boolean;
  isCreateOpen: boolean;
  updateBookingData?: UpdateBookingValues;
  createBookingData?: CreateBookingValues;
}

const initialState: ModalState = {
  isUpdateOpen: false,
  isCreateOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openUpdateModal: (state, action: PayloadAction<UpdateBookingValues>) => {
      state.isUpdateOpen = true;
      state.updateBookingData = action.payload;
    },
    closeUpdateModal: (state) => {
      state.isUpdateOpen = false;
      state.updateBookingData = undefined;
    },
    openCreateModal: (state) => {
      state.isCreateOpen = true;
    },
    closeCreateModal: (state) => {
      state.isCreateOpen = false;
      state.createBookingData = undefined;
    },
    setCreateBookingData: (state, action: PayloadAction<CreateBookingValues>) => {
      state.createBookingData = action.payload;
    },
  },
});

export const {
  openUpdateModal,
  closeUpdateModal,
  openCreateModal,
  closeCreateModal,
  setCreateBookingData,
} = modalSlice.actions;

export default modalSlice.reducer;
