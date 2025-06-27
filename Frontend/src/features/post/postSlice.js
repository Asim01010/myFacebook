import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postService } from "./postServer";

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

export const postSlice = createSlice({
  name: " post",
  initialState,
  reducers: {
    postRest: (state) => {
      state.postMessage = false;
      state.postError = false;
      state.postSuccess = false;
      state.postLoading = false;
    },
  },
  extraReducers: (biulder) => {
    biulder
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
      });
  },
});
export const { postRest } = postSlice.actions;
export default postSlice.reducer;
