import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sourceNumberList: [],
  selectedEntity: null,
  deleteModal: null,
  currentPage: 1,
  totalPage: 1,
  perPage: {
    id: "25",
    label: "۲۵",
    value: "۲۵",
  },
  currentPageSearch: 1,
  totalPageSearch: 1,
  perPageSearch: {
    id: "25",
    label: "۲۵",
    value: "۲۵",
  },
  patchLoading: false,
};

export const sourceNumberSlice = createSlice({
  name: "sourceNumber",
  initialState,
  reducers: {
    setSourceNumberList: (state, action) => {
      state.sourceNumberList = action.payload;
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
    setCurrentPageSearch: (state, action) => {
      state.currentPageSearch = action.payload;
    },
    setTotalPageSearch: (state, action) => {
      state.totalPageSearch = action.payload;
    },
    setPerPageSearch: (state, action) => {
      state.perPageSearch = action.payload;
    },
    setPatchLoading: (state, action) => {
      state.patchLoading = action.payload;
    },
  },
});

export const {
  setSourceNumberList,
  setSelectedEntity,
  setDeleteModal,
  setCurrentPage,
  setTotalPage,
  setPerPage,
  setCurrentPageSearch,
  setTotalPageSearch,
  setPerPageSearch,
  setPatchLoading,
} = sourceNumberSlice.actions;

export default sourceNumberSlice.reducer;
