import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCustomers } from "../../api/customers";
import { Customer, CustomerResponse } from "../../api/types";


interface CustomerState {
    content: Customer[]; // Should be an array
    totalPages: number;
    loading: boolean;
    error: string | null;
}

const initialState: CustomerState = {
    content: [], // Ensure it's initialized as an array
    totalPages: 0,
    loading: false,
    error: null,
};



export const customerSlice = createSlice({
    name: "customers",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCustomers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getCustomers.fulfilled,
                (state, action: PayloadAction<CustomerResponse>) => {
                    // Make sure you're accessing the 'content' array from the response
                    state.content = Array.isArray(action.payload.content)
                        ? action.payload.content
                        : []; // Ensure it's an array
                    state.totalPages = action.payload.totalPages;
                    state.loading = false;
                }
            )
            .addCase(getCustomers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch customers";
            });
    },

})


export default customerSlice.reducer;