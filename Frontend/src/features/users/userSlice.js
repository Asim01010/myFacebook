import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { regUserService } from "./userService.js";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
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
      return thunkAPI.rejectWithValue(error.response.data.userError);
      //   console.log(error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userReset: (state) => {
      state.userError = false;
      state.userLoading = false;
      state.userMessage = "";
      state.userSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(regUserSlice.pending, (state, action) => {
        state.userLoading = true;
      })
      .addCase(regUserSlice.rejected, (state, action) => {
        state.userError = true;
        state.userSuccess = false;
        state.userMessage = action.payload;
        state.userLoading = false;
      })
      .addCase(regUserSlice.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userSuccess = true;
        state.userError = false;
        state.user = action.payload;
      });
  },
});

export default userSlice.reducer;
export const { userReset } = userSlice.actions;
