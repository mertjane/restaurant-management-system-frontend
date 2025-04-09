/**
 * Authentication Request and Response Types
 * These types are used for the API request and response when a user logs in.
 * The LoginRequest type defines the structure of the request body, while the LoginResponse type defines the structure of the response body.
 */

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    resetToken: string | null;
  }
}

/**
 * Forgot Password Request and Response Types
 * These types are used for the API request and response when a user requests a password reset.
 */

export interface ForgotPwdRequest {
  email: string;
}

export interface ForgotPwdResponse {
  success: boolean;
  message: string;
}


/**
 * Password Reset Request and Response Types
 * These types are used for the API request and response when a user resets their password.
 */

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