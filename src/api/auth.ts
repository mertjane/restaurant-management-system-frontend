import axios from "axios";
import { ForgotPwdRequest, ForgotPwdResponse, LoginRequest, LoginResponse, PasswordResetRequest, PasswordResetResponse } from "./types";
import * as dotenv from 'dotenv';

dotenv.config();



/* LOGIN API REQUEST WITH AXIOS */
export const loginUser = async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
        const res = await axios.post<LoginResponse>(`${process.env.API_BASE_URL}/login`, credentials, {
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
        const res = await axios.post<ForgotPwdResponse>(`${process.env.API_BASE_URL}/forgot-password`, credentials, {
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
            `${process.env.API_BASE_URL}/reset-password`, 
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





