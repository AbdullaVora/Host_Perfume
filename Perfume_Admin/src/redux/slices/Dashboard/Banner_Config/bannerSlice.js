import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../../api/instance';

// Base URL for API requests
const API_URL = '/api/dashboard'; // Update this with your actual API endpoint

// Async thunk for fetching all banners
export const fetchBanners = createAsyncThunk(
  'banners/fetchBanners',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/banners`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for adding a new banner
export const addBanner = createAsyncThunk(
  'banners/addBanner',
  async (bannerData, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/addBanner`, bannerData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for updating a banner
export const updateBanner = createAsyncThunk(
  'banners/updateBanner',
  async ({ id, bannerData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`${API_URL}/updateBanner/${id}`, bannerData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for deleting a banner
export const deleteBanner = createAsyncThunk(
  'banners/deleteBanner',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`${API_URL}/deleteBanner/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  banners: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  currentBanner: null,
  loading: false,
};

const bannerSlice = createSlice({
  name: 'banners',
  initialState,
  reducers: {
    setCurrentBanner: (state, action) => {
      state.currentBanner = action.payload;
    },
    clearCurrentBanner: (state) => {
      state.currentBanner = null;
    },
    resetStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch banners
      .addCase(fetchBanners.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        state.banners = action.payload;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch banners';
      })
      
      // Add banner
      .addCase(addBanner.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(addBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        state.banners.push(action.payload.data);
      })
      .addCase(addBanner.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.payload || 'Failed to add banner';
      })
      
      // Update banner
      .addCase(updateBanner.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(updateBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        const index = state.banners.findIndex(banner => banner.id === action.payload.id);
        if (index !== -1) {
          state.banners[index] = action.payload;
        }
      })
      .addCase(updateBanner.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.payload || 'Failed to update banner';
      })
      
      // Delete banner
      .addCase(deleteBanner.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(deleteBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        state.banners = state.banners.filter(banner => banner.id !== action.payload);
      })
      .addCase(deleteBanner.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.payload || 'Failed to delete banner';
      });
  }
});

export const { setCurrentBanner, clearCurrentBanner, resetStatus } = bannerSlice.actions;

export default bannerSlice.reducer;
