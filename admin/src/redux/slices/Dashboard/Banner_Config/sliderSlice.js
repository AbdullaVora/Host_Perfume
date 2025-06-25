import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../../../api/instance';

// Base URL for API requests
const API_URL = '/api/dashboard'; // Update this with your actual API endpoint

// Async thunk for fetching all sliders
export const fetchSliders = createAsyncThunk(
  'sliders/fetchSliders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/sliders`);
      console.log(response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for adding a new slider
export const addSlider = createAsyncThunk(
  'sliders/addSlider',
  async (sliderData, { rejectWithValue }) => {
    console.log(sliderData)
    try {
      const response = await api.post(`${API_URL}/addSlider`, sliderData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for updating a slider
export const updateSlider = createAsyncThunk(
  'sliders/updateSlider',
  async ({ id, sliderData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`${API_URL}/updateSlider/${id}`, sliderData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for deleting a slider
export const deleteSlider = createAsyncThunk(
  'sliders/deleteSlider',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`${API_URL}/deleteSlider/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  sliders: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  currentSlider: null,
  loading: false,
};

const sliderSlice = createSlice({
  name: 'sliders',
  initialState,
  reducers: {
    setCurrentSlider: (state, action) => {
      state.currentSlider = action.payload;
    },
    clearCurrentSlider: (state) => {
      state.currentSlider = null;
    },
    resetStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch sliders
      .addCase(fetchSliders.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(fetchSliders.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        state.sliders = action.payload;
      })
      .addCase(fetchSliders.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch sliders';
      })
      
      // Add slider
      .addCase(addSlider.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(addSlider.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        state.sliders.push(action.payload.data);
      })
      .addCase(addSlider.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.payload || 'Failed to add slider';
      })
      
      // Update slider
      .addCase(updateSlider.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(updateSlider.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        const index = state.sliders.findIndex(slider => slider.id === action.payload.id);
        if (index !== -1) {
          state.sliders[index] = action.payload;
        }
      })
      .addCase(updateSlider.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.payload || 'Failed to update slider';
      })
      
      // Delete slider
      .addCase(deleteSlider.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(deleteSlider.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        state.sliders = state.sliders.filter(slider => slider.id !== action.payload);
      })
      .addCase(deleteSlider.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.payload || 'Failed to delete slider';
      });
  }
});

export const { setCurrentSlider, clearCurrentSlider, resetStatus } = sliderSlice.actions;

export default sliderSlice.reducer;
