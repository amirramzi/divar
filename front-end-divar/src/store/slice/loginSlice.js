import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    phone: null,
    loginModal: false,
    twoStepModal: false,
  },
  reducers: {
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    closeLoginModal: (state) => {
      state.loginModal = false;
    },
    openLoginModal: (state) => {
      state.loginModal = true;
    },
    closeTwoStepModal: (state) => {
      state.twoStepModal = false;
    },
    openTwoStepModal: (state) => {
      state.twoStepModal = true;
    },
  },
});

export const {
  setPhone,
  closeLoginModal,
  openLoginModal,
  closeTwoStepModal,
  openTwoStepModal,
} = loginSlice.actions;
export default loginSlice.reducer;
