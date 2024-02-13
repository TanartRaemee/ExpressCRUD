import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "Air Master",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state) => {
      state.value = "Air Master Login";
    },
    logout: (state) => {
      state.value = "Air Master Logout";
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, incrementByAmount } = userSlice.actions;

export default userSlice.reducer;
