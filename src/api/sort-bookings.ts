import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BookingsResponse } from "./types";


// Function to fetch bookings sorted by date ascending
export const sortByTimeASC = createAsyncThunk(
    "bookings/sortByTimeASC",
    async (
        { restaurantId, page, size }: { restaurantId: number; page: number; size: number },
        { rejectWithValue }
    ) => {
        try {
            const response = await axios.get<BookingsResponse>(
                `${import.meta.env.VITE_API_URL}/bookings/restaurant/${restaurantId}?page=${page - 1}&size=${size}&sort=time,asc`
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch bookings");
        }
    }
);


// Function to fetch bookings sorted by date descending
export const sortByTimeDESC = createAsyncThunk(
    "bookings/sortByTimeDESC",
    async (
        { restaurantId, page, size }: { restaurantId: number; page: number; size: number },
        { rejectWithValue }
    ) => {
        try {
            const response = await axios.get<BookingsResponse>(
                `${import.meta.env.VITE_API_URL}/bookings/restaurant/${restaurantId}?page=${page - 1}&size=${size}&sort=time,desc`
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch bookings");
        }
    }
);




// Function to fetch bookings sorted by date ascending
export const sortByDateASC = createAsyncThunk(
    "bookings/sortByDateASC",
    async (
        { restaurantId, page, size }: { restaurantId: number; page: number; size: number },
        { rejectWithValue }
    ) => {
        try {
            const response = await axios.get<BookingsResponse>(
                `${import.meta.env.VITE_API_URL}/bookings/restaurant/${restaurantId}?page=${page - 1}&size=${size}&sort=date,asc`
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch bookings");
        }
    }
);


// Function to fetch bookings sorted by date descending
export const sortByDateDESC = createAsyncThunk(
    "bookings/sortByDateDESC",
    async (
        { restaurantId, page, size }: { restaurantId: number; page: number; size: number },
        { rejectWithValue }
    ) => {
        try {
            const response = await axios.get<BookingsResponse>(
                `${import.meta.env.VITE_API_URL}/bookings/restaurant/${restaurantId}?page=${page - 1}&size=${size}&sort=date,desc`
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch bookings");
        }
    }
);
