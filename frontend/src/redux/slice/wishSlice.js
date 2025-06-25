import apiInstance from '@/api/instance';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/api/e-commerce'; // Adjust based on your API endpoint

// Async Thunks
export const addToWishlist = createAsyncThunk(
    'wish/addToWishlist',
    async ({ userId, product }, { rejectWithValue }) => {
        try {
            const response = await apiInstance.post(`${API_URL}/wish`, { userId, product });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getUserWishlist = createAsyncThunk(
    'wish/getUserWishlist',
    async (_, { rejectWithValue }) => {
        try {
            console.trace("wish")
            const response = await apiInstance.get(`${API_URL}/getWish`);
            // console.log(response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const removeFromWishlist = createAsyncThunk(
    'wish/removeFromWishlist',
    async (id, { rejectWithValue }) => {
        try {
            console.log(id)
            await apiInstance.delete(`${API_URL}/deleteWish/${id}`);
            return wishId;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const checkWishlistItem = createAsyncThunk(
    'wish/checkWishlistItem',
    async ({ userId, productId }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/check/${userId}/${productId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Slice
const wishSlice = createSlice({
    name: 'wish',
    initialState: {
        wishList: [],
        loading: false,
        error: null,
        checking: {},
    },
    reducers: {
        resetWish: (state) => {
            state.wishList = [];
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Add to wishlist
            .addCase(addToWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.wishList.push(action.payload);
            })
            .addCase(addToWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to add to wishlist';
            })

            // Get user wishlist
            .addCase(getUserWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.wishList = action.payload;
            })
            .addCase(getUserWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to fetch wishlist';
            })

            // Remove from wishlist
            .addCase(removeFromWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFromWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.wishList = state.wishList.filter(item => item._id !== action.payload);
            })
            .addCase(removeFromWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to remove from wishlist';
            })

            // Check wishlist item
            .addCase(checkWishlistItem.pending, (state, action) => {
                const { productId } = action.meta.arg;
                state.checking[productId] = true;
            })
            .addCase(checkWishlistItem.fulfilled, (state, action) => {
                const { productId } = action.meta.arg;
                state.checking[productId] = false;
                // You might want to store this info in your state
            })
            .addCase(checkWishlistItem.rejected, (state, action) => {
                const { productId } = action.meta.arg;
                state.checking[productId] = false;
            });
    },
});

// Export actions
export const { resetWish } = wishSlice.actions;

// Export reducer
export default wishSlice.reducer;