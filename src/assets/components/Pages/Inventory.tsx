// import ManageStores from "../Pages/ManageStores";
// import { Link } from "react-router-dom";
import { useState } from "react";
import GenericFormDialog from "../extraComponents/GenericFormDialogue.tsx";
import axios from "axios";

const Inventory = () => {

  // const products = [
  //   { id: 1, name: "Laptop", price: 100000 },
  //   { id: 2, name: "IPhone", price: 150000 },
  //   { id: 3, name: "Tablet", price: 250000 },
  // ];
  const [openDialog, setOpenDialog] = useState(false);

  const productFields = [
    { id: "product_name", label: "Product Name", type: "text", required: true },
    { id: "category", label: "Category", type: "text", required: true },
    { id: "buying_price", label: "Buying Price", type: "number", required: true },
    { id: "quantity", label: "Quantity", type: "number", required: true },
    { id: "expiry_date", label: "Expiry Date", type: "date", required: true },
    { id: "image", label: "Image URL", type: "url", required: false },
  ];

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleSubmit = async (formData) => {
    try {
      const response = await axios.post("http://localhost:3000/products", formData, {
        // headers: {
        //   "Content-Type": "application/json",
        // },
      });
      console.log("Product added successfully:", response.data);
    } catch (error) {
      console.error("Error adding product:", error.response || error.message);
    }
  };

  return (
    // <div>
    //   <h2>Available Products</h2>
    //   <div>
    //     {products.map((product) => (
    //       <ManageStores
    //         key={product.id}
    //         id={product.id}
    //         name={product.name}
    //         price={product.price}
    //       />
    //     ))}
    //   </div>
    //   <Link to="/layout/orders">
    //     <button className="bg-orange-400 rounded py-2 px-2 hover:bg-orange-500 my-3">View your Cart</button>
    //   </Link>
      
    // </div>

    <>
    <header className="bg-white h-[140px] rounded-lg py-2 px-2">
      <h1 className="h-[30px] font-medium text-[20px] leading-[30px] text-[#383E49] w-[163px]">Overall Inventory</h1>
      <div className="grid grid-cols-10 mt-2 h-[85px]">
        <section className="col-span-1 flex flex-col gap-[12px] h-fit">
          <h1 className="font-semibold h-[22px] text-[16px] text-[#1570EF] leading-[24px]">Categories</h1>
          <span className="h-[16px] leading-[20px] font-semibold text-[16px] text-[#5D6679]">14</span>
          <span className="h-[16px] font-normal text-[14px] leading-5 text-[#858D9D]">Last 7 days</span>
        </section>
        <section className="col-start-3 col-end-5 flex flex-col gap-[12px] h-fit">
          <h1 className="font-semibold h-[22px] text-[16px] text-[#E19133] leading-[24px]">Total Products</h1>
          <div className=" flex flex-col h-[56px] gap-[12px]">
            <div className="flex justify-between">
              <span className="h-[16px] leading-[20px] font-semibold text-[16px] text-[#5D6679]">868</span>
              <span className="h-[16px] leading-[20px] font-semibold text-[16px] text-[#5D6679]">&#8377;25000</span>
            </div>
            <div className="flex justify-between">
              <span className="h-[16px] font-normal text-[14px] leading-5 text-[#858D9D]">Last 7 days</span>
              <span className="h-[16px] font-normal text-[14px] leading-5 text-[#858D9D]">Revenue</span>
            </div>
          </div>
        </section>
        <section className="col-start-6 col-end-8 flex flex-col gap-[12px]">
          <h1 className="font-semibold h-[22px] text-[16px] text-[#845EBC] leading-[24px]">Top Selling</h1>
          <div className=" flex flex-col h-[56px] gap-[12px]">
            <div className="flex justify-between">
              <span className="h-[16px] leading-[20px] font-semibold text-[16px] text-[#5D6679]">5</span>
              <span className="h-[16px] leading-[20px] font-semibold text-[16px] text-[#5D6679]">&#8377;2500</span>
            </div>
            <div className="flex justify-between">
              <span className="h-[16px] font-normal text-[14px] leading-5 text-[#858D9D]">Last 7 days</span>
              <span className="h-[16px] font-normal text-[14px] leading-5 text-[#858D9D]">Cost</span>
            </div>
          </div>
        </section>
        <section className="col-start-9 col-end-11 flex flex-col gap-[12px]">
          <h1 className="font-semibold h-[22px] text-[16px] text-[#F36960] leading-[24px]">Low Stocks</h1>
          <div className=" flex flex-col h-[56px] gap-[12px]">
            <div className="flex justify-between">
              <span className="h-[16px] leading-[20px] font-semibold text-[16px] text-[#5D6679]">12</span>
              <span className="h-[16px] leading-[20px] font-semibold text-[16px] text-[#5D6679]">2</span>
            </div>
            <div className="flex justify-between">
              <span className="h-[16px] font-normal text-[14px] leading-5 text-[#858D9D]">Ordered</span>
              <span className="h-[16px] font-normal text-[14px] leading-5 text-[#858D9D]">Not in stock</span>
            </div>
          </div>
        </section>
      </div>
    </header>

    <main className="bg-white h-fit rounded-lg py-2 px-2 mt-3">
      <header className="flex justify-between items-center h-[40px]">
        <h1 className="w-[86px] h-[28px] font-normal text-[20px] leading-[26px] text-[#383E49]">Products</h1>
        <button onClick={handleOpenDialog} className="flex justify-center h-[35px] w-[116px] py-[7px] px-[12px] bg-[#1366D9] rounded font-normal h-[20px] text-[16px] leading-[20px] text-white">Add Product</button>
      </header>

      {/* Generic Form Dialog for Adding Product */}
      <GenericFormDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
        title="Add Product"
        fields={productFields}
      />
    </main>
    </>
  );
};

export default Inventory;
