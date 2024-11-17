import ManageStores from "../Pages/ManageStores";
import { Link } from "react-router-dom";

const Inventory = () => {

  const products = [
    { id: 1, name: "Laptop", price: 100000 },
    { id: 2, name: "IPhone", price: 150000 },
    { id: 3, name: "Tablet", price: 250000 },
  ];

  return (
    <div>
      <h2>Available Products</h2>
      <div>
        {products.map((product) => (
          <ManageStores
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>
      <Link to="/layout/orders">
        <button className="bg-orange-400 rounded py-2 px-2 hover:bg-orange-500 my-3">View your Cart</button>
      </Link>
      
    </div>
  );
};

export default Inventory;
