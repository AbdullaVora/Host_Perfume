import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../../api/instance';

// Base API URL for coupon management
const API_URL = '/api/dashboard';

// ✅ Fetch all coupons
export const fetchCoupons = createAsyncThunk(
  'coupons/fetchCoupons',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/coupons`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ✅ Add a new coupon
export const addCoupon = createAsyncThunk(
  'coupons/addCoupon',
  async (couponData, { rejectWithValue }) => {
    try {
      console.log(couponData)
      const response = await api.post(`${API_URL}/addCoupon`, couponData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ✅ Update a coupon
export const updateCoupon = createAsyncThunk(
  'coupons/updateCoupon',
  async ({ id, couponData }, { rejectWithValue }) => {
    console.log(couponData)
    try {
      const response = await api.put(`${API_URL}/updateCoupon/${id}`, couponData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ✅ Delete a coupon
export const deleteCoupon = createAsyncThunk(
  'coupons/deleteCoupon',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`${API_URL}/deleteCoupon/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ✅ Initial State
const initialState = {
  coupons: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  currentCoupon: null,
  laoding: false
};

// ✅ Slice Creation
const couponSlice = createSlice({
  name: 'coupons',
  initialState,
  reducers: {
    setCurrentCoupon: (state, action) => {
      state.currentCoupon = action.payload;
    },
    clearCurrentCoupon: (state) => {
      state.currentCoupon = null;
    },
    resetStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Coupons
      .addCase(fetchCoupons.pending, (state) => {
        state.laoding = true;
        state.status = 'loading';
      })
      .addCase(fetchCoupons.fulfilled, (state, action) => {
        state.laoding = false;
        state.status = 'succeeded';
        state.coupons = action.payload;
      })
      .addCase(fetchCoupons.rejected, (state, action) => {
        state.laoding = false;
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch coupons';
      })
      
      // Add Coupon
      .addCase(addCoupon.pending, (state) => {
        state.laoding = true;
        state.status = 'loading';
      })
      .addCase(addCoupon.fulfilled, (state, action) => {
        state.laoding = false;
        state.status = 'succeeded';
        state.coupons.push(action.payload);
      })
      .addCase(addCoupon.rejected, (state, action) => {
        state.laoding = false;
        state.status = 'failed';
        state.error = action.payload || 'Failed to add coupon';
      })
      
      // Update Coupon
      .addCase(updateCoupon.pending, (state) => {
        state.laoding = true;
        state.status = 'loading';
      })
      .addCase(updateCoupon.fulfilled, (state, action) => {
        state.laoding = false;
        state.status = 'succeeded';
        const index = state.coupons.findIndex(coupon => coupon._id === action.payload._id);
        if (index !== -1) {
          state.coupons[index] = action.payload;
        }
      })
      .addCase(updateCoupon.rejected, (state, action) => {
        state.laoding = false;
        state.status = 'failed';
        state.error = action.payload || 'Failed to update coupon';
      })
      
      // Delete Coupon
      .addCase(deleteCoupon.pending, (state) => {
        state.laoding = true;
        state.status = 'loading';
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.laoding = false;
        state.status = 'succeeded';
        state.coupons = state.coupons.filter(coupon => coupon._id !== action.payload);
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.laoding = false;
        state.status = 'failed';
        state.error = action.payload || 'Failed to delete coupon';
      });
  }
});

// ✅ Export Actions & Reducer
export const { setCurrentCoupon, clearCurrentCoupon, resetStatus } = couponSlice.actions;
export default couponSlice.reducer;
