import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../api/instance";

const API_URL = `${import.meta.env.VITE_API_URL}/api/dashboard`;


export const fetchSocialLinks = createAsyncThunk(
    "socialLinks/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(`${API_URL}/socialLinks`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch social links");
        }
    }
);


export const createSocialLink = createAsyncThunk(
    "socialLinks/create",
    async (linkData, { rejectWithValue }) => {
        try {
            const response = await api.post(`${API_URL}/addSocialLinks`, linkData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to create social link");
        }
    }
);

export const updateSocialLink = createAsyncThunk(
    "socialLinks/update",
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const response = await api.put(`${API_URL}/updateSocialLinks/${id}`, updatedData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to update social link");
        }
    }
);


export const deleteSocialLink = createAsyncThunk(
    "socialLinks/delete",
    async (id, { rejectWithValue }) => {
        try {
            await api.delete(`${API_URL}/deleteSocialLinks/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to delete social link");
        }
    }
);


const socialLinksSlice = createSlice({
    name: "socialLinks",
    initialState: {
        socialLinks: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSocialLinks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSocialLinks.fulfilled, (state, action) => {
                state.loading = false;
                state.socialLinks = action.payload;
            })
            .addCase(fetchSocialLinks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createSocialLink.fulfilled, (state, action) => {
                state.socialLinks.push(action.payload);
            })
            .addCase(updateSocialLink.fulfilled, (state, action) => {
                const updatedLink = action.payload;
                const index = state.socialLinks.findIndex(link => link._id === updatedLink._id);
                if (index !== -1) {
                    state.socialLinks[index] = updatedLink;
                }
            })
            .addCase(deleteSocialLink.fulfilled, (state, action) => {
                state.socialLinks = state.socialLinks.filter(link => link._id !== action.payload);
            });
    },
});

export default socialLinksSlice.reducer;
