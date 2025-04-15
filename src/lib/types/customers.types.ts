export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: number;
  createdAt: string;
  restaurant_id: number;
}

export interface CustomerRequest {
  userId: number;
  page: number;
  size: number;
}

export interface CustomerResponse {
  content: Customer[];
  totalPages: number;
  totalElements: number;
}

export interface CustomerAnalyticsData {
  id: string;
  restaurantId: number;
  date: string;
  totalCusts: number;
  newCusts: number;
  totalCustsChange: number;
  newCustsChange: number;
  peakDay: string;

}


export interface GetCustomerAnalyticsParams {
  restaurantId: number;
  currentMonth: string; // YYYY-MM
}