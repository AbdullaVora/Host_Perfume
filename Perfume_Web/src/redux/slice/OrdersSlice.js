import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import apiInstance from "@/api/instance";

const API_URL = '/api/dashboard';

// Async thunk for fetching orders
export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiInstance.get(`${API_URL}/getOrders`);
            console.log("Orders fetch success");
            return response.data.orders;
        } catch (error) {
            console.error(error.message);
            return rejectWithValue(error.message);
        }
    }
);

// Async thunk for deleting an order
export const deleteOrder = createAsyncThunk(
    'orders/deleteOrder',
    async (orderId, { rejectWithValue }) => {
        try {
            const response = await apiInstance.delete(`${API_URL}/deleteOrder/${orderId}`);
            console.log("Order delete success");
            return orderId; // Return the deleted order ID
        } catch (error) {
            console.error(error.message);
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    orders: [],
    loading: false,
    error: null
};

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        // You can add regular reducers here if needed
    },
    extraReducers: (builder) => {
        builder
            // Fetch orders cases
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
                state.error = null;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delete order cases
            .addCase(deleteOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.loading = false;
                // Remove the deleted order from the orders array
                state.orders = state.orders.filter(order => order.id !== action.payload);
                state.error = null;
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default orderSlice.reducer;