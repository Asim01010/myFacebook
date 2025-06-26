import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, regUserService, verifyOtp } from "./userService.js";

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

export const verifyUserOtp = createAsyncThunk(
  "verify-otp-topi",
  async (otpData, thunkAPI) => {
    try {
      return await verifyOtp(otpData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.reponse.data.userError);
    }
  }
);

export const LoginUserSlice = createAsyncThunk(
  "Login-user",
  async (loginData, thunkAPI) => {
    try {
      return await loginUser(loginData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.userError);
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
        state.user = null;
      })
      .addCase(regUserSlice.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userSuccess = true;
        state.userError = false;
        state.user = action.payload;
      })
      .addCase(verifyUserOtp.pending, (state, action) => {
        state.userLoading = true;
      })
      .addCase(verifyUserOtp.rejected, (state, action) => {
        state.userError = true;
        state.userLoading = false;
        state.userMessage = action.payload;
        state.userSuccess = false;
      })
      .addCase(verifyUserOtp.fulfilled, (state, action) => {
        state.userError = false;
        state.userLoading = false;
        state.userMessage = action.payload;
        state.userSuccess = true;
        state.user = action.payload;
      })
      .addCase(LoginUserSlice.pending, (state, acton) => {
        state.userLoading = true;
      })
      .addCase(LoginUserSlice.rejected, (state, action) => {
        state.userError = true;
        state.userLoading = false;
        state.userMessage = action.payload;
        state.userSuccess = null;
      })
      .addCase(LoginUserSlice.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userSuccess = true;
        state.user = action.payload;
      });
  },
});

export default userSlice.reducer;
export const { userReset } = userSlice.actions;
