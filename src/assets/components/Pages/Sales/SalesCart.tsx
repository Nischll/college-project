import { useEffect } from "react";
import { toast } from "react-toastify";

const SalesCart = ({ cart, setCart, setTotalPrice }) => {
  const removeItem = (id: number, index: number) => {
    setCart((prevCart: any) =>
      prevCart.filter((_, i) => !(i === index && id === prevCart[i].id))
    );
  };

  const handleQuantityChange = (id: number, index: number, value: string) => {
    // Allow empty input for manual typing
    if (value === "") {
      setCart((prevCart: any) =>
        prevCart.map((item, i) =>
          item.id === id && i === index ? { ...item, soldQuantity: "" } : item
        )
      );
      return;
    }

    // Check if input is a valid number
    const numericValue = parseFloat(value);
    if (
      !isNaN(numericValue) &&
      numericValue >= 0 &&
      numericValue <= cart[index].quantity
    ) {
      setCart((prevCart: any) =>
        prevCart.map((item, i) =>
          item.id === id && i === index
            ? { ...item, soldQuantity: numericValue }
            : item
        )
      );
    } else {
      toast.warn("Invalid quantity or exceeds available stock!");
      toast.clearWaitingQueue();
    }
  };

  const getTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.buying_price * item.soldQuantity,
      0
    );
  };

  // Update the total price in the parent (Sales)
  useEffect(() => {
    setTotalPrice(getTotalPrice());
  }, [cart, setTotalPrice]);

  return (
    <div>
      <h2 className="text-xl font-semibold">Selected Sales Items</h2>
      {cart.map((item, index) => (
        <div
          key={item.id}
          className="flex justify-between border-b py-2 items-center"
        >
          <span>
            {index + 1}. {item.product_name} - {item.soldQuantity} {item.unit}
          </span>
          <span>
            Rs.{item.buying_price} x {item.soldQuantity} ={" "}
            <b>Rs.{item.buying_price * item.soldQuantity}</b>
          </span>

          <div className="flex gap-2 items-center">
            <input
              type="number"
              value={item.soldQuantity === "" ? "" : item.soldQuantity} // Ensure correct empty handling
              onChange={(e) =>
                handleQuantityChange(item.id, index, e.target.value)
              }
              step="0.1" // Allow decimal input
              min="0"
              max={item.quantity}
              className="border rounded p-1 w-24"
              placeholder="quantity"
            />

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
