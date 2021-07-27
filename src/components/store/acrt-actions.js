import { uiAction } from './ui-slice';

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
