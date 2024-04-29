import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  permissionList: [],
};

export const permissionSlice = createSlice({
  name: "permission",
  initialState,
  reducers: {
    setPermissionList: (state, action) => {
      state.permissionList = action.payload;
    },
  },
});

export const { setPermissionList } = permissionSlice.actions;

export default permissionSlice.reducer;
