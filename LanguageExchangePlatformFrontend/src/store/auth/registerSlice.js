import { createSlice } from "@reduxjs/toolkit";

const registerSlice = createSlice({
  name: "register",
  initialState: {
    userDetails: null,
    registered: false,
  },
  reducers: {
    register(state, action) {
      state.userDetails = action.payload;
      state.registered = true;
    },
    registerError(state) {
      state.registered = false;
    },
  },
});

export const registerActions = registerSlice.actions;
export default registerSlice;
