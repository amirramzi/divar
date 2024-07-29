import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lng: 50.5,
  lat: 50.6,
  address: {
    province: "null",
    city: null,
    formatted_address: "sdsdsd",
    neighbourhood: null,
    route_name: null,
  },
};

const addressCreatePostSlice = createSlice({
  name: "addressCreatePost",
  initialState: initialState,
  reducers: {
    setLng: (state, action) => {
      state.lng = action.payload;
    },
    setLat: (state, action) => {
      state.lat = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
  },
});

export const { setLng, setLat, setAddress } = addressCreatePostSlice.actions;
export default addressCreatePostSlice.reducer;
