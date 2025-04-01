import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BookingsResponse } from "./types";



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


// Get single booking By ID
export const getBookingById = async (id: number) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/bookings/${id}`);
    return response.data; // Returns the BookingDTO object
  } catch (error) {
    console.error("Error fetching booking:", error);
    throw error; // Propagate error to handle it in the component
  }
};


// Update booking credentials by ID 
export const updateBookingById = async (id: number, updatedData: any) => {
  try {
    const response = await axios.patch(`${import.meta.env.VITE_API_URL}/bookings/${id}`,
      updatedData,
      {
        headers: { "Content-Type": "application/json" }
      },
    )
    return response.data;
  } catch (error) {
    console.error("Error updating booking:", error);
    throw error;
  }
}


// FILTER BOOKINGS BY RESTAURANT ID WITH STATUS = eg: 'PENDING, CANCELLED, CONFIRMED'
export const filterBookingByStatus = async (restaurantId: number, status: string, page: number, size: number): Promise<BookingsResponse> => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/bookings/restaurant/${restaurantId}/filter?status=${status}?page=${page - 1}&size=${size}`);

    return response.data;

  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to filter bookings");
  }
};


// Filter bookings by restaurant ID with optional parameters
export const filterBookings = async (
  restaurantId: number,
  filters: {
    status?: string;
    customerNames?: string[];
    startTime?: string;
    endTime?: string;
    startDate?: string;
    endDate?: string;
  },
  page: number,
  size: number
): Promise<BookingsResponse> => {
  try {
    const params = new URLSearchParams();
    if (filters.status) params.append("status", filters.status);
    if (filters.customerNames && filters.customerNames.length > 0) {
      params.append("customerNames", filters.customerNames.join(",").replace(/\s+/g, "+"));
    }
    if (filters.startTime) params.append("startTime", filters.startTime);
    if (filters.endTime) params.append("endTime", filters.endTime);
    if (filters.startDate) params.append("startDate", filters.startDate);
    if (filters.endDate) params.append("endDate", filters.endDate);
    params.append("page", (page - 1).toString()); // Backend expects 0-based page
    params.append("size", size.toString());


    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/bookings/restaurant/${restaurantId}/filter`,
      { params }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to filter bookings");
  }
};
