import { createSlice } from '@reduxjs/toolkit';
import { uiAction } from './ui-slice';
const cartInitialState = { items: [], totalQuantity: 0 };

const cartSlice = createSlice({
  name: 'cart',
  initialState: cartInitialState,
  reducers: {
    replaceCartData(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },

    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          name: newItem.title,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },

    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (existingItem === 1) {
        state.items = state.items.find((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiAction.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!',
      })
    );
    const sendRequestedData = async () => {
      const response = await fetch(
        'https://redux-add-to-cart-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error('Sending cart data failed');
      }
    };
    try {
      await sendRequestedData();
      dispatch(
        uiAction.showNotification({
          status: 'Success!',
          title: 'Success!',
          message: 'Sent data successfully!',
        })
      );
    } catch (error) {
      dispatch(
        uiAction.showNotification({
          status: 'error',
          title: 'Error!!',
          message: `Sending cart data failed ${error.message}`,
        })
      );
    }
  };
};
export const cartActions = cartSlice.actions;
export default cartSlice;
