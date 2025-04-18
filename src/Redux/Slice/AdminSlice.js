import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "Admin"
};

const AdminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        updateAdmin: (state, action) => {
            state.name = action.payload;
        }
    }
});

export const { updateAdmin } = AdminSlice.actions;

export default AdminSlice.reducer;