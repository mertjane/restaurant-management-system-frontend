export interface Bookings {
  id: number;
  date?: string;
  time: string;
  numPeople: number;
  status: string;
  customer?: {
    id: number;
    name: string;
    email: string;
    phone: string;
  }
}

export interface BookingRequest {
  restaurantId: number;
  page: number;
  size: number;
}

export interface BookingResponse {
  content: Bookings[];
  totalPages: number;
  totalElements: number;
}

export interface UpdateBookingPayload {
  id: number;
  updatedData: {
    date?: string;
    time?: string;
    num_people?: number;
    status?: string;
  };
}

export type NewBookings = Omit<Bookings, "id" | "customer"> & {
  customer: Omit<NonNullable<Bookings["customer"]>, "id">;
  num_people: number;  
};


export interface BookingAnalyticsData {
  restaurantId?: number;
  date: string;
  totalBookings: number;
  totalCust: number;
  cancelledCount: number;
  confirmedCount: number;
  pendingCount: number;
  peakHour: string;
}


export interface GetBookingAnalyticsParams {
  restaurantId: number;
  startDate: string; // ISO format
  endDate: string;   // ISO format
}
