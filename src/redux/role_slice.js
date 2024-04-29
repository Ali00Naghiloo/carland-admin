import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roleList: [],
  selectedEntity: null,
  deleteModal: null,
  patchLoading: false,
};

export const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    setRoleList: (state, action) => {
      state.roleList = action.payload;
    },
    setSelectedEntity: (state, action) => {
      state.selectedEntity = action.payload;
    },
    setDeleteModal: (state, action) => {
      state.deleteModal = action.payload;
    },
    setPatchLoading: (state, action) => {
      state.patchLoading = action.payload;
    },
  },
});

export const {
  setRoleList,
  setSelectedEntity,
  setDeleteModal,
  setPatchLoading,
} = roleSlice.actions;

export default roleSlice.reducer;
