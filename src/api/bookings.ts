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
export const updateBookingById = async (id:number, updatedData: any) => {
  try {
    const response = await axios.patch(`${import.meta.env.VITE_API_URL}/bookings/${id}`,
      updatedData,
      {
        headers: {"Content-Type": "application/json"}
      },
    )
    return response.data;
  } catch (error) {
    console.error("Error updating booking:", error);
    throw error;
  }
}
