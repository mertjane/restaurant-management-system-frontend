import axios from "axios";
import { BookingsResponse } from "./types";




// Function to fetch bookings belong to correspond restaurant with pagination
export const getBookings = async (restaurantId: number, page: number, size: number): Promise<BookingsResponse> => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/bookings/restaurant/${restaurantId}?page=${page - 1}&size=${size}`);

      return response.data;
      
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch bookings");
    }
  };