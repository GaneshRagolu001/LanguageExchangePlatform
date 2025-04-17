import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");

let user = null;
try {
  const storedUser = localStorage.getItem("user");
  user = storedUser ? JSON.parse(storedUser) : null;
} catch (err) {
  console.error("Error parsing user:", err);
  localStorage.removeItem("user"); // optional safety cleanup
}
const initialState = {
  user: user || {
    id: null,
    name: null,
    email: null,
    password: null,
    native_language: null,
    learning_language: null,
    bio: null,
    profile_picture: null,
    created_at: null,
    interests: null,
    location: null,
    connected_user_ids: [],
  },
  loginDetails: {
    email: null,
    password: null,
  },
  token: token || null,
  error: null,
  logedIn: !!token,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login(state, action) {
      state.loginDetails = action.payload;
      state.logedIn = true;
    },
    SetUser(state, action) {
      state.user = action.payload;
      state.logedIn = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    loginError(state, action) {
      state.error = action.payload;
      state.logedIn = false;
      localStorage.clear();
    },
    logout(state) {
      localStorage.clear();
      state.logedIn = false;
    },
    addConection(state, action) {
      if (!Array.isArray(state.user.connected_user_ids)) {
        state.user.connected_user_ids = [];
      }

      if (!state.user.connected_user_ids.includes(action.payload)) {
        state.user.connected_user_ids.push(action.payload);
        localStorage.setItem("user", JSON.stringify(state.user)); // persist updated user
      }
    },
  },
});

export const loginActions = loginSlice.actions;
export default loginSlice;
