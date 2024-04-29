import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  commisionList: [],
  selectedEntity: null,
  deleteModal: null,
  currentPage: 1,
  totalPage: 1,
  perPage: {
    id: "25",
    label: "۲۵",
    value: "۲۵",
  },
  patchLoading: false,
};

export const commisionSlice = createSlice({
  name: "commision",
  initialState,
  reducers: {
    setCommisionList: (state, action) => {
      state.commisionList = action.payload;
    },
    setSelectedEntity: (state, action) => {
      state.selectedEntity = action.payload;
    },
    setDeleteModal: (state, action) => {
      state.deleteModal = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalPage: (state, action) => {
      state.totalPage = action.payload;
    },
    setPerPage: (state, action) => {
      state.perPage = action.payload;
    },
    setPatchLoading: (state, action) => {
      state.patchLoading = action.payload;
    },
  },
});

export const {
  setCommisionList,
  setSelectedEntity,
  setDeleteModal,
  setCurrentPage,
  setTotalPage,
  setPerPage,
  setPatchLoading,
} = commisionSlice.actions;

export default commisionSlice.reducer;
