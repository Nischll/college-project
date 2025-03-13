import { useState } from "react";
import SalesCart from "./SalesCart";
import { toast } from "react-toastify";
import axios from "axios";
import GenericTable from "../../GenericComponents/GenericTable";
import ConfirmDialog from "../../GenericComponents/ConfirmDialog";

const Sales = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchProductTable = async () => {
    const response = await axios.get("http://localhost:3000/getProducts");
    return response.data;
  };

  const columns = [
    {
      header: "S.No",
      cell: ({ row }) => {
        return row.index + 1;
      },
    },
    {
      accessorKey: "product_name",
      header: "Products",
      cell: ({ getValue }) => {
        const value = getValue();
        return !value ? (
          <span className="text-red-600">No Value</span>
        ) : (
          <span>{value}</span>
        );
      },
    },
    {
      accessorKey: "category",
      header: "Categories",
    },
    {
      accessorKey: "buying_price",
      header: "Price",
      cell: ({ getValue }) => {
        const value = getValue();
        return !value ? (
          <span className="text-red-600">Null</span>
        ) : (
          <span>Rs. {value}</span>
        );
      },
      enableColumnFilter: false,
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
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
      accessorKey: "expiry_date",
      header: "Expiry Date",
      enableColumnFilter: false,
      cell: ({ row }) => {
        const expiryDate = new Date(row.original.expiry_date); // Convert to Date object
        const today = new Date();
        const diffDays = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24)); // Difference in days
    
        let textColor = ""; // Default color
        if (diffDays < 0) {
          textColor = "text-red-600"; // Expired
        } else if (diffDays <= 7) {
          textColor = "text-yellow-500"; // Expiring soon
        }
    
        return <span className={textColor}>{expiryDate.toDateString()}</span>;
      },
    },    
    {
      accessorKey: "quantity",
      header: "Availability",
      cell: ({ getValue }) => {
        const value = getValue();
        // return !value ? <span>Out of Stock</span> : <span className="text-[#10A760]">In Stock</span>
        if (value === 0) {
          return <span className="text-[#DA3E33]">Out of stock</span>;
        } else if (value <= 10) {
          return <span className="text-[#E19133]">Low stock</span>;
        } else {
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
    setCart([...cart, { ...item, soldQuantity: " " }]);
  };

  const handleSale = async () => {
    if (cart.length === 0 || totalPrice === 0) {
      toast.warn("Cart is Empty!");
      return;
    }
    
    try {
      // Hit the sales API first
      const saleResponse = await axios.post("http://localhost:3000/sales", { cart });
  
      // Check if the sale was recorded successfully
      if (saleResponse.data?.message) {
        toast.success(saleResponse.data.message, { autoClose: 1000 });
      } else {
        toast.success("Sales Recorded Successfully!", { autoClose: 1000 });
      }
  
      // Now hit the payment API after a successful sale
      const paymentResponse = await axios.post("http://localhost:3000/api/payments", { 
        total_price: totalPrice
      });
  
      // Check if the payment was successful
      if (paymentResponse.data?.message) {
        toast.success(paymentResponse.data.message, { autoClose: 1000 });
      } else {
        toast.success("Payment Processed Successfully!", { autoClose: 1000 });
      }
  
      toast.clearWaitingQueue();
      setCart([]); // Clear cart after successful sale and payment
  
    } catch (error) {
      // Handle errors for sales API
      const errorMessage = error.response?.data?.message || "Failed to Save Sale";
      toast.error(errorMessage, { autoClose: 2000 });
  
      // Handle errors for payment API (if sales API was successful but payment failed)
      if (error.response?.config?.url === "http://localhost:3000/api/payments") {
        toast.error("Payment Failed!", { autoClose: 1000 });
      }
  
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
                {/* Pass setTotalPrice to SalesCart */}
                <SalesCart
                  cart={cart}
                  setCart={setCart}
                  setTotalPrice={setTotalPrice}
                />
                <button
                  onClick={() => setOpenDeleteDialog(true)}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Confirm Sale
                </button>
                <button
                  onClick={handleClearCart}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Clear Cart
                </button>
              </>
            )}
          </div>
        </div>

        <ConfirmDialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
          onConfirm={() => {
            handleSale();
            setOpenDeleteDialog(false);
          }}
          title="Confirm Sale"
          description="Are you sure you want to confirm this sale?"
          cancellationText="No"
          confirmationText="Yes"
        >
          <div className="h-64 p-2">
            <img
              src="src/images/qr.png"
              alt="QR code"
              className="h-full w-full object-contain"
            />
          </div>

          {/* Display Total Price Below QR Code */}
          <div className="mt-4 text-lg font-semibold text-center">
            Total Price: Rs.{totalPrice}
          </div>
        </ConfirmDialog>
      </main>
    </>
  );
};

export default Sales;
