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
    website_url: string;
}

// CUSTOMER DETAILS 
export interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
}

export interface CustomerResponse {
    content: Customer[];
    totalPages: number;
}
  

// BOOKING TYPES //
export interface Bookings {
    id: number;
    date: Date;
    time: string;
    numPeople: number;
    status: string;
    customer: {
        name: string;
        email: string
    }

}

export interface BookingsResponse {
    content: Bookings[];
    totalPages: number;
}