// orderStatusSlice.js
import { createSlice } from '@reduxjs/toolkit';

const orderStatusSlice = createSlice({
  name: 'orderStatus',
  initialState: {
    status: null,  // 'success', 'error', or null
    message: '',   // Success or error message
  },
  reducers: {
    orderSuccess: (state) => {
      state.status = 'success';
      state.message = 'Order placed successfully!';
    },
    orderError: (state) => {
      state.status = 'error';
      state.message = 'Error placing the order. Please try again.';
    },
    clearOrderStatus: (state) => {
      state.status = null;
      state.message = '';
    },
  },
});

export const { orderSuccess, orderError, clearOrderStatus } = orderStatusSlice.actions;
export default orderStatusSlice.reducer;
