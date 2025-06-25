import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userId: null,
    userName: null,
    userEmail: null,
    userPhone: null,
    token: null
};

const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        setUserData(state, action) {
            state.userId = action.payload.userId;
            state.userName = action.payload.userName;
            state.userEmail = action.payload.userEmail;
            state.token = action.payload.token;
            state.userPhone = action.payload.userPhone;
        },
        clearUserData(state) {
            state.userId = null;
            state.userName = null;
            state.userEmail = null;
            state.token = null;
            state.userPhone = null;
        }
    }
});

export const { setUserData, clearUserData } = userDataSlice.actions;
export default userDataSlice.reducer;