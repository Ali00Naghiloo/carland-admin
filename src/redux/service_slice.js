import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  serviceList: [],
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
  offerModal: null,
  scoreModal: null,
};

export const productSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    setServiceList: (state, action) => {
      state.serviceList = action.payload;
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
    setOfferModal: (state, action) => {
      state.offerModal = action.payload;
    },
    setScoreModal: (state, action) => {
      state.scoreModal = action.payload;
    },
  },
});

export const {
  setServiceList,
  setSelectedEntity,
  setDeleteModal,
  setCurrentPage,
  setTotalPage,
  setPerPage,
  setPatchLoading,
  setOfferModal,
  setScoreModal,
} = productSlice.actions;

export default productSlice.reducer;
