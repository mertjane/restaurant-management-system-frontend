import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Restaurant } from "../../api/types";
import { getRestaurant } from "../../api/restaurant";


// Define the state type
interface RestaurantState {
    id: number | null;
    name: string | null;
    websiteUrl: string | null;
    user_id: number | null;
    loading: boolean;
    error: string | null;
}

// Initialize state
const initialState: RestaurantState = {
    id: null,
    name: null,
    websiteUrl: null,
    user_id: null,
    loading: false,
    error: null
};


export const restaurantSlice = createSlice({
    name: "restaurant",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRestaurant.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getRestaurant.fulfilled, (state, action: PayloadAction<Restaurant[]>) => {
                if (action.payload.length > 0) {
                    const { user, websiteUrl, ...filteredRestaurant } = action.payload[0]; // Now 'user' is properly recognized
                    state.id = filteredRestaurant.id;
                    state.name = filteredRestaurant.name;
                    state.websiteUrl = websiteUrl;
                    state.user_id = user ? user.id : null;
                } else {
                    state.id = null;
                    state.name = null;
                    state.websiteUrl = null;
                    state.user_id = null;
                }
                state.loading = false;
            })
            .addCase(getRestaurant.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Failed to fetch restaurant";
            });
    },

})


export default restaurantSlice.reducer;