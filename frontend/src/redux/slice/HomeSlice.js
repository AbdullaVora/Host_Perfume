import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Home from "../../data/Home";
import apiInstance from "@/api/instance";

const API_URL = '/api/dashboard';

const initialState = {
    Home: { ...Home, banners: [], sliders: [], products: [] },
    loading: false,
    error: null,
}

// Async thunk for fetching all banners
export const fetchBanners = createAsyncThunk(
    'banners/fetchBanners',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiInstance.get(`${API_URL}/banners`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for fetching all sliders
export const fetchSliders = createAsyncThunk(
    'banners/fetchSliders',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiInstance.get(`${API_URL}/sliders`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchProducts = createAsyncThunk(
    'banners/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiInstance.get(`${API_URL}/products`);
            console.log("data:" ,response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);



const HomeSlice = createSlice({
    name: "Home",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBanners.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBanners.fulfilled, (state, action) => {
                state.loading = false;
                state.Home.banners = action.payload;
            })
            .addCase(fetchBanners.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchSliders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSliders.fulfilled, (state, action) => {
                state.loading = false;
                state.Home.sliders = action.payload;
            })
            .addCase(fetchSliders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.Home.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default HomeSlice.reducer;