import { BookingAnalyticsData, GetBookingAnalyticsParams, UpdateBookingPayload } from './../types/booking.types';
import axios from "axios";
import { BookingResponse, Bookings, NewBookings } from "../types/booking.types";
import { BASE_URL } from './_instances';

/**
 * Get Bookings by restaurantId (restauran's admin)
 * @param restaurantId
 * @param page
 * @param size 
 * @response data.content[] 
*/

export const getBookingsByRestaurantId = async ({
  restaurantId,
  page,
  size
}: { restaurantId: number, page: number, size: number }): Promise<BookingResponse> => {
  try {
    const response = await axios.get(`${BASE_URL}/bookings/restaurant/${restaurantId}`, {
      params: { page, size },
    })
    return response.data;
  } catch (error: any) {
    throw console.error(error.response?.data?.message || "Failed to fetch bookings.")
  }
}

/**
 * Search bookings by name api call
 * @param searchTerm
 * @page page
 * @param size 
 * @response data.content[]
 */

interface SearchBookingParams {
  restaurantId: number;
  searchTerm?: string;
  page: number;
  size: number;
}

export const searchBookingsByName = async ({
  restaurantId,
  searchTerm,
  page,
  size,
}: SearchBookingParams): Promise<BookingResponse> => {
  try {
    const params = new URLSearchParams();
    if (searchTerm) params.append("searchTerm", searchTerm);
    params.append("page", page.toString());
    params.append("size", size.toString());

    const response = await axios.get<BookingResponse>(
      `${BASE_URL}/bookings/restaurant/${restaurantId}/search?${params.toString()}`
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching bookings by name:", error);
    throw error;
  }
}


/**
 * Sort Bookings By Name and Date ascending or descending
 * @param restaurantId
 * @param page
 * @Size size 
 * @param sortby 
 * @desc & asc
 * @param customSort
 */

interface SortBookingsParams {
  restaurantId: number;
  page: number;
  size: number;
  sortBy: 'customer.name' | 'date';
  direction: 'asc' | 'desc';
  customSort?: 'today_to_future';
}

export const sortBookings = async ({
  restaurantId,
  page,
  size,
  sortBy,
  direction,
  customSort,
}: SortBookingsParams): Promise<BookingResponse> => {
  try {
    const params: any = {
      page,
      size,
    };

    if (customSort) {
      params.sortType = customSort;
    } else if (sortBy && direction) {
      params.sort = `${sortBy},${direction}`;
    }
    const endpoint = customSort
      ? `${BASE_URL}/bookings/restaurant/${restaurantId}/sorted`
      : `${BASE_URL}/bookings/restaurant/${restaurantId}`;

    const response = await axios.get<BookingResponse>(
      endpoint, { params }
    );

    return response.data;

  } catch (error: any) {
    console.error("Error sorting bookings:", error);
    throw error;
  }
}



/**
 * Filter Bookings by date range, time range and status
 * @param restaurantId, status, startTime, endTime, startDate, endDate, page, size
 */


interface FilterBookingParams {
  restaurantId: number;
  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  status?: string;
  page: number;
  size: number;
}

export const filterBookings = async ({
  restaurantId,
  startDate,
  endDate,
  startTime,
  endTime,
  status,
  page,
  size,
}: FilterBookingParams): Promise<BookingResponse> => {
  try {
    const response = await axios.get<BookingResponse>(
      `${BASE_URL}/bookings/restaurant/${restaurantId}/filter`,
      {
        params: {
          startDate,
          endDate,
          startTime,
          endTime,
          status,
          page,
          size,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error filtering bookings:", error);
    throw error;
  }
};


/**
 * Create a new booking
 * @param {number} restaurantId 
 * @param {Bookings} bookingData 
 * @returns {Promise<Bookings>} 
 * @throws {string} 
 */

export const createBooking = async ({
  restaurantId,
  bookingData
}: {
  restaurantId: number;
  bookingData: NewBookings;
}): Promise<Bookings> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/bookings/restaurant/${restaurantId}/create-new-booking`,
      bookingData
    );
    return response.data;
  } catch (error: any) {
    throw console.error(error.response?.data?.message || "Failed to create booking.")
  }
}


/**
 * Update existing booking 
 * @param id
 * @body updatedBookingPayload
 * @return {Promise<Bookings>}
 * @throws {string}
 */

export const updateBookingById = async (
  id: number,
  UpdateBookingPayload: Partial<Bookings>
): Promise<Bookings> => {
  try {
    const response = await axios.patch(`${BASE_URL}/bookings/${id}`, UpdateBookingPayload, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    return response.data;
  } catch (error: any) {
    throw console.error(error.response?.data?.message || "Failed to update booking.")
  }
}


/**
 * Get bookings analytics 
 */

export interface GenerateBookingAnalyticsParams {
  restaurantId: number;
  date: string; // ISO format (e.g., "2025-04-01")
}


export const generateBookingAnalytics = async ({
  restaurantId,
  date,
}: GenerateBookingAnalyticsParams): Promise<BookingAnalyticsData> => {
  try {
    const response = await axios.post<BookingAnalyticsData>(
      `${BASE_URL}/analytics/bookings/generate`,
      null,
      {
        params: { restaurantId, date },
      }
    );
    return response.data;
  } catch (error: any) {
    throw console.error(error.response?.data?.message || "Failed to generate booking analytics.")
  }
};





export const getBookingAnalyticsBetween = async ({
  restaurantId,
  startDate,
  endDate,
}: GetBookingAnalyticsParams): Promise<BookingAnalyticsData[]> => {
  try {
    const response = await axios.get<BookingAnalyticsData[]>(
      `${BASE_URL}/analytics`,
      {
        params: { restaurantId, startDate, endDate },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Analytics fetch failed:", error.response?.data?.message);
    throw new Error(error.response?.data?.message || "Failed to fetch generated booking analytics.");
  }
};

