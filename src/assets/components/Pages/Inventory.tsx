import { useEffect, useState } from "react";
import GenericFormDialog from "../extraComponents/GenericFormDialogue.tsx";
import axios from "axios";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import InventoryTable from "./InventoryTable.tsx";

const Inventory = () => {

  const [openDialog, setOpenDialog] = useState(false);
  // const [totalCategories, setTotalCategories] = useState(null);

  const productFields = [
    // { id: "image", label: "Image", type: "file",InputLabelProps: { shrink: true }, required: false },
    { id: "product_name", label: "Product Name", type: "text", required: true },
    { id: "category", label: "Category", type: "select",
      options: [
        { label: "Kitchen Supplies", value: "kitchen supplies" },
        { label: "Beverages", value: "beverages" },
        { label: "Noodles", value: "noodles" },
        { label: "Snacks", value: "snacks" },
        { label: "Household Supplies", value: "household supplies" },
        { label: "Dairy & Eggs", value: "dairy and eggs" },
        { label: "Personal Care", value: "personal care" },
        { label: "Sweets & Chocolates", value: "sweets and chocolates" },
      ],
      required: true },
    { id: "buying_price", label: "Buying Price", type: "number", required: true },
    { id: "quantity", label: "Quantity", type: "number", required: true },
    { id: "unit", label: "Unit", type: "text", required: true },
    { id: "expiry_date", label: "Expiry Date", type: "date",
      InputLabelProps: { shrink: true },
      validate: (value) => {
      const today = new Date();
      const selectedDate = new Date(value);
      return selectedDate >= today || "Expiry date cannot be in the past";
    }, 
    required: true },
  ];

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    toast.error("Cancel to Add Product", {
      autoClose: 1000,
    });
  };

  const postFormData = useMutation({
    mutationKey:["save"],
    mutationFn(formData){
      return axios.post("http://localhost:3000/products", formData)
    }
  });

  const handleSubmit = async (formData) => {
    try {
      await postFormData.mutate(formData);
      toast.success("Producted Added Successfully", {
        autoClose: 2000,
      }); 
    } catch (error) {
      console.error("Error adding product:");
      toast.error("Failed to Add Product!", {
        autoClose: 2000,
      }); 
    }
  };

  // useEffect(() => {
  //   const fetchCategoryCount = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:3000/product/category/count');
  //       setTotalCategories(response.data.no_of_category);
  //       // console.log("Updated State:", response.data.no_of_category);
  //     } catch (error) {
  //       console.error("Error fetching category count", error);
  //     }
  //   };
  //   fetchCategoryCount();
  // }, []);
  
  const fetchCategoryCount = async () => {
    const response = await axios.get('http://localhost:3000/product/category/count');
    return response.data.no_of_category;
  };
  const fetchTotalProduct = async () => {
    const response = await axios.get('http://localhost:3000/product/count');
    return response.data.no_of_product;
  };
  const fetchTotalProductAmount = async () => {
    const response = await axios.get('http://localhost:3000/product/amount');
    return response.data.total_product_amount;
  };
  const fetchTotalLowStocks = async () => {
    const response = await axios.get('http://localhost:3000/product/stocks/low');
    return response.data.total_low_stocks;
  };


  const { data: totalCategories} = useQuery({
    queryKey: ['categoryCount'],
    queryFn: fetchCategoryCount,
  });
  const { data: totalProducts} = useQuery({
    queryKey: ['productCount'],
    queryFn: fetchTotalProduct,
  });
  const { data: totalProductsAmount} = useQuery({
    queryKey: ['productAmount'],
    queryFn: fetchTotalProductAmount,
  });
  const { data: totalLowStocks} = useQuery({
    queryKey: ['lowStocks'],
    queryFn: fetchTotalLowStocks,
  });
  

  return (
    <>
    <header className="bg-white h-[140px] rounded-lg py-2 px-2">
      <h1 className="h-[30px] font-medium text-[20px] leading-[30px] text-[#383E49] w-[163px]">Overall Inventory</h1>
      <div className="grid grid-cols-9 mt-2 h-[85px]">
        <section className="col-span-1 flex flex-col gap-[12px] h-fit">
          <h1 className="font-semibold h-[22px] text-[16px] text-[#1570EF] leading-[24px]">Categories</h1>
          <span className="h-[16px] leading-[20px] font-semibold text-[16px] text-[#5D6679]">{totalCategories}</span>
          <span className="h-[16px] font-normal text-[14px] leading-5 text-[#858D9D]">Last 7 days</span>
        </section>
        <section className="col-start-3 col-end-5 flex flex-col gap-[12px] h-fit">
          <h1 className="font-semibold h-[22px] text-[16px] text-[#E19133] leading-[24px]">Total Products</h1>
          <div className=" flex flex-col h-[56px] gap-[12px]">
            <div className="flex justify-between">
              <span className="h-[16px] leading-[20px] font-semibold text-[16px] text-[#5D6679]">{totalProducts}</span>
              <span className="h-[16px] leading-[20px] font-semibold text-[16px] text-[#5D6679]">&#8377;{totalProductsAmount}</span>
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
        <section className="col-start-9 col-end-10 flex flex-col gap-[12px]">
          <h1 className="font-semibold h-[22px] text-[16px] text-[#F36960] leading-[24px]">Low Stocks</h1>
          <div className=" flex flex-col h-[56px] gap-[12px]">
            <div className="flex justify-between">
              <span className="h-[16px] leading-[20px] font-semibold text-[16px] text-[#5D6679]">{totalLowStocks}</span>
              {/* <span className="h-[16px] leading-[20px] font-semibold text-[16px] text-[#5D6679]"></span> */}
            </div>
            <div className="flex justify-between">
              <span className="h-[16px] font-normal text-[14px] leading-5 text-[#858D9D]">Quantity less than 10</span>
              {/* <span className="h-[16px] font-normal text-[14px] leading-5 text-[#858D9D]">Not in stock</span> */}
            </div>
          </div>
        </section>
      </div>
    </header>

    <main className="bg-white h-fit rounded-lg py-2 px-2 mt-3">
      <header className="flex justify-between items-center h-[40px]">
        <h1 className="w-[86px] h-[28px] font-semibold text-[22px] leading-[26px] text-[#383E49]">Products</h1>
        <button onClick={handleOpenDialog} className="flex justify-center h-[35px] w-[116px] py-[7px] px-[12px] bg-[#1366D9] rounded font-normal h-[20px] text-[16px] leading-[20px] text-white hover:bg-[#1e1dc5] active:bg-[#2d1283]">Add Product</button>
      </header>

      {/* Generic Form Dialog for Adding Product */}
      <GenericFormDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
        title="New Product"
        fields={productFields}
        cancelButton="Discard"
        submitButton="Add Product"
      />

      <InventoryTable/>
    </main>
    </>
  );
};

export default Inventory;
