// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../features/users/userSlice.js";
import { postSlice } from "../features/post/postSlice.js";

export const store = configureStore({
  reducer: {
    auth: userSlice.reducer,
    album: postSlice.reducer,
  },
});
