import { RootState } from './../redux/store';
import { useQuery } from "@tanstack/react-query";
import { RestaurantResponse } from "../types/restaurant.types";
import { getRestaurantsByUserId } from "../api/restaurant.api";
import { useSelector } from "react-redux";


export const useRestaurant = () => {
  const userId = useSelector((state: RootState) => state.auth.user?.id);


  return useQuery<RestaurantResponse[], Error>({
    queryKey: ["restaurant", userId],
    queryFn: () => getRestaurantsByUserId(userId!),
    enabled: !!userId
  })
}