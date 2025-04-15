import { getBookingAnalyticsBetween } from '../api/bookings.api';
import { GetBookingAnalyticsParams } from './../types/booking.types';
import { useQuery } from "@tanstack/react-query";


export const useGetBookingAnalytics = ({
  restaurantId,
  startDate,
  endDate,
}: GetBookingAnalyticsParams) => {
  return useQuery({
    queryKey: ["booking-analytics", restaurantId, startDate, endDate],
    queryFn: () =>
      getBookingAnalyticsBetween({ restaurantId, startDate, endDate }),
    enabled: !!restaurantId && !!startDate && !!endDate,
  })
}