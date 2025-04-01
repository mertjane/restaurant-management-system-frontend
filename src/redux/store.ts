import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { restaurantSlice } from "./slices/restaurantSlice";
import { customerSlice } from "./slices/customerSlice";
import { bookingSlice } from "./slices/bookingSlice";


export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        restaurant: restaurantSlice.reducer,
        customers: customerSlice.reducer,
        bookings: bookingSlice.reducer
    },
});


// Typescript types for the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;