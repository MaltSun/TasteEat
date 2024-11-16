import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    email: "",
    password: "",
    userId: null,
    role: "",
  },
  reducers: {
    setCredentials: (state, action) => {
      const { email, password, userId, role } = action.payload;
      state.email = email;
      state.password = password;
      state.userId = userId;
      state.role = role;
    },
    clearCredentials: (state) => {
      state.email = "";
      state.password = "";
      state.userId = null;
      state.role = "";
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
