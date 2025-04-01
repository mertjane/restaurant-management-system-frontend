import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Bookings } from "../../api/types";
import { getBookings } from "../../api/bookings";



interface BookingState {
    content: Bookings[];
    totalPages: number;
    loading: boolean;
    error: string | null;
}

const initialState: BookingState = {
    content: [],
    totalPages: 0,
    loading: false,
    error: null,
};

export const bookingSlice = createSlice({
    name: "bookings",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBookings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBookings.fulfilled, (state, action) => {
                state.content = action.payload.content.map(booking => ({
                  id: booking.id,
                  date: booking.date,
                  time: booking.time,
                  numPeople: booking.numPeople,
                  status: booking.status,
                  customer: booking.customer ? {
                    customer_id: booking.customer.customer_id,
                    name: booking.customer.name,
                    email: booking.customer.email,
                    phone: booking.customer.phone.toString() // Ensure phone is string
                  } : undefined
                }));
                state.totalPages = action.payload.totalPages;
                state.loading = false;
              })
            .addCase(getBookings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },


});

export default bookingSlice.reducer;


