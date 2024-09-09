import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from "./slices/userSlice";
import authReducer from "./slices/authSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
