const SalesCart = ({ cart, setCart }) => {
  const removeItem = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold">Selected Sales Items</h2>
      {cart.map((item, index) => (
        <div key={item.id} className="flex justify-between border-b py-2">
          <span>
            {index + 1}. {item.product_name} - {item.soldQuantity} {item.unit}
          </span>
          <button
            onClick={() => removeItem(item.id)}
            className="bg-red-500 text-white px-2 rounded"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default SalesCart;
