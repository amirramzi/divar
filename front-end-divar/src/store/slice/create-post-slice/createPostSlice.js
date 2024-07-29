import { createSlice } from "@reduxjs/toolkit";
import { loadFromLocalStorage } from "../../middleware/saveToLocalStorage";

const initialState = {
  parent: null,
  child1: null,
  child2: null,
  option: null,
  categoryPost: [],
};

const createPostSlice = createSlice({
  name: "createPost",
  initialState: loadFromLocalStorage() || initialState,
  reducers: {
    setCategoryParent: (state, action) => {
      state.parent = action.payload;
    },
    setCategoryChild1: (state, action) => {
      state.child1 = action.payload;
    },
    setCategoryChild2: (state, action) => {
      state.child2 = action.payload;
    },
    setCategoryOption: (state, action) => {
      state.option = action.payload;
    },
    setLng: (state, action) => {
      state.lng = action.payload;
    },
    setLat: (state, action) => {
      state.lat = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setCategoryPost: (state, action) => {
      state.categoryPost.push(action.payload);
    },
    clearCategoryPost: (state) => {
      state.categoryPost = [];
    },
  },
});

export const {
  setCategoryParent,
  setCategoryChild1,
  setCategoryChild2,
  setCategoryOption,
  setCategoryPost,
  clearCategoryPost,
} = createPostSlice.actions;
export default createPostSlice.reducer;
