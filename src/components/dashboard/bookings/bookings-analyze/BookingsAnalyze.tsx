import { useCallback, useEffect } from "react";
import "./analyze.component.scss";
import { SlNotebook } from "react-icons/sl";
import { CustomerAnalzIcon } from "../../../../lib/icons/Icons";
import { BsGraphUpArrow } from "react-icons/bs";
import { GiSandsOfTime } from "react-icons/gi";
import { useRestaurant } from "../../../../lib/hooks/useRestaurant";
import { useGenerateBookingAnalytics } from "../../../../lib/hooks/useGenerateBookingAnalytics";
import { useGetBookingAnalytics } from "../../../../lib/hooks/useGetBookingAnalytics";
import { useQueryClient } from "@tanstack/react-query";

const formatTime = (timeString: string): string => {
  const [hours, minutes] = timeString.split(":");
  return `${hours}:${minutes}`;
};

const BookingsAnalyze = () => {
  const queryClient = useQueryClient();
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0]; // "YYYY-MM-DD"

  const { data: restaurant } = useRestaurant();
  const restaurantId = restaurant?.[0]?.id;

  const { mutate: generateAnalytics } = useGenerateBookingAnalytics();
  
  const { data: analytics, refetch } = useGetBookingAnalytics(
    restaurantId
      ? { restaurantId, startDate: formattedDate, endDate: formattedDate }
      : { restaurantId: 0, startDate: formattedDate, endDate: formattedDate }
  );

   // Listen for new booking signals
   const newBookingSignal = queryClient.getQueryData(["new-booking-created"]);

  // Memoize the function that generates analytics and refetches
  const handleGenerateAndRefetch = useCallback(() => {
    if (restaurantId) {
      generateAnalytics(
        { restaurantId, date: formattedDate },
        {
          onSuccess: () => {
            refetch(); // refresh the analytics after posting
          },
        }
      );
    }
  }, [restaurantId, formattedDate, generateAnalytics, refetch]);

  // When restaurantId changes or a new booking is added, we generate and fetch the analytics again
  useEffect(() => {
    handleGenerateAndRefetch();
  }, [restaurantId,newBookingSignal, handleGenerateAndRefetch]);

  const todayData = analytics?.[0];

  return (
    <div className="section">
      <div className="total-bookings">
        <div className="icon-wrapper">
          <SlNotebook size={40} className="book-icon" />
        </div>
        <div className="content-wrapper">
          <span>Total Bookings</span>
          <strong>{todayData?.totalBookings ?? 0}</strong>
        </div>
      </div>
      <div className="avarage-cust">
        <CustomerAnalzIcon />
        <div className="content-wrapper">
          <span>Today's Customers</span>
          <strong>{todayData?.totalCust ?? 0}</strong>
        </div>
      </div>

      <div className="peak-hours">
        <div className="icon-wrapper">
          <BsGraphUpArrow size={40} className="peak-icon" />
        </div>
        <div className="content-wrapper">
          <span>Peak Hour</span>
          <strong>
            {todayData?.peakHour ? formatTime(todayData?.peakHour) : "--:--"}
          </strong>
        </div>
      </div>

      <div className="total-pendings">
        <div className="icon-wrapper">
          <GiSandsOfTime size={40} className="pending-icon" />
        </div>
        <div className="content-wrapper">
          <span>Total Pendings</span>
          <strong>{todayData?.pendingCount ?? 0}</strong>
        </div>
      </div>
    </div>
  );
};

export default BookingsAnalyze;
