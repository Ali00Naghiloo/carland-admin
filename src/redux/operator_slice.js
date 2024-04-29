import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  operatorList: [],
  selectedEntity: null,
  deleteModal: null,
  patchLoading: false,
};

export const operatorSlice = createSlice({
  name: "operator",
  initialState,
  reducers: {
    setOperatorList: (state, action) => {
      state.operatorList = action.payload;
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
  setOperatorList,
  setSelectedEntity,
  setDeleteModal,
  setPatchLoading,
} = operatorSlice.actions;

export default operatorSlice.reducer;
