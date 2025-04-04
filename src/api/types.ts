// LOGIN (AUTHTENTICATION) //
export interface LoginRequest { // types for api request
     email: string;
     password: string;
}


export interface LoginResponse { // types for api response
     message: string;
     token: string;
     user: User;
}

// USER TYPES //
export interface User {
     id: number;
     email: string;
     resetToken: string | null;
     createdAt: string;
     updatedAt: string;
}

//** FORGOT PASSWORD TYPES **//

export interface ForgotPwdRequest {
     email: string;
}

export interface ForgotPwdResponse {
     success: boolean;
     message: string;
}

//** CHANGE PWD TYPES **//

export interface PasswordResetRequest {
     newPassword: string;
     confirmPassword: string;
     token: string | null;
}

export interface PasswordResetResponse {
     success: string;
     message: string;
     error: string;
}


// USER RESTRAURANT DETAILS //
export interface Restaurant {
     id: number;
     name: string;
     websiteUrl: string;
     user_id: number;
     user?: {  // Marking user as optional
          id: number;
          email: string;
          resetToken: string | null;
          createdAt: string;
          updatedAt: string;
     };

}

// CUSTOMER DETAILS
export interface Customer {
     id: number;
     name: string;
     email: string;
     phone: number;
     restaurant_id: number;
}

export interface CustomerResponse {
     content: Customer[];
     totalPages: number;
}


// BOOKING TYPES //
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

export interface UpdateBookingPayload {
     id: number;
     updatedData: {
          date?: string;
          time?: string;
          num_people?: number;
          status?: string;
     };

}

export interface BookingsResponse {
     content: Bookings[];
     totalPages: number;
}


export interface SortedBookingProps {
     restaurantId: number;
     page: number;
     size: number;
     sortBy: string;
     direction: 'asc' | 'desc';
}






