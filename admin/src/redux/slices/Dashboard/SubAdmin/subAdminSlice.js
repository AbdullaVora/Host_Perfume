import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../api/instance";

const API_URL = `${import.meta.env.VITE_API_URL}/api/dashboard`;

// ✅ Fetch All SubAdmins
export const fetchSubAdmins = createAsyncThunk(
    "subAdmins/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(`${API_URL}/getSubAdmins`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch sub-admins");
        }
    }
);

// ✅ Create a New SubAdmin
export const createSubAdmin = createAsyncThunk(
    "subAdmins/create",
    async (subAdminData, { rejectWithValue }) => {
        try {
            const response = await api.post(`${API_URL}/addSubAdmin`, subAdminData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to create sub-admin");
        }
    }
);

// ✅ Update an Existing SubAdmin
export const updateSubAdmin = createAsyncThunk(
    "subAdmins/update",
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const response = await api.put(`${API_URL}/updateSubAdmin/${id}`, updatedData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to update sub-admin");
        }
    }
);

// ✅ Delete a SubAdmin
export const deleteSubAdmin = createAsyncThunk(
    "subAdmins/delete",
    async (id, { rejectWithValue }) => {
        try {
            await api.delete(`${API_URL}/deleteSubAdmin/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to delete sub-admin");
        }
    }
);


// ✅ Login SubAdmin
export const loginSubAdmin = createAsyncThunk(
    "subAdmins/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await api.post(`${API_URL}/login`, credentials);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Login failed");
        }
    }
);

// 🔥 SubAdmin Slice
const subAdminSlice = createSlice({
    name: "subAdmins",
    initialState: {
        list: [],
        currentSubAdmin: null,
        loading: false,
        error: null,
        auth: {
            isAuthenticated: false,
            token: null,
        },
    },
    reducers: {
        // Optional: Add manual logout reducer
        logoutSubAdmin: (state) => {
            state.currentSubAdmin = null;
            state.auth.isAuthenticated = false;
            state.auth.token = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // ✅ Handle Fetch All
            .addCase(fetchSubAdmins.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSubAdmins.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchSubAdmins.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ✅ Handle Create
            .addCase(createSubAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createSubAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload);
            })
            .addCase(createSubAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ✅ Handle Update
            .addCase(updateSubAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateSubAdmin.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.list.findIndex(
                    (subAdmin) => subAdmin._id === action.payload._id
                );
                if (index !== -1) {
                    state.list[index] = {
                        ...state.list[index],
                        ...action.payload,
                    };
                }
            })
            .addCase(updateSubAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ✅ Handle Delete
            .addCase(deleteSubAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteSubAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.list = state.list.filter(
                    (subAdmin) => subAdmin._id !== action.payload
                );
            })
            .addCase(deleteSubAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ✅ Handle Login
            .addCase(loginSubAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginSubAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.currentSubAdmin = action.payload.data || action.payload;
                state.auth.isAuthenticated = true;
                state.auth.token = action.payload.token;
            })
            .addCase(loginSubAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// ✅ Export Actions
export const { logoutSubAdmin } = subAdminSlice.actions;

// ✅ Export Reducer
export default subAdminSlice.reducer;