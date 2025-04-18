import { configureStore } from "@reduxjs/toolkit";
import AdminSlice from "./Redux/Slice/AdminSlice.js"
import ModalSlice from "./Redux/Slice/ModelSlice.js"

 


const store = configureStore({
    reducer: {
        // adminstate:AdminSlice,
        // modelsta
        adminstate : AdminSlice,
        modelsstate : ModalSlice
        
       
    }
});

export default store;