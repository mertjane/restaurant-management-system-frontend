/**
 * Auth API module
 * @module auth.api 
 * This module provides functions to interact with the authentication API.
 * It includes functions to login, logout, and check the authentication status of a user.
 * It also provides a function to get the current user information.
 * @requires axios
 * @requires react-query
 */


import axios from "axios";
import { ForgotPwdRequest, ForgotPwdResponse, LoginResponse, PasswordResetRequest, PasswordResetResponse } from "../types/auth.types";
const BASE_URL = "http://localhost:8080";

/**
 * Function to check if the user is authenticated
 * @returns {Promise<boolean>} - A promise that resolves to true if the user is authenticated, false otherwise.
 * @param email 
 * @param password 
 * @returns 
 */


export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(`${BASE_URL}/auth/login`, { email, password });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Login failed");
    } else {
      throw new Error("Network error");
    }
  }
}


/**
 * @function forgotPwd
 * @description Sends a password reset request to the server.
 * @param {ForgotPwdRequest} credentials - The email address of the user requesting a password reset.
 * @returns {Promise<ForgotPwdResponse>} - A promise that resolves to the response from the server.
 * @throws {Error} - Throws an error if the request fails.
 */


export const forgotPwd = async (credentials: ForgotPwdRequest): Promise<ForgotPwdResponse> => {
  try {
    const res = await axios.post<ForgotPwdResponse>(`${BASE_URL}/auth/forgot-password`, credentials, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to process request. Please try again.")
  }
}


/**
 * @function render change password page
 * @description Renders the change password page for the user to enter a new password.
 * @param {string} resetToken - The password reset token sent to the user's email.
 * @throws {Error} - Throws an error if the password change fails.
 */

export const validateResetToken = async (resetToken: string): Promise<void> => {
  try {
    const res = await axios.get(`${BASE_URL}/auth/reset-password`, {
      params: { token: resetToken },
    });
    return res.data;

  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Invalid reset token. Please try again.")
  }
}


/**
 * @function changePwd
 * @description Changes the user's password using the provided reset token and new password.
 * @param {string} resetToken - The password reset token sent to the user's email.
 * @body {string} newPassword - The new password to set for the user.
 * @body {string} confirmPassword - The new password to set for the user.
 * @returns {Promise<void>} - A promise that resolves when the password is successfully changed.
 * @throws {Error} - Throws an error if the password change fails.
 */

export const changePwd = async (credentials: PasswordResetRequest): Promise<PasswordResetResponse> => {
  try {
    const res = await axios.post<PasswordResetResponse>(
      `${BASE_URL}/auth/reset-password`,
      { // Send only newPassword and confirmPassword in the body
        newPassword: credentials.newPassword,
        confirmPassword: credentials.confirmPassword,
      },
      {
        headers: { "Content-Type": "application/json" },
        params: { token: credentials.token }, // Send token as a query parameter
      }
    );
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to process request. Please try again.");
  }
};
