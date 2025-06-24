import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../api/instance";

const API_URL = `${import.meta.env.VITE_API_URL}/api/dashboard`;

// ✅ Fetch All Products
export const fetchProducts = createAsyncThunk("products/fetchAll", async (_, { rejectWithValue }) => {
    try {
        const response = await api.get(`${API_URL}/products`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch products");
    }
});

// ✅ Create a New Product
export const createProduct = createAsyncThunk("products/create", async (productData, { rejectWithValue }) => {
    console.log(productData)
    try {
        const response = await api.post(`${API_URL}/addProduct`, productData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to create product");
    }
});

// ✅ Update an Existing Product
export const updateProduct = createAsyncThunk("products/update", async ({ id, updatedData }, { rejectWithValue }) => {
    console.log(updatedData)
    try {
        const response = await api.put(`${API_URL}/updateProduct/${id}`, updatedData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to update product");
    }
});

// ✅ Delete a Product
export const deleteProduct = createAsyncThunk("products/delete", async (id, { rejectWithValue }) => {
    try {
        await api.delete(`${API_URL}/deleteProduct/${id}`);
        return id;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to delete product");
    }
});

// 🔥 Product Slice
const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // ✅ Handle Fetch
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // ✅ Handle Create
            .addCase(createProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
            })
            // ✅ Handle Update
            .addCase(updateProduct.fulfilled, (state, action) => {
                const updatedProduct = action.payload;
                const index = state.products.findIndex(prod => prod._id === updatedProduct._id);
                if (index !== -1) {
                    state.products[index] = { ...updatedProduct };
                }
            })
            // ✅ Handle Delete
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(prod => prod._id !== action.payload);
            });
    },
});

// ✅ Export Reducer
export default productSlice.reducer;