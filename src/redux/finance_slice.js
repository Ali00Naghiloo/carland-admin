import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  financeList: [],
  currentPage: 1,
  totalPage: 1,
  perPage: {
    id: "25",
    label: "۲۵",
    value: "۲۵",
  },
  transactionsCurrentPage: 1,
  transactionsTotalPage: 1,
  transactionsPerPage: {
    id: "25",
    label: "۲۵",
    value: "۲۵",
  },
  transactionModal: null,
  selectedTransaction: null,
};

export const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {
    setFinanceList: (state, action) => {
      state.financeList = action.payload;
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
    setTransactionsCurrentPage: (state, action) => {
      state.transactionsCurrentPage = action.payload;
    },
    setTransactionsTotalPage: (state, action) => {
      state.transactionsTotalPage = action.payload;
    },
    setTransactionsPerPage: (state, action) => {
      state.transactionsPerPage = action.payload;
    },
    setTransactionModal: (state, action) => {
      state.transactionModal = action.payload;
    },
    setSelectedTransaction: (state, action) => {
      state.selectedTransaction = action.payload;
    },
  },
});

export const {
  setFinanceList,
  setCurrentPage,
  setTotalPage,
  setPerPage,
  setTransactionsCurrentPage,
  setTransactionsTotalPage,
  setTransactionsPerPage,
  setTransactionModal,
  setSelectedTransaction,
} = financeSlice.actions;

export default financeSlice.reducer;
