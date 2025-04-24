import { combineReducers, configureStore } from '@reduxjs/toolkit';
import commonSlice from 'Views/Common/Slice/Common_slice';
import adminSlice from 'Views/Admin/Slice/Admin_slice'

const reducers = combineReducers({ 
  commonState: commonSlice,
  adminState: adminSlice,
  
});

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

export default store;
