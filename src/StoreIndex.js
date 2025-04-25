import { combineReducers, configureStore } from '@reduxjs/toolkit';
import commonSlice from 'Views/Common/Slice/Common_slice';
import adminSlice from 'Views/Admin/Slice/Admin_slice'
import userSlice from 'Views/User/Slice/User_slice';

const reducers = combineReducers({ 
  commonState: commonSlice,
  adminState: adminSlice,
  userState: userSlice
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
