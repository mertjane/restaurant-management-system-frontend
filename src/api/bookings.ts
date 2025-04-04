import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Bookings, BookingsResponse, UpdateBookingPayload } from "./types";


// Get all restaurant's bookings by restaurant ID Thunk
export const getBookings = createAsyncThunk<
    BookingsResponse, // Using your existing BookingsResponse interface
    { restaurantId: number; page: number; size: number },
    { rejectValue: string }
>("bookings/getBookings", async ({ restaurantId, page, size }, { rejectWithValue }) => {
    try {
        const response = await axios.get<BookingsResponse>(
            `${import.meta.env.VITE_API_URL}/bookings/restaurant/${restaurantId}?page=${page - 1}&size=${size}`
        );
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch bookings");
    }
});


export const getBookingById = createAsyncThunk<
    BookingsResponse,
    { id: number },
    { rejectValue: string }
>("bookings/getBookingById", async ({ id }, { rejectWithValue }) => {
    try {
        const response = await axios.get<BookingsResponse>(
            `${import.meta.env.VITE_API_URL}/bookings/${id}`
        );
        return response.data;
    }
    catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch booking");
    }
});


// Update booking credentials by ID
export const updateBookingById = createAsyncThunk<
    Bookings, // Return type (the updated booking)
    UpdateBookingPayload, // Payload type
    { rejectValue: string }
>(
    "bookings/updateBooking",
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const response = await axios.patch<Bookings>(
                `${import.meta.env.VITE_API_URL}/bookings/${id}`,
                updatedData,
                {
                    headers: { "Content-Type": "application/json" },
                }
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to update booking"
            );
        }
    }
);


// Filter Bookings Thunk
export const filterBookings = createAsyncThunk<
    BookingsResponse,
    {
        restaurantId: number;
        status?: string;
        startTime?: string;
        endTime?: string;
        startDate?: string;
        endDate?: string;
        customerNames?: string[];
        page: number;
        size: number;
    },
    { rejectValue: string }
>("bookings/filterBookings", async (filterParams, { rejectWithValue }) => {
    try {
        // Convert customerNames array to comma-separated string if exists
        const customerNamesParam = filterParams.customerNames?.join(",");

        // Build query params
        const params = new URLSearchParams();
        if (filterParams.status) params.append('status', filterParams.status);
        if (filterParams.startTime) params.append('startTime', filterParams.startTime);
        if (filterParams.endTime) params.append('endTime', filterParams.endTime);
        if (filterParams.startDate) params.append('startDate', filterParams.startDate);
        if (filterParams.endDate) params.append('endDate', filterParams.endDate);
        if (customerNamesParam) params.append('customerNames', customerNamesParam);
        params.append('page', (filterParams.page - 1).toString());
        params.append('size', filterParams.size.toString());

        const response = await axios.get<BookingsResponse>(
            `${import.meta.env.VITE_API_URL}/bookings/restaurant/${filterParams.restaurantId}/filter?${params.toString()}`
        );
        return response.data
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Failed to filter bookings");
    }
});


// Search bookings by customer Name Thunk
export const searchBookings = createAsyncThunk<
    BookingsResponse,
    {
        restaurantId: number;
        searchTerm?: string;
        page: number;
        size: number;
    },
    { rejectValue: string }
>("bookings/searchBookings", async ({ restaurantId, searchTerm, page, size }, { rejectWithValue }) => {
    try {
        const params = new URLSearchParams();
        if (searchTerm) params.append('searchTerm', searchTerm);
        params.append('page', (page - 1).toString());
        params.append('size', size.toString());

        const response = await axios.get<BookingsResponse>(
            `${import.meta.env.VITE_API_URL}/bookings/restaurant/${restaurantId}/search?${params.toString()}`
        );

        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Failed to search bookings");
    }
});
