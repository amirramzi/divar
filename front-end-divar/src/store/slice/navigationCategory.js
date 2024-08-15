import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstCategory: null,
  secondCategory: null,
  thirdCategory: null,
};

const navigationCategorySlice = createSlice({
  name: "navigationCategory",
  initialState: initialState,
  reducers: {
    setFirstCategory: (state, action) => {
      state.firstCategory = action.payload;
    },
    setSecondCategory: (state, action) => {
      state.secondCategory = action.payload;
    },
    setThirdCategory: (state, action) => {
      state.thirdCategory = action.payload;
    },
  },
});

export const { setFirstCategory, setSecondCategory, setThirdCategory } =
  navigationCategorySlice.actions;
export default navigationCategorySlice.reducer;
