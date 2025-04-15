import axios from "axios";
import { OrdersResponseData } from "../types/orders.t";
import { BASE_URL } from "./_instances";

/**
 * Fetch All Orders By restaurantId
 * @param restaurantId
 */
export const fetchOrdersByRestaurantId = async (
  restaurantId: number
): Promise<OrdersResponseData[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/orders/restaurant/${restaurantId}`);
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch orders:", error);
    throw error;
  }
};