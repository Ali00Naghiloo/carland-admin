import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nationalityList: [],
  selectedEntity: null,
  deleteModal: null,
};

export const nationalitySlice = createSlice({
  name: "nationality",
  initialState,
  reducers: {
    setNationalityList: (state, action) => {
      state.nationalityList = action.payload;
    },
    setSelectedEntity: (state, action) => {
      state.selectedEntity = action.payload;
    },
    setDeleteModal: (state, action) => {
      state.deleteModal = action.payload;
    },
  },
});

export const { setNationalityList, setSelectedEntity, setDeleteModal } =
  nationalitySlice.actions;

export default nationalitySlice.reducer;
