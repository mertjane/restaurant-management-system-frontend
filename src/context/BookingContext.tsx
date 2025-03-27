import React, { createContext, useState, useEffect, useContext } from "react";
import { getBookings } from "../api/bookings";
import { Bookings } from "../api/types";
import { RestaurantContext } from "./RestaurantContext";

interface BookingContextType {
  bookings: Bookings[];
  totalPages: number;
  loading: boolean;
  error: string | null;
  fetchBookings: (page: number) => void;
}

export const BookingContext = createContext<BookingContextType | null>(null);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [bookings, setBookings] = useState<Bookings[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const restaurantContext = useContext(RestaurantContext);

  const fetchBookings = async (page: number) => {
    setLoading(true);
    setError(null); // Reset error state before fetching

    if (!restaurantContext?.restaurants || restaurantContext.restaurants.length === 0) {
      setError("No restaurants found. Please log in as a restaurant owner.");
      setLoading(false);
      return;
    }

    const restaurantId = restaurantContext.restaurants[0].id; // Access the first restaurant's ID
    try {
      const data = await getBookings(restaurantId, page, 15);
      setBookings(data.content);
      setTotalPages(data.totalPages);
    } catch (error: any) {
      console.error("Error fetching bookings:", error); // Debugging log
      setError("Failed to fetch bookings");
    } finally {
      setLoading(false); // Ensure loading is set to false after the request is finished
    }
  };

  useEffect(() => {
    if (restaurantContext?.restaurants && restaurantContext.restaurants.length > 0) {
      fetchBookings(currentPage);
    } else {
      console.log("Waiting for restaurant context...");
    }
  }, [currentPage, restaurantContext]); 



  return (
    <BookingContext.Provider
      value={{ bookings, totalPages, loading, error, fetchBookings }}
    >
      {children}
    </BookingContext.Provider>
  );
};
