import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedEntity: null,
  deleteModal: null,
};

export const numberTypeSlice = createSlice({
  name: "numberType",
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

export const { setSelectedEntity, setDeleteModal } = numberTypeSlice.actions;

export default numberTypeSlice.reducer;
