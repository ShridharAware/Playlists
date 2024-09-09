import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

interface User  {
    name: string;
    email: string;
    password: string;
}

interface UserState {
  userDetails: any;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  userDetails: null,
  status: 'idle',
  error: null,
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData: User, thunkAPI) => {
    try {
      const response = await axios.post('/api/createUser', userData);
      toast.success("User registered successfully.");
      return response.data;

    } catch (error : any) {
        toast.error(error.response.data)
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetState(state) {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userDetails = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { resetState } = userSlice.actions;

export default userSlice.reducer;
