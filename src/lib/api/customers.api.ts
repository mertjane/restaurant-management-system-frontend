
import axios from "axios";
import { CustomerAnalyticsData, CustomerResponse, GetCustomerAnalyticsParams } from "../types/customers.types";
import { BASE_URL } from "./_instances";



/**
 * Get Customers by user id (restauran's admin)
 * @param userId
 * @param page
 * @param size 
 * @response data.content[] 
 */

export const getCustomersByUserId = async ({
  userId,
  page,
  size,
}: { userId: number, page: number, size: number }): Promise<CustomerResponse> => {
  try {
    const response = await axios.get(`${BASE_URL}/customers/user/${userId}`, {
      params: { page, size },
    });
    console.log("Fetched customers:", response.data);
    return response.data;
  } catch (error: any) {
    throw console.error(error.response?.data?.message || "Failed to fetching customers.")
  }
};


/**
 * Search customers by name api call
 * @param searchTerm
 * @page page
 * @param size 
 * @response data.content[]
 */

interface SearchCustomerParams {
  restaurantId: number;
  searchTerm?: string;
  page: number;
  size: number;
}


export const searchCustomerByName = async ({
  restaurantId,
  searchTerm,
  page,
  size,
}: SearchCustomerParams): Promise<CustomerResponse> => {
  try {
    const params = new URLSearchParams();
    if (searchTerm) params.append("searchTerm", searchTerm);
    params.append("page", page.toString());
    params.append("size", size.toString());

    const response = await axios.get<CustomerResponse>(
      `${BASE_URL}/customers/restaurant/${restaurantId}/search?${params.toString()}`
    );

    return response.data;
  } catch (error: any) {
    console.error("Error fetching customers by name:", error);
    throw error;
  }
};


/**
 * Sort Customers name, id and date ascending or descending
 * @param restaurantId
 * @param page
 * @param size
 * @param sortby
 * @desc&asc
 */

interface SortCustomersParams {
  userId: number;
  page: number;
  size: number;
  sortBy: 'name' | 'id' | 'createdAt';
  direction: 'asc' | 'desc';
}


export const sortCustomers = async ({
  userId,
  page,
  size,
  sortBy,
  direction,
}: SortCustomersParams): Promise<CustomerResponse> => {
  const response = await axios.get<CustomerResponse>(
    `${BASE_URL}/customers/user/${userId}`,
    {
      params: {
        page,
        size,
        sort: `${sortBy},${direction}`,
      },
    }
  );
  return response.data;
};


export const postCustomerAnalytics = async (
  params: GetCustomerAnalyticsParams
): Promise<CustomerAnalyticsData> => {
  try {
    const { restaurantId, currentMonth } = params;
    const response = await axios.post<CustomerAnalyticsData>(
      `${BASE_URL}/analytics-customers/calculate?restaurantId=${restaurantId}&currentMonth=${currentMonth}`
    );
    return response.data;
  } catch (error: any) {
    console.error('Error generating customer analytics:', error);
    throw error;
  }
};


export const getCustomerAnalytics = async (
  params: GetCustomerAnalyticsParams
): Promise<CustomerAnalyticsData> => {
  try {
    const { restaurantId, currentMonth } = params;
    const response = await axios.get<CustomerAnalyticsData>(
      `${BASE_URL}/analytics-customers/get?restaurantId=${restaurantId}&currentMonth=${currentMonth}`
    );
    return response.data;
  } catch (error: any) {
    console.error('Error fetching customer analytics:', error);
    throw error;
  }
};



