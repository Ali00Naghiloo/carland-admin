import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedEntity: null,
  deleteModal: null,
};

export const numberLabelSlice = createSlice({
  name: "numberLabel",
  initialState,
  reducers: {
    setSelectedEntity: (state, action) => {
      state.selectedEntity = action.payload;
    },
    setDeleteModal: (state, action) => {
      state.deleteModal = action.payload;
    },
  },
});

export const { setSelectedEntity, setDeleteModal } = numberLabelSlice.actions;

export default numberLabelSlice.reducer;
