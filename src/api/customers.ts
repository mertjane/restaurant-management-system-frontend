import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CustomerResponse } from "./types";



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


// Search customers by name Thunk
export const searchCustomers = createAsyncThunk<
     CustomerResponse,
     {
          restaurantId: number;
          searchTerm?: string;
          page: number;
          size: number;
     },
     { rejectValue: string }
>("customers/searchCustomers", async ({ restaurantId, searchTerm, page, size }, { rejectWithValue }) => {
     try {
          const params = new URLSearchParams();
          if (searchTerm) params.append('searchTerm', searchTerm);
          params.append('page', (page - 1).toString());
          params.append('size', size.toString());

          const response = await axios.get<CustomerResponse>(
               `${import.meta.env.VITE_API_URL}/customers/restaurant/${restaurantId}/search?${params.toString()}`
          );

          return response.data;
     } catch (error: any) {
          return rejectWithValue(error.response?.data?.message || "Failed to search customers.");
     }
})



