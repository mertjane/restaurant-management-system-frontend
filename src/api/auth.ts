import axios from "axios";
import { ForgotPwdRequest, ForgotPwdResponse, LoginRequest, LoginResponse, PasswordResetRequest, PasswordResetResponse } from "./types";



/* LOGIN API REQUEST WITH AXIOS */
export const loginUser = async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
        const res = await axios.post<LoginResponse>(`${import.meta.env.VITE_API_URL}/login`, credentials, {
            headers: {"Content-Type": "application/json"},
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Invalid Email or Password");
    }
}

/* FORGOT PASSWORD TRIGGER */

export const forgotPwd = async (credentials: ForgotPwdRequest): Promise<ForgotPwdResponse> => {
    try {
        const res = await axios.post<ForgotPwdResponse>(`${import.meta.env.VITE_API_URL}/forgot-password`, credentials, {
            headers: {"Content-Type": "application/json"},
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to process request. Please try again.")
    }
}


/* CHANGE PASSWORD SUCCESS */

export const changePwd = async (credentials: PasswordResetRequest): Promise<PasswordResetResponse> => {
    try {
        const res = await axios.post<PasswordResetResponse>(
            `${import.meta.env.VITE_API_URL}/reset-password`, 
            { // Send only newPassword and confirmPassword in the body
                newPassword: credentials.newPassword,
                confirmPassword: credentials.confirmPassword,
            }, 
            {
                headers: {"Content-Type": "application/json"},
                params: { token: credentials.token }, // Send token as a query parameter
            }
        );
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to process request. Please try again.");
    }
};





