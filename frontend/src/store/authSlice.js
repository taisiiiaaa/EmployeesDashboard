import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuth: false,
    token: ''
}

export const authThunk = createAsyncThunk('/auth/signin', async ({ username, password }) => {
    const response = await fetch('http://localhost:3000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      return rejectWithValue(error.message || 'Login failed');
    }

    const data = await response.json();
    return data.token;
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.isAuth = false;
            state.token = '';
        }
    },
    extraReducers: builder => 
        builder
        .addCase(authThunk.fulfilled, (state, action) => {
            state.isAuth = true;
            state.token = action.payload;
        })
});

export const { logout } = authSlice.actions;
export default authSlice.reducer