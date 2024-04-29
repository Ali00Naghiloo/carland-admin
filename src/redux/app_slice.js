import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  today: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setToday: (state, action) => {
      state.today = action.payload;
    },
  },
});

export const { setToday } = appSlice.actions;

export default appSlice.reducer;
