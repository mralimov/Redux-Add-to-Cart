import classes from './CartButton.module.css';
import { useDispatch } from 'react-redux';
import { uiAction } from '../../store/ui-slice';
import { useSelector } from 'react-redux';
const CartButton = (props) => {
  const dispatch = useDispatch();
  const cartitem = useSelector((state) => state.cart.totalQuantity);
  const handleCartView = () => {
    dispatch(uiAction.toggle());
  };
  return (
    <button className={classes.button} onClick={handleCartView}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartitem}</span>
    </button>
  );
};

export default CartButton;
