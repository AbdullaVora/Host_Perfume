import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../api/instance";

const API_URL = `${import.meta.env.VITE_API_URL}/api/dashboard`;

// ✅ Fetch All Variants
export const fetchVariants = createAsyncThunk("variants/fetchAll", async (_, { rejectWithValue }) => {
    try {
        const response = await api.get(`${API_URL}/getVariants`);
        console.log("API Response:", response.data); // Debugging line
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch variants");
    }
});

// ✅ Create a New Variant
export const createVariant = createAsyncThunk("variants/create", async (variantData, { rejectWithValue }) => {
    try {
        console.log(variantData)
        const response = await api.post(`${API_URL}/addVariants`, variantData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to create variant");
    }
});

// ✅ Update an Existing Variant
export const updateVariant = createAsyncThunk("variants/update", async ({ id, updatedData }, { rejectWithValue }) => {
    try {
        const response = await api.put(`${API_URL}/updateVariants/${id}`, updatedData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to update variant");
    }
});

// ✅ Delete a Variant
export const deleteVariant = createAsyncThunk("variants/delete", async (id, { rejectWithValue }) => {
    try {
        await api.delete(`${API_URL}/deleteVariants/${id}`);
        return id;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to delete variant");
    }
});

// 🔥 Variant Slice
const variantSlice = createSlice({
    name: "variants",
    initialState: {
        variants: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // ✅ Handle Fetch
            .addCase(fetchVariants.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchVariants.fulfilled, (state, action) => {
                state.loading = false;
                state.variants = action.payload;
            })
            .addCase(fetchVariants.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // ✅ Handle Create
            .addCase(createVariant.fulfilled, (state, action) => {
                state.variants.push(action.payload);
            })
            // ✅ Handle Update
            .addCase(updateVariant.fulfilled, (state, action) => {
                const index = state.variants.findIndex(variant => variant.id === action.payload.id);
                if (index !== -1) {
                    state.variants[index] = {
                        ...state.variants[index],  // Preserve existing values
                        ...action.payload,  // Update with new data from API
                    };
                }
            })

            // ✅ Handle Delete
            .addCase(deleteVariant.fulfilled, (state, action) => {
                state.variants = state.variants.filter(variant => variant.id !== action.payload);
            });
    },
});

// ✅ Export Reducer
export default variantSlice.reducer;
