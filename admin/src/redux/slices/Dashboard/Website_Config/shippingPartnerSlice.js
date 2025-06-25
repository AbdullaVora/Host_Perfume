import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../api/instance";

const API_URL = `${import.meta.env.VITE_API_URL}/api/dashboard`;

// ✅ Fetch All Shipping Partners
export const fetchShippingPartners = createAsyncThunk(
    "shippingPartner/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(`${API_URL}/shippingPartners`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch shipping partners");
        }
    }
);

// ✅ Create a New Shipping Partner
export const createShippingPartner = createAsyncThunk(
    "shippingPartner/create",
    async (partnerData, { rejectWithValue }) => {
        try {
            const response = await api.post(`${API_URL}/addShippingPartners`, partnerData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to create shipping partner");
        }
    }
);

// ✅ Update an Existing Shipping Partner
export const updateShippingPartner = createAsyncThunk(
    "shippingPartner/update",
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const response = await api.put(`${API_URL}/updateShippingPartners/${id}`, updatedData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to update shipping partner");
        }
    }
);

// ✅ Delete a Shipping Partner
export const deleteShippingPartner = createAsyncThunk(
    "shippingPartner/delete",
    async (id, { rejectWithValue }) => {
        try {
            await api.delete(`${API_URL}/deleteShippingPartners/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to delete shipping partner");
        }
    }
);

// 🔥 Shipping Partner Slice
const shippingPartnerSlice = createSlice({
    name: "shippingPartner",
    initialState: {
        shippingPartners: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        
            .addCase(fetchShippingPartners.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchShippingPartners.fulfilled, (state, action) => {
                state.loading = false;
                state.shippingPartners = action.payload;
            })
            .addCase(fetchShippingPartners.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createShippingPartner.fulfilled, (state, action) => {
                state.shippingPartners.push(action.payload);
            })
            .addCase(updateShippingPartner.fulfilled, (state, action) => {
                const updatedPartner = action.payload;
                const index = state.shippingPartners.findIndex(sp => sp._id === updatedPartner._id);
                if (index !== -1) {
                    state.shippingPartners[index] = updatedPartner;
                }
            })
            
            .addCase(deleteShippingPartner.fulfilled, (state, action) => {
                state.shippingPartners = state.shippingPartners.filter(sp => sp._id !== action.payload);
            });
    },
});

export default shippingPartnerSlice.reducer;