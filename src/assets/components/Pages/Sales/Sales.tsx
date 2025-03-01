import { useState } from "react";
import SalesCart from "./SalesCart";
import { toast } from "react-toastify";
import axios from "axios";
import GenericTable from "../../GenericComponents/GenericTable";

const Sales = () => {
  const [cart, setCart] = useState<any[]>([]);

  const fetchProductTable = async () => {
    const response = await axios.get("http://localhost:3000/getProducts");
    console.log(response);
    return response.data;
  };

  const columns = [
    {
      header: 'S.No',
      cell: ({row}) => {
        return row.index + 1;
      },
    },
    {
      accessorKey:'product_name',
      header: 'Products',
      cell: ({ getValue }) => {
        const value = getValue();
        return !value ? <span className="text-red-600">No Value</span> : <span>{value}</span>;
      },
    },
    {
      accessorKey: 'category',
      header: 'Categories'
    },
    {
      accessorKey: 'buying_price',
      header: 'Price',
      cell: ({getValue}) => {
        const value = getValue();
        return !value ? <span className='text-red-600'>Null</span> : <span>Rs. {value}</span>
      },
      enableColumnFilter: false
    },
    {
      accessorKey: 'quantity',
      header: 'Quantity',
      cell: ({ row }) => {
        const quantity = row.original.quantity;
        const unit = row.original.unit;
        return `${quantity} ${unit}s`;
      },
      enableColumnFilter: false,  
      sortingFn: (rowA, rowB) => {
        const valueA = `${rowA.original.QUANTITY}`;
        const valueB = `${rowB.original.QUANTITY}`;
        return valueA.localeCompare(valueB, undefined, { numeric: true });
      },
    },
    {
      accessorKey: 'expiry_date',
      header: 'Expiry Date',
      enableColumnFilter: false
    },
    {
      accessorKey: 'quantity',
      header: 'Availability',
      cell: ({ getValue }) => {
        const value = getValue();
        // return !value ? <span>Out of Stock</span> : <span className="text-[#10A760]">In Stock</span>
        if(value === 0){
          return <span className="text-[#DA3E33]">Out of stock</span>;
        }else if(value <= 10){
          return <span className="text-[#E19133]">Low stock</span>;
        }else{
          return <span className="text-[#10A760]">In stock</span>;
        }
      },
      enableColumnFilter: false,
      enableSorting: false,
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <button
          onClick={() => addToCart(row.original)}
          className="bg-blue-500 text-white px-2 py-1 rounded"
        >
          Add to Sale
        </button>
      ),
    },
  ];

  const addToCart = (item: any) => {

      setCart([...cart, { ...item, soldQuantity: 1 }]);
  };
  

  const handleSale = async () => {
    if(cart.length === 0) {
      toast.warn("Cart is Empty!");
      return;
    }
    try {
      await axios.post("http://localhost:3000/sales", { cart });
      toast.success("Sales Recorded Successfully!", {
        autoClose: 1000,
      });
      toast.clearWaitingQueue();
  
      // Clear cart **after** successful sale
      setCart([]);
    } catch (error) {
      toast.error("Failed to Save Sale");
      toast.clearWaitingQueue();
    }
  };

  const handleClearCart = () => {
    setCart([]);
  };
  

  return (
    <>
      <main className="bg-white h-full rounded-lg pt-2 px-2">
        <h1 className="text-2xl font-semibold text-left">Sales</h1>

      <div className="h-[calc(100vh-150px)] flex flex-col">
        <div>
          <GenericTable
          columns={columns}
          getData={fetchProductTable}
          pageSize={4}
        />
        </div>

        <div className="mt-20 overflow-y-scroll space-x-2">
          {cart.length > 0 && (
            <>
              <SalesCart cart={cart} setCart={setCart} />
              <button
                onClick={handleSale}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Confirm Sale
              </button>
              <button
                onClick={handleClearCart}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Clear All
              </button>
            </>
          )}
        </div>
      </div>

        

      </main>
    </>
  );
};

export default Sales;
