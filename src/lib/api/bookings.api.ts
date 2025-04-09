import axios from "axios";
import { BookingResponse } from "../types/booking.types";
const BASE_URL = "http://localhost:8080"
/**
 * Get Bookings by restaurantId (restauran's admin)
 * @param restaurantId
 * @param page
 * @param size 
 * @response data.content[] 
*/

export const getBookingsByRestaurantId = async ({
  restaurantId,
  page,
  size
}: { restaurantId: number, page: number, size: number }): Promise<BookingResponse> => {
  try {
    const response = await axios.get(`${BASE_URL}/bookings/restaurant/${restaurantId}`, {
      params: { page, size },
    })
    return response.data;
  } catch (error: any) {
    throw console.error(error.response?.data?.message || "Failed to fetch bookings.")
  }
}

/**
 * Search bookings by name api call
 * @param searchTerm
 * @page page
 * @param size 
 * @response data.content[]
 */

interface SearchBookingParams {
  restaurantId: number;
  searchTerm?: string;
  page: number;
  size: number;
}

export const searchBookingsByName = async ({
  restaurantId,
  searchTerm,
  page,
  size,
}: SearchBookingParams): Promise<BookingResponse> => {
  try {
    const params = new URLSearchParams();
    if(searchTerm) params.append("searchTerm", searchTerm);
    params.append("page", page.toString());
    params.append("size", size.toString());

    const response = await axios.get<BookingResponse>(
      `${BASE_URL}/bookings/restaurant/${restaurantId}/search?${params.toString()}`
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching bookings by name:", error);
    throw error;
  }
}