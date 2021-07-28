import { uiAction } from './ui-slice';
import { cartActions } from './cart-slice';

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        'https://redux-add-to-cart-default-rtdb.firebaseio.com/cart.json'
      );
      if (!response.ok) {
        throw new Error('Sending cart data failed');
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();

      dispatch(
        cartActions.replaceCartData({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiAction.showNotification({
          status: 'error',
          title: 'Error!!',
          message: `Fetching cart data failed ${error.message}`,
        })
      );
    }
  };
};

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
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
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
