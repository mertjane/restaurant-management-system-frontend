import { createSlice } from "@reduxjs/toolkit";
import { Bookings } from "../../api/types";
import { filterBookings, getBookingById, getBookings, searchBookings, updateBookingById } from "../../api/bookings";
import { sortByDateASC, sortByDateDESC, sortByTimeASC, sortByTimeDESC } from "../../api/sort-bookings";




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
        // get bookings
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
                        id: booking.customer.id,
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
            })
        builder
            // Filter
            .addCase(filterBookings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(filterBookings.fulfilled, (state, action) => {
                // Directly use the content from the response
                state.content = action.payload.content;
                state.totalPages = action.payload.totalPages;
                state.loading = false;
            })
            .addCase(filterBookings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
        builder
            // Search
            .addCase(searchBookings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchBookings.fulfilled, (state, action) => {
                state.content = action.payload.content;
                state.totalPages = action.payload.totalPages;
                state.loading = false;
            })
            .addCase(searchBookings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
        // Sorting cases
        builder
            .addCase(sortByTimeASC.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sortByTimeASC.fulfilled, (state, action) => {
                state.content = action.payload.content;
                state.totalPages = action.payload.totalPages;
                state.loading = false;
            })
            .addCase(sortByTimeASC.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(sortByTimeDESC.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sortByTimeDESC.fulfilled, (state, action) => {
                state.content = action.payload.content;
                state.totalPages = action.payload.totalPages;
                state.loading = false;
            })
            .addCase(sortByTimeDESC.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(sortByDateASC.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sortByDateASC.fulfilled, (state, action) => {
                state.content = action.payload.content;
                state.totalPages = action.payload.totalPages;
                state.loading = false;
            })
            .addCase(sortByDateASC.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(sortByDateDESC.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sortByDateDESC.fulfilled, (state, action) => {
                state.content = action.payload.content;
                state.totalPages = action.payload.totalPages;
                state.loading = false;
            })
            .addCase(sortByDateDESC.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
        // Get booking by ID
        builder
            .addCase(getBookingById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBookingById.fulfilled, (state, action) => {
                state.content = action.payload.content.map(booking => ({
                    id: booking.id,
                    date: booking.date,
                    time: booking.time,
                    numPeople: booking.numPeople,
                    status: booking.status,
                    customer: booking.customer ? {
                        id: booking.customer.id,
                        name: booking.customer.name,
                        email: booking.customer.email,
                        phone: booking.customer.phone.toString() // Ensure phone is string
                    } : undefined
                }));
                state.totalPages = action.payload.totalPages;
                state.loading = false;
            })
            .addCase(getBookingById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

        // Update booking by ID
        builder
            .addCase(updateBookingById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateBookingById.fulfilled, (state, action) => {
                state.loading = false;
                // Update the specific booking in your state if needed
                const updatedIndex = state.content.findIndex(
                    (booking) => booking.id === action.payload.id
                );
                if (updatedIndex !== -1) {
                    state.content[updatedIndex] = {
                        ...state.content[updatedIndex],
                        ...action.payload,
                    };
                }
            })
            .addCase(updateBookingById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },


});




export default bookingSlice.reducer;


