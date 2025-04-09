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