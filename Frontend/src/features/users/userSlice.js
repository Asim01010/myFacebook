import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { regUserService } from "./userService";

const initialState = {
  user: JSON.parse(localStorage.getItem("user"))
    ? localStorage.getItem("user")
    : null,
  userLoading: false,
  userSuccess: false,
  userError: false,
  userMessage: "",
};

export const regUserSlice = createAsyncThunk(
  "register-user",
  async (userdata, thunkAPI) => {
    try {
      return await regUserService(userdata);
    } catch (error) {
      console.log(error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(regUserSlice.pending, (state, action) => {
        state.userLoading = true;
      })
      .addCase(regUserSlice.rejected, (state, action) => {
        state.userError = true;
        state.userMessage = action.payload;
        state.userLoading = false;
      })
      .addCase(regUserSlice.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userSuccess = true;
        state.user = action.payload;
      });
  },
});

export default userSlice.reducer;
