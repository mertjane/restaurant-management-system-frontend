import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// Create an async thunk to fetch customers
export const getCustomers = createAsyncThunk(
  "customers/getCustomers", // action type
  async ({ userId, page, size }: { userId: number, page: number, size: number }, { rejectWithValue }) => {
    try {
      // Make the API request
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/customers/user/${userId}?page=${page - 1}&size=${size}`
      );
      // Return the data received from the API
      return response.data;
    } catch (error: any) {
      // If an error occurs, throw an error with a message
      return rejectWithValue(error.response?.data?.message || "Failed to fetch customers");
    }
  }
);
