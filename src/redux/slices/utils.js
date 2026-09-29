import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedModule: null,
  orderType: 0,
  currentTab: "",
  orderDetailsModalOpen: false,
  orderInformation: {},
  welcomeModal: false,
  openForgotPasswordModal: false,
  openSignInModal: false,
  searchBannerInView: true,
  // GEMINI-MYTJ: Controls global location selection modal when switching to hyperlocal modules or checkout
  openLocationModal: false,
};
export const utilsSlice = createSlice({
  name: "utils-data",
  initialState,
  reducers: {
    setSelectedModule: (state, action) => {
      state.selectedModule = action.payload;
    },
    setOrderType: (state, action) => {
      state.orderType = action.payload;
    },
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload;
    },
    setOrderDetailsModalOpen: (state, action) => {
      state.orderDetailsModalOpen = action.payload;
    },
    setOrderInformation: (state, action) => {
      state.orderInformation = action.payload;
    },
    setWelcomeModal: (state, action) => {
      state.welcomeModal = action.payload;
    },
    setOpenForgotPasswordModal: (state, action) => {
      state.openForgotPasswordModal = action.payload;
    },
    setOpenSignInModal: (state, action) => {
      state.openSignInModal = action.payload;
    },
    setSearchBannerInView: (state, action) => {
      state.searchBannerInView = action.payload;
    },
    // GEMINI-MYTJ: Reducer to open/close location modal
    setOpenLocationModal: (state, action) => {
      state.openLocationModal = action.payload;
    },
  },
});

export const {
  setSelectedModule,
  setOrderType,
  setCurrentTab,
  setOrderDetailsModalOpen,
  setOrderInformation,
  setWelcomeModal,
  setOpenForgotPasswordModal,
  setOpenSignInModal,
  setSearchBannerInView,
  setOpenLocationModal,
} = utilsSlice.actions;

export default utilsSlice.reducer;
