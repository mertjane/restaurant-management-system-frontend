import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Restaurant } from "./types";



/** GET RESTAURANTS FOR LOGGED-IN USER */
export const getRestaurant = createAsyncThunk(
  "restaurant/getRestaurant",
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await axios.get<Restaurant[]>(
        `${import.meta.env.VITE_API_URL}/restaurant/user/${userId}`, {
        headers: { "Content-Type": "application/json" }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong. Cannot get restaurant details.")
    }
  }
)
