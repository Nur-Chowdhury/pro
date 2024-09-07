import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  showMenu: false,
  amount: localStorage.getItem('amount') ? parseInt(localStorage.getItem('amount')) : 0,
  amountw: localStorage.getItem('amountw') ? parseInt(localStorage.getItem('amountw')) : 0,
  item: localStorage.getItem('selectedItem') ? parseInt(localStorage.getItem('selectedItem')) : 1,
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.showMenu = !state.showMenu;
    },
    setItem: (state, action) => {
      state.item = action.payload; 
      localStorage.setItem('selectedItem', action.payload);
    },
    setAmount: (state, action) => {
      state.amount = action.payload; 
      localStorage.setItem('amount', action.payload);
    },
    resetAmount: (state) => {
      state.amount = 0; 
      localStorage.setItem('amount', 0);
    },
    setAmountw: (state, action) => {
      state.amountw = action.payload; 
      localStorage.setItem('amountw', action.payload);
    },
    resetAmountw: (state) => {
      state.amountw = 0; 
      localStorage.setItem('amountw', 0);
    },
  },
});

export const { toggleMenu, setItem, setAmount, resetAmount, setAmountw, resetAmountw } =
commonSlice.actions;
export default commonSlice.reducer;

export const commonSelector = (state) => state.common;
