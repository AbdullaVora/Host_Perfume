import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../api/instance";

const API_URL = `${import.meta.env.VITE_API_URL}/api/dashboard`; // Your actual API endpoint

// ✅ Fetch All Brands
export const fetchBrands = createAsyncThunk("brands/fetchAll", async (_, { rejectWithValue }) => {
    try {
        const response = await api.get(`${API_URL}/brands`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch brands");
    }
});

// ✅ Create a New Brand
export const createBrand = createAsyncThunk("brands/create", async (brandData, { rejectWithValue }) => {
    try {
        const response = await api.post(`${API_URL}/addBrand`, brandData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to create brand");
    }
});

// ✅ Update an Existing Brand
export const updateBrand = createAsyncThunk("brands/update", async ({ id, updatedData }, { rejectWithValue }) => {
    try {
        const response = await api.put(`${API_URL}/updateBrand/${id}`, updatedData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to update brand");
    }
});

// ✅ Delete a Brand
export const deleteBrand = createAsyncThunk("brands/delete", async (id, { rejectWithValue }) => {
    try {
        await api.delete(`${API_URL}/deleteBrand/${id}`);
        return id; // Return the ID to remove it from Redux state
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to delete brand");
    }
});

// 🔥 Brand Slice
const brandSlice = createSlice({
    name: "brands",
    initialState: {
        brands: [],
        loading: false,
        error: null,
    },
    reducers: {}, // No synchronous reducers needed
    extraReducers: (builder) => {
        builder
            // ✅ Handle Fetch
            .addCase(fetchBrands.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBrands.fulfilled, (state, action) => {
                state.loading = false;
                state.brands = action.payload;
            })
            .addCase(fetchBrands.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // ✅ Handle Create
            .addCase(createBrand.fulfilled, (state, action) => {
                state.brands.push(action.payload);
            })
            // ✅ Handle Update
            .addCase(updateBrand.fulfilled, (state, action) => {
                const updatedBrand = action.payload;
                const index = state.brands.findIndex(brand => brand._id === updatedBrand._id);
                if (index !== -1) {
                    state.brands[index] = {
                        ...updatedBrand,
                        isFeatured: state.brands[index].isFeatured || false, // Preserve any additional properties
                    };
                }
            })
            // ✅ Handle Delete
            .addCase(deleteBrand.fulfilled, (state, action) => {
                state.brands = state.brands.filter(brand => brand._id !== action.payload);
            });
    },
});

// ✅ Export Reducer
export default brandSlice.reducer;
