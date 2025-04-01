import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUser } from "../../api/auth";

interface AuthState {
    token: string | null;
    user: {
        id: number;
        email: string;
        resetToken: string | null;
        createdAt: string;
        updatedAt: string;
    } | null;
    loading: boolean;
    error: string | null;
}

// Load token from localStorage if available
const storedToken = localStorage.getItem("token");
const storedUser = localStorage.getItem("user");


const initialState: AuthState = {
    token: storedToken ? storedToken : null,
    user: storedUser ? JSON.parse(storedUser) : null,
    loading: false,
    error: null,
};



export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ token: string; user: AuthState["user"] }>) => {
                state.token = action.payload.token;
                state.user = action.payload.user;
                state.loading = false;
                state.error = null;

                // Store token in localStorage
                localStorage.setItem("token", action.payload.token);
                localStorage.setItem("user", JSON.stringify(action.payload.user));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },

});


export const { logout } = authSlice.actions;
export default authSlice.reducer;

