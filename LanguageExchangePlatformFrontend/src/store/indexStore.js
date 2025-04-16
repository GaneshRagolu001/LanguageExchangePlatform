import { configureStore } from "@reduxjs/toolkit";
import registerSlice from "./auth/registerSlice";
import loginSlice from "./auth/loginSlice";

const store = configureStore({
  reducer: {
    register: registerSlice.reducer,
    login: loginSlice.reducer,
  },
});

export default store;
