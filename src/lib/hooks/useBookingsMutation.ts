import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NewBookings, UpdateBookingPayload } from "../types/booking.types";
import { createBooking, updateBookingById } from "../api/bookings.api";
import { useRestaurant } from "./useRestaurant";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { showToast } from "../redux/slices/toastSlice";


export const useBookingMutation = () => {
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();
  const { data: restaurant } = useRestaurant();
  const restaurantId = restaurant?.[0]?.id;

  return useMutation({
    mutationFn: (bookingData: NewBookings | UpdateBookingPayload) => {
      if (!restaurantId) throw new Error("Missing restaurant ID");
      if ("id" in bookingData) {
        // If it has an 'id', it is an update, so call the update function
        return updateBookingById(bookingData.id, bookingData.updatedData);
      } else {
        // If no 'id', it's a new booking, so call createBooking
        return createBooking({ restaurantId, bookingData });
      }
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      
       // Signal that a new booking was created
      queryClient.setQueryData(["new-booking-created"], new Date().toISOString());

      // Type narrowing: If `variables` has an `id`, it's an update, otherwise it's a create
      if ('id' in variables) {
        // It's an update
        dispatch(
          showToast({
            message: "Successfully updated booking.",
            description: "Booking updated successfully.",
            type: "success",
          })
        );
      } else {
        // It's a new booking
        dispatch(
          showToast({
            message: "Successfully added booking.",
            description: "New booking added successfully.",
            type: "success",
          })
        );
      }
    },
    onError: (error) => {
      // Handle error case (optional)
      dispatch(
        showToast({
          message: "Error",
          description: error instanceof Error ? error.message : "Unknown error occurred.",
          type: "error",
        })
      );
    },

  });
};
