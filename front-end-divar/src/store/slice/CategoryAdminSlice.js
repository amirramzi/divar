import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  parent: null,
  child: null,
  lastChild: null,
  options: null,
  enum: null,
};

const categoryAdminSlice = createSlice({
  name: "categoryAdmin",
  initialState: initialState,
  reducers: {
    setCategoryParent: (state, action) => {
      state.parent = action.payload;
    },
    setCategoryChild: (state, action) => {
      state.child = action.payload;
    },
    setCategoryLastChild: (state, action) => {
      state.lastChild = action.payload;
    },
    setOptions: (state, action) => {
      state.options = action.payload;
    },
    setEnum: (state, action) => {
      state.enum = action.payload;
    },
  },
});

export const {
  setCategoryParent,
  setCategoryChild,
  setCategoryLastChild,
  setOptions,
  setEnum,
} = categoryAdminSlice.actions;
export default categoryAdminSlice.reducer;
