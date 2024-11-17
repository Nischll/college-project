import { useSelector, useDispatch } from "react-redux";
import { clearCart, removeItem } from "../Redux/CartActions";

const Orders = () => {
  const cartItems = useSelector((state) => state.items);
  const totalAmount = useSelector((state) => state.totalAmount);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col justify-center items-center h-fit w-96 bg-gray-300">
      <h2>Your Cart</h2>
      <ul className="flex flex-col gap-2">
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - Rs.{item.price} x {item.quantity}
            <button onClick={() => dispatch(removeItem(item.id))} className="bg-blue-400 rounded py-2 px-2 hover:bg-blue-500">Remove</button>
          </li>
        ))}
      </ul>
      <h3>Total: Rs.{totalAmount}</h3>
      <button onClick={() => dispatch(clearCart())} className="bg-red-400 rounded py-2 px-2 hover:bg-red-500">Clear Cart</button>
      <button className="bg-green-600 rounded py-2 px-2 hover:bg-green-700">Proceed</button>
    </div>
  );
}
 
export default Orders;