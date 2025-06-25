import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../api/instance";

const API_URL = `${import.meta.env.VITE_API_URL}/api/dashboard`;

// ✅ Fetch All Payment Methods
export const fetchPaymentMethods = createAsyncThunk(
    "paymentMethod/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(`${API_URL}/paymentMethods`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch payment methods");
        }
    }
);

// ✅ Create a New Payment Method
export const createPaymentMethod = createAsyncThunk(
    "paymentMethod/create",
    async (paymentData, { rejectWithValue }) => {
        try {
            const response = await api.post(`${API_URL}/addPaymentMethods`, paymentData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to create payment method");
        }
    }
);

// ✅ Update an Existing Payment Method
export const updatePaymentMethod = createAsyncThunk(
    "paymentMethod/update",
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const response = await api.put(`${API_URL}/updatePaymentMethods/${id}`, updatedData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to update payment method");
        }
    }
);

// ✅ Delete a Payment Method
export const deletePaymentMethod = createAsyncThunk(
    "paymentMethod/delete",
    async (id, { rejectWithValue }) => {
        try {
            await api.delete(`${API_URL}/deletePaymentMethods/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to delete payment method");
        }
    }
);

// 🔥 Payment Method Slice
const paymentMethodSlice = createSlice({
    name: "paymentMethod",
    initialState: {
        paymentMethods: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPaymentMethods.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPaymentMethods.fulfilled, (state, action) => {
                state.loading = false;
                state.paymentMethods = action.payload;
            })
            .addCase(fetchPaymentMethods.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createPaymentMethod.fulfilled, (state, action) => {
                state.paymentMethods.push(action.payload);
            })
            .addCase(updatePaymentMethod.fulfilled, (state, action) => {
                const updatedPayment = action.payload;
                const index = state.paymentMethods.findIndex(pm => pm._id === updatedPayment._id);
                if (index !== -1) {
                    state.paymentMethods[index] = updatedPayment;
                }
            })
            .addCase(deletePaymentMethod.fulfilled, (state, action) => {
                state.paymentMethods = state.paymentMethods.filter(pm => pm._id !== action.payload);
            });
    },
});

// ✅ Export Reducer
export default paymentMethodSlice.reducer;
