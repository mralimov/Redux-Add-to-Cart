import { createSlice } from '@reduxjs/toolkit';

const cartInitialState = { items: [], totalQuantity: 0 };

const cartSlice = createSlice({
  name: 'cart',
  initialState: cartInitialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id == newItem.id)
      state.totalQuantity++
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: newItem.quantity,
          name: newItem.title,
          totalPrice: newItem.price
        })

      } else {

state.totalQuantity++;
state.totalPrice = existingItem.totalPrice + newItem.price
      }
    },
    removeItemFromCart(state, action) {},
  },
});

export default cartSlice;
