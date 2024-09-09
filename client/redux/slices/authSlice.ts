import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

type User = {
  name: string;
  email: string;
  password: string;
};

type LoginData = {
  email: string;
  password: string;
};

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true" ? true : false, 
  user: null,
  status: 'idle',
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (loginData: LoginData, thunkAPI) => {
    try {
      const response = await axios.post('/api/admin/login', loginData);
      localStorage.setItem('isAuthenticated', 'true'); 
      localStorage.setItem('token', response.data.token);
      toast.success('Login successfully.');
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, thunkAPI) => {
  try {
    localStorage.removeItem('token');
    localStorage.setItem('isAuthenticated', 'false'); 
    return null;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetState(state) {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = 'succeeded';
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { resetState } = authSlice.actions;

export default authSlice.reducer;
