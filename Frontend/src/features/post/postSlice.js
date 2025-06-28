import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPostService, postService } from "./postServer";

const initialState = {
  post: [],
  postMessage: "",
  postError: false,
  postSuccess: false,
  postLoading: false,
};

export const addPostData = createAsyncThunk(
  "add-post",
  async (postdata, thunkAPI) => {
    try {
      return await postService(postdata);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.userError);
    }
  }
);

export const getPostData = createAsyncThunk("get-post", async (_, thunkAPI) => {
  try {
    return await getPostService();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.userError);
  }
});

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    postRest: (state) => {
      state.postMessage = "";
      state.postError = false;
      state.postSuccess = false;
      state.postLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPostData.pending, (state, action) => {
        state.postLoading = true;
      })
      .addCase(addPostData.rejected, (state, action) => {
        state.postError = true;
        state.postMessage = action.payload;
        state.postLoading = false;
        state.postSuccess = false;
      })
      .addCase(addPostData.fulfilled, (state, action) => {
        state.postError = false;
        state.postMessage = action.payload;
        state.postLoading = false;
        state.postSuccess = true;
        state.post.push(action.payload);
      })
      .addCase(getPostData.pending, (state, action) => {
        state.postLoading = true;
      })
      .addCase(getPostData.rejected, (state, action) => {
        state.postError = true;
        state.postLoading = false;
        state.postMessage = action.payload;
      })
      .addCase(getPostData.fulfilled, (state, action) => {
        state.post = action.payload;
        state.postError = false;
        state.postLoading = false;
        state.postSuccess = true;
      });
  },
});
export const { postRest } = postSlice.actions;
export default postSlice.reducer;
