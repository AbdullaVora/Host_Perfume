import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api/instance";

// Base API URL from .env file
const API_URL = `${import.meta.env.VITE_API_URL}/api/auth`; // ✅ Corrected

// Async Thunks for Login and Register
// export const loginUser = createAsyncThunk(
//     "user/login",
//     async (userData, { rejectWithValue }) => {
//         try {
//             console.log("Sending Login Request:", userData);
//             const response = await api.post(`${API_URL}/login`, userData); // ✅ Correct API URL
//             console.log(response.data)
//             localStorage.setItem("token", JSON.stringify(response.data.token)); // Save user data
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || "Login failed");
//         }
//     }
// );


export const loginUser = createAsyncThunk(
    "user/login",
    async (userData, { rejectWithValue }) => {
        try {
            console.log("Sending Login Request:", userData);
            console.log("API_URL is:", API_URL); // 🛠 Check API_URL
            const response = await api.post(`${API_URL}/login`, userData);
            console.log("Response received:", response.data);

            localStorage.setItem("Admintoken", JSON.stringify(response.data.token));
            localStorage.setItem("AdminName", JSON.stringify(response.data.name));
            localStorage.setItem("AdminId", JSON.stringify(response.data.id));

            return response.data;
        } catch (error) {
            console.error("Login error full details:", error); // 🛠 Log full error
            return rejectWithValue(error.response?.data?.message || "Login failed");
        }
    }
);


export const registerUser = createAsyncThunk(
    "user/register",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await api.post(`${API_URL}/register`, userData); // ✅ Correct API URL
            localStorage.setItem("Admintoken", JSON.stringify(response.data.token)); // Save user data
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Registration failed");
        }
    }
);

export const getUsers = createAsyncThunk(
    "user/getUsers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(`${API_URL}/getUsers`); // ✅ Correct API URL
            console.log(response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Registration failed");
        }
    }
);

export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.delete(`${API_URL}/deleteUser/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Registration failed");

        }
    }
);

export const updateUser = createAsyncThunk(
    "user/updateUser",
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const response = await api.put(`${API_URL}/editUser/${id}`, updatedData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Registration failed");
        }
    }
)


// Logout Action
export const logoutUser = () => (dispatch) => {
    localStorage.removeItem("AdminName");
    localStorage.removeItem("AdminId");
    localStorage.removeItem("Admintoken");
    dispatch(logout());
};

// User Slice
const userSlice = createSlice({
    name: "user",
    initialState: {
        token: localStorage.getItem("Admintoken") ? JSON.parse(localStorage.getItem("Admintoken")) : null,
        loading: false,
        error: null,
        users: [],
    },
    reducers: {
        logout: (state) => {
            state.users = null;
            state.token = null;
            state.loading = false;
            state.error = null;
            localStorage.removeItem("Admintoken");
            localStorage.removeItem("AdminId");
            localStorage.removeItem("AdminName")
            window.location.reload();
        },
    },
    extraReducers: (builder) => {
        builder
            // Login Cases
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                // state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Register Cases
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.filter((user) => user.id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.map((user) => {
                    if (user.id === action.payload.id) {
                        return action.payload;
                    }
                })
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// Export Actions & Reducer
export const { logout } = userSlice.actions;
export default userSlice.reducer;
