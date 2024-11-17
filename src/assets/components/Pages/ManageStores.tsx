import { useDispatch } from "react-redux";
import { addItem } from "../Redux/CartActions";
import { useState } from "react";

const ManageStores = ({ id, name, price }) => {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addItem({ id, name, price }));
    setCount((count) => count+1);
  };

  return (
    <div>
      <h3>{name}</h3>
      <p>Rs.{price}</p>
      <button onClick={addToCartHandler} className="bg-blue-400 rounded py-2 px-2 hover:bg-blue-500">Add to Cart</button><span>{count} {name} added to your cart</span>
    </div>
  );
}
 
export default ManageStores;