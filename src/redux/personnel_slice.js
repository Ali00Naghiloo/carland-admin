import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  personnel: null,
  deleteConfirm: null,
};

export const personnelSlice = createSlice({
  name: "personnel",
  initialState,
  reducers: {
    setPersonnel: (state, action) => {
      state.personnel = action.payload;
    },
    setDeleteConfirm: (state, action) => {
      state.deleteConfirm = action.payload;
    },
  },
});

export const { setPersonnel, setDeleteConfirm } = personnelSlice.actions;

export default personnelSlice.reducer;
