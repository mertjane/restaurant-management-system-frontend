import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the user state
interface User {
  id: number;
  email: string;
  resetToken: string | null;
}

interface AuthState {
  token: string | null;
  user: User | null;
}

// Load token from localStorage if available
const storedToken = localStorage.getItem("token");
const storedUser = localStorage.getItem("user");

// Define the initial state
const initialState: AuthState = {
  token: storedToken ? storedToken : null,
  user: storedUser ? JSON.parse(storedUser) : null,
};


// Create the authSlice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set user and token in the state and localStorage
    setUser: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      if (action.payload.token) {
        localStorage.setItem("token", action.payload.token);  // Store token in localStorage
      }
      localStorage.setItem("user", JSON.stringify(action.payload.user));  // Store user in localStorage
    },

    // Log out user by clearing state and localStorage
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },

});

// Export actions to use in components
export const { setUser, logout } = authSlice.actions;


export default authSlice.reducer;
