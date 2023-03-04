import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../axios"

export const fetchAuth = createAsyncThunk("auth/fetchUserData", async (params, thunkAPI) => {
  try {
    const { data } = await axios.post("/auth/login", params)
    if (data.message) {
      return thunkAPI.rejectWithValue(data.message)
    }
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message)
  }
})

export const fetchRegister = createAsyncThunk("auth/fetchRegister", async (params, thunkAPI) => {
  try {
    const { data } = await axios.post("/auth/register", params)
    if (data.message) {
      return thunkAPI.rejectWithValue(data.message)
    }
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message)
  }
})
export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async (params, thunkAPI) => {
  try {
    const { data } = await axios.get("/auth/me")
    if (data.message) {
      return thunkAPI.rejectWithValue(data.message)
    }
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message)
  }
})
const initialState = {
  data: null,
  status: "loading",
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;

    }
  },
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.status = "loading";
      state.data = null
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload
    },
    [fetchAuth.rejected]: (state) => {
      state.status = "error";
      state.data = null
    },
    [fetchAuthMe.pending]: (state) => {
      state.status = "loading"
      state.items = []
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.status = "loaded"
      state.items = action.payload
    },
    [fetchAuthMe.rejected]: (state) => {
      state.items = []
      state.status = "error"
    },
    [fetchRegister.pending]: (state) => {
      state.status = "loading"
      state.items = []
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.status = "loaded"
      state.items = action.payload
    },
    [fetchRegister.rejected]: (state) => {
      state.items = []
      state.status = "error"
    },
  }
})
export const selectIsAuth = state => Boolean(state.auth.data)
export const authReducer = authSlice.reducer
export const { logout } = authSlice.actions