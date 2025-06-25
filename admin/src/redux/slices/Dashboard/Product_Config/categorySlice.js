import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../api/instance";

const API_URL = `${import.meta.env.VITE_API_URL}/api/dashboard`; // Replace with your actual API endpoint

// ✅ Fetch All Categories
export const fetchCategories = createAsyncThunk("categories/fetchAll", async (_, { rejectWithValue }) => {
    try {
        const response = await api.get(`${API_URL}/getCategories`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch categories");
    }
});

// ✅ Create a New Category
export const createCategory = createAsyncThunk("categories/create", async (categoryData, { rejectWithValue }) => {
    try {
        const response = await api.post(`${API_URL}/addCategories`, categoryData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to create category");
    }
});

// ✅ Update an Existing Category
export const updateCategory = createAsyncThunk("categories/update", async ({ id, updatedData }, { rejectWithValue }) => {
    try {
        console.log(updatedData)
        const response = await api.put(`${API_URL}/updateCategories/${id}`, updatedData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to update category");
    }
});

// ✅ Delete a Category
export const deleteCategory = createAsyncThunk("categories/delete", async (id, { rejectWithValue }) => {
    try {
        await api.delete(`${API_URL}/deleteCategories/${id}`);
        return id; // Return ID to remove it from Redux state
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to delete category");
    }
});

// 🔥 Category Slice
const categorySlice = createSlice({
    name: "categories",
    initialState: {
        categories: [],
        loading: false,
        error: null,
    },
    reducers: {}, // No synchronous reducers needed
    extraReducers: (builder) => {
        builder
            // ✅ Handle Fetch
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // ✅ Handle Create
            .addCase(createCategory.fulfilled, (state, action) => {
                state.categories.push(action.payload);
            })
            // ✅ Handle Update
            .addCase(updateCategory.fulfilled, (state, action) => {
                const updatedCategory = action.payload.category; // Extract updated category
                const index = state.categories.findIndex(cat => cat._id === updatedCategory._id);
                if (index !== -1) {
                    state.categories[index] = {
                        ...updatedCategory,
                        isAction: state.categories[index].isAction || true, // Preserve isAction
                        isCategory: state.categories[index].isCategory || true, // Preserve isAction
                    };
                }
            })

            // ✅ Handle Delete
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.categories = state.categories.filter(cat => cat.id !== action.payload);
            });
    },
});

// ✅ Export Actions & Reducer
export default categorySlice.reducer;
