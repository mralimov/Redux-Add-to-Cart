import { createSlice } from '@reduxjs/toolkit';

const cartInitialState = { items: [], totalQuantity: 0 };

const cartSlice = createSlice({
  name: 'cart',
  initialState: cartInitialState,
  reducers: {
    addItemToCart(state, action) {},
    removeItemFromCart(state, action) {},
  },
});

export default cartSlice;
