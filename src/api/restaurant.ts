import axios from "axios";
import { Restaurant } from "./types";



/** GET RESTAURANTS FOR LOGGED-IN USER */
export const getRestaurantDetails = async (userId: number): Promise<Restaurant[]> => {
    try {
      const response = await axios.get<Restaurant[]>(`${import.meta.env.VITE_API_URL}/restaurant/user/${userId}`, {
        headers: {"Content-Type": "application/json"}
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch restaurants.");
    }
  };

