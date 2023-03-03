import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../axios"


export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const { data } = await axios.get('/posts')
    return data
  } catch (error) {
    console.log(error);
  }

})
export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  try {
    const { data } = await axios.get('/tags')
    return data
  } catch (error) {
    console.log(error);
  }
})
const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
}


const postSlice = createSlice({
  name: "posts",
  initialState,
  reducer: {},
  extraReducers: {
    [fetchPosts.pending]: (state, _) => {
      state.posts.items = []
      state.posts.status = "loading"
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.status = "loaded"
      state.posts.items = action.payload
    },
    [fetchPosts.rejected]: (state, _) => {
      state.posts.items = []
      state.posts.status = 'error'
    },
    [fetchTags.pending]: (state, _) => {
      state.tags.items = []
      state.tags.status = "loading"
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload
      state.tags.status = "loaded"
    },
    [fetch.rejected]: (state, _) => {
      state.tags.items = []
      state.tags.status = "error"
    }
  }
})

export const postsReducer = postSlice.reducer