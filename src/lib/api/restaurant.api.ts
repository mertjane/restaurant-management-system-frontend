import axios from "axios";
import { RestaurantResponse } from "../types/restaurant.types";

const BASE_URL = "http://localhost:8080"

/**
 * 
 * @param restaurantId 
 * @returns 
 */

export const getRestaurantsByUserId = async (
  restaurantId: number
): Promise<RestaurantResponse[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/restaurant/user/${restaurantId}`);
    return response.data;
  } catch (error: any) {
    throw console.error(error.response?.data?.message || "Failed to fetching restaurant details.")
  }
};
