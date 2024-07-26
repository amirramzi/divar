import { createSlice } from "@reduxjs/toolkit";

export const provinceSlice = createSlice({
  name: "province",
  initialState: { list: [], city: [] },

  reducers: {
    setProvince: (state, action) => {
      state.list = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    toggleCheckbox: (state, action) => {
      const checkbox = state.city.find((cb) => cb.id === action.payload);
      if (checkbox) {
        checkbox.checked = !checkbox.checked;
      }
    },
    enableAllCheckboxes: (state) => {
      state.city = state.city.map((checkbox) => ({
        ...checkbox,
        checked: true,
      }));
    },
    clearAllCheckboxes: (state) => {
      state.city = state.city.map((checkbox) => ({
        ...checkbox,
        checked: false,
      }));
    },
  },
});
export const {
  setProvince,
  setCity,
  toggleCheckbox,
  enableAllCheckboxes,
  clearAllCheckboxes,
} = provinceSlice.actions;
export default provinceSlice.reducer;
