import axios from "axios";
import { Restaurant } from "./types";
import * as dotenv from 'dotenv';

dotenv.config();


/** GET RESTAURANTS FOR LOGGED-IN USER */
export const getRestaurantDetails = async (userId: number): Promise<Restaurant[]> => {
    try {
      const response = await axios.get<Restaurant[]>(`${process.env.API_BASE_URL}/restaurant/user/${userId}`, {
        headers: {"Content-Type": "application/json"}
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch restaurants.");
    }
  };

