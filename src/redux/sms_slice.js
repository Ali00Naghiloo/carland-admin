import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  smsList: [],
  currentPage: 1,
  totalPage: 1,
  perPage: {
    id: "25",
    label: "۲۵",
    value: "۲۵",
  },
  patchLoading: false,
};

export const smsSlice = createSlice({
  name: "sms",
  initialState,
  reducers: {
    setSmsList: (state, action) => {
      state.smsList = action.payload;
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
  setSmsList,
  setCurrentPage,
  setTotalPage,
  setPerPage,
  setPatchLoading,
} = smsSlice.actions;

export default smsSlice.reducer;
