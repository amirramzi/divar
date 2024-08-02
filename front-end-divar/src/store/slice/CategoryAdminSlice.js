import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  parent: null,
  child: null,
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
  },
});

export const { setCategoryParent, setCategoryChild } =
  categoryAdminSlice.actions;
export default categoryAdminSlice.reducer;
