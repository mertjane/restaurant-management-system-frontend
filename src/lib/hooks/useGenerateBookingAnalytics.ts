import { useMutation } from "@tanstack/react-query";
import { generateBookingAnalytics, GenerateBookingAnalyticsParams } from "../api/bookings.api";

export const useGenerateBookingAnalytics = () => {
  return useMutation({
    mutationFn: (params: GenerateBookingAnalyticsParams) =>
      generateBookingAnalytics(params),
  })
}
