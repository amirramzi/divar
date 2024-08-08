// store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const allPostSlice = createSlice({
  name: "post",
  initialState: {
    confirmedPost: [],
    pendingPost: [],
    failedPost: [],
    myPost: [],
  },
  reducers: {
    setConfirmedPost: (state, action) => {
      state.confirmedPost = action.payload;
    },
    setPendingPost: (state, action) => {
      state.pendingPost = action.payload;
    },
    setFailedPost: (state, action) => {
      state.failedPost = action.payload;
    },
    setMyPost: (state, action) => {
      state.myPost = action.payload;
    },
  },
});

export const { setConfirmedPost, setPendingPost, setFailedPost, setMyPost } =
  allPostSlice.actions;

export default allPostSlice.reducer;
