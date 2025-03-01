import { toast } from "react-toastify";

const SalesCart = ({ cart, setCart }) => {

  const removeItem = (id: number, index: number) => {
    setCart((prevCart: any) =>
      prevCart.filter((_, i) => !(i === index && id === prevCart[i].id))
    );
  };
  

  // Increment Quantity 🔼
  const increaseQuantity = (id: number, index: number) => {
    setCart((prevCart: any) =>
      prevCart.map((item, i) =>
        item.id === id && i === index
          ? item.soldQuantity < item.quantity
            ? { ...item, soldQuantity: item.soldQuantity + 1 }
            : (toast.warn("Not enough stock!"), toast.clearWaitingQueue(), item)
          : item
      )
    );
  };
  
  // Decrement Quantity 🔽
  const decreaseQuantity = (id: number, index: number) => {
    setCart((prevCart: any) =>
      prevCart.map((item, i) =>
        item.id === id && i === index && item.soldQuantity > 1
          ? { ...item, soldQuantity: item.soldQuantity - 1 }
          : item
      )
    );
  };
  
  // Total Price Calculation
  const getTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.buying_price * item.soldQuantity,
      0
    );
  };

  return (
    <div>
      <h2 className="text-xl font-semibold">Selected Sales Items</h2>
      {cart.map((item, index) => (
        <div key={item.id} className="flex justify-between border-b py-2 items-center">
          <span>
            {index + 1}. {item.product_name} - {item.soldQuantity} {item.unit}
          </span>
          <span>
            Rs.{item.buying_price} x {item.soldQuantity} ={" "}
            <b>Rs.{item.buying_price * item.soldQuantity}</b>
          </span>

          <div className="flex gap-2 items-center">
            <button
              onClick={() => decreaseQuantity(item.id, index)}
              className="bg-gray-500 text-white px-2 rounded"
            >
              Decrease Quantity
            </button>
            <button
              onClick={() => increaseQuantity(item.id, index)}
              className="bg-gray-500 text-white px-2 rounded"
            >
              Increase Quantity
            </button>
            <button
              onClick={() => removeItem(item.id, index)}
              className="bg-red-500 text-white px-2 rounded"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="mt-4 font-bold text-lg">
        Total Price: Rs.{getTotalPrice()}
      </div>
    </div>
  );
};

export default SalesCart;
