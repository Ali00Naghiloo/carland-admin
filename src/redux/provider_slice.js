import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  providers: null,
  deleteConfirm: null,
  activationConfirm: null,
  selectedProvider: null,
};

export const providerSlice = createSlice({
  name: "provider",
  initialState,
  reducers: {
    setProviders: (state, action) => {
      state.providers = action.payload;
    },
    setDeleteConfirm: (state, action) => {
      state.deleteConfirm = action.payload;
    },
    setActivationConfirm: (state, action) => {
      state.activationConfirm = action.payload;
    },
    setSelectedProvider: (state, action) => {
      state.selectedProvider = action.payload;
    },
  },
});

export const {
  setProviders,
  setDeleteConfirm,
  setActivationConfirm,
  setSelectedProvider,
} = providerSlice.actions;

export default providerSlice.reducer;
