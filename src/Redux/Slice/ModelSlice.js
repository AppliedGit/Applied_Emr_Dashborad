import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    models: []
};

const ModelSlice = createSlice({
    name: "models",
    initialState,
    reducers: {
        addModel: (state, action) => {
            state.models.push(action.payload);
        }
    }
});

export const { addModel } = ModelSlice.actions;
export default ModelSlice.reducer;