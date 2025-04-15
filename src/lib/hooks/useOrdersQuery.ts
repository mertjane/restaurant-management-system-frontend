import { useQuery } from "@tanstack/react-query";
import { OrdersResponseData } from "../types/orders.t";
import { fetchOrdersByRestaurantId } from "../api/orders.api";
import { useRestaurant } from "./useRestaurant";


export const useOrdersQuery = () => {
  const { data: restaurant } = useRestaurant();
  const restaurantId = restaurant?.[0]?.id;

  return useQuery<OrdersResponseData[]>({
    queryKey: ["orders", restaurantId],
    queryFn: () => fetchOrdersByRestaurantId(restaurantId!),
    enabled: !!restaurantId, // only run when restaurantId exists
  });
};
