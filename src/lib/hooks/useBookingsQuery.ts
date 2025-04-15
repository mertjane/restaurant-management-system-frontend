import { useQuery } from "@tanstack/react-query";
import { getBookingsByRestaurantId, searchBookingsByName, sortBookings, filterBookings } from "../api/bookings.api";
import { BookingResponse } from "../types/booking.types";

import { useRestaurant } from "./useRestaurant";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getBookingSortParams } from "../utils/bookings.utils";


export const useBookingsQuery = (page: number, size: number, searchTerm?: string) => {
  const sort = useSelector((state: RootState) => state.sort.bookings);
  const filters = useSelector((state: RootState) => state.filter.bookings);
  const { data: restaurant } = useRestaurant();
  const restaurantId = restaurant?.[0]?.id;

  const hasActiveFilters =
    filters.startDate || filters.endDate || filters.startTime || filters.endTime || filters.status;

  return useQuery<BookingResponse, Error>({
    queryKey: ["bookings", restaurantId, page, size, searchTerm, sort, filters],
    queryFn: () => {
      if (!restaurantId) throw new Error("Restaurant ID is undefined");

      if (searchTerm && searchTerm.trim() !== "") {
        return searchBookingsByName({
          restaurantId,
          searchTerm,
          page,
          size,
        });
      }

      if (hasActiveFilters) {
        return filterBookings({
          restaurantId,
          startDate: filters.startDate,
          endDate: filters.endDate,
          startTime: filters.startTime,
          endTime: filters.endTime,
          status: filters.status,
          page,
          size,
        });
      }

      if (sort) {
        // Handle today_to_future custom sort
        if (sort === "today_to_future") {
          return sortBookings({
            restaurantId,
            page,
            size,
            sortBy: "date", // Always sorting by date
            direction: "desc", // Newest to oldest
            customSort: "today_to_future", // Custom flag to indicate the custom sort
          });
        } else {
          const { sortBy, direction } = getBookingSortParams(sort);
          return sortBookings({
            restaurantId,
            page,
            size,
            sortBy,
            direction,
          });
        }
      }


      return getBookingsByRestaurantId({
        restaurantId,
        page,
        size,
      });
    },
    enabled: !!restaurantId,
  });
};
