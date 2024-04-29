import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  simcardNaveList: [],
  selectedEntity: null,
  deleteModal: null,
  currentPage: 1,
  totalPage: 1,
  perPage: {
    id: "25",
    label: "۲۵",
    value: "۲۵",
  },
  assignModal: null,
};

export const simcardNaveSlice = createSlice({
  name: "simcardNave",
  initialState,
  reducers: {
    setSimcardNaveList: (state, action) => {
      state.simcardNaveList = action.payload;
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
    setAssignModal: (state, action) => {
      state.assignModal = action.payload;
    },
  },
});

export const {
  setSimcardNaveList,
  setSelectedEntity,
  setDeleteModal,
  setCurrentPage,
  setTotalPage,
  setPerPage,
  setAssignModal,
} = simcardNaveSlice.actions;

export default simcardNaveSlice.reducer;
