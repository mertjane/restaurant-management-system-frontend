import { useQuery } from "@tanstack/react-query";
import { getBookingsByRestaurantId, searchBookingsByName } from "../api/bookings.api";
import { BookingResponse } from "../types/booking.types";

import { useRestaurant } from "./useRestaurant";


export const useBookingsQuery = (page: number, size: number, searchTerm?: string) => {
  const { data: restaurant } = useRestaurant();
  const restaurantId = restaurant?.[0]?.id;

  return useQuery<BookingResponse, Error>({
    queryKey: ["bookings", restaurantId, page, size, searchTerm],
    queryFn: () => {
      if (searchTerm && searchTerm.trim() !== "") {
        return searchBookingsByName({
          restaurantId: restaurantId!,
          searchTerm,
          page,
          size,
        })
      } else {
        return getBookingsByRestaurantId({
          restaurantId: restaurantId!,
          page,
          size
        });
      }

    },
    enabled: !!restaurantId
  })
}