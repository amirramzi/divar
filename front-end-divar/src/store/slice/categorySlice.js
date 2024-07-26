
import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    list: [],
    activeTab: null,
  },
  reducers: {
    setCategory: (state, action) => {
      state.list = action.payload;
      state.activeTab = action.payload[0]?._id;
    },

    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
});

export const { setCategory, setActiveTab } = categorySlice.actions;
export default categorySlice.reducer;
