import axios from "axios";
import { Bookings, BookingsResponse } from "./types";


// Function to fetch bookings sorted by date ascending
export const sortByTimeASC = async (
    restaurantId: number,
    page: number,
    size: number
  ): Promise<Bookings[]> => {  // Return the array of Bookings
    try {
      const response = await axios.get<BookingsResponse>(
        `${import.meta.env.VITE_API_URL}/bookings/restaurant/${restaurantId}?page=${page - 1}&size=${size}&sort=time,asc`
      );
      return response.data.content; // Return the 'content' array from the response
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch bookings");
    }
  };
  
  // Function to fetch bookings sorted by date descending
  export const sortByTimeDESC = async (
    restaurantId: number,
    page: number,
    size: number
  ): Promise<Bookings[]> => {  // Return the array of Bookings
    try {
      const response = await axios.get<BookingsResponse>(
        `${import.meta.env.VITE_API_URL}/bookings/restaurant/${restaurantId}?page=${page - 1}&size=${size}&sort=time,desc`
      );
      return response.data.content; // Return the 'content' array from the response
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch bookings");
    }
  };



  // Function to fetch bookings sorted by date ascending
export const sortByDateASC = async (
    restaurantId: number,
    page: number,
    size: number
  ): Promise<Bookings[]> => {  // Return the array of Bookings
    try {
      const response = await axios.get<BookingsResponse>(
        `${import.meta.env.VITE_API_URL}/bookings/restaurant/${restaurantId}?page=${page - 1}&size=${size}&sort=date,asc`
      );
      return response.data.content; // Return the 'content' array from the response
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch bookings");
    }
  };
  
  // Function to fetch bookings sorted by date descending
  export const sortByDateDESC = async (
    restaurantId: number,
    page: number,
    size: number
  ): Promise<Bookings[]> => {  // Return the array of Bookings
    try {
      const response = await axios.get<BookingsResponse>(
        `${import.meta.env.VITE_API_URL}/bookings/restaurant/${restaurantId}?page=${page - 1}&size=${size}&sort=date,desc`
      );
      return response.data.content; // Return the 'content' array from the response
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch bookings");
    }
  };