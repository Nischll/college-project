import { useEffect, useState } from "react";
import GenericFormDialog from "../../GenericComponents/GenericFormDialogue.tsx.tsx";
import axios from "axios";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import InventoryTable from "./InventoryTable.tsx";
import GenerateExcel from "../../GenericComponents/GenerateExcel.tsx";
import OverallInventory from "./OverallInventory.tsx";

const Inventory = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [prodouctData, setProductData] = useState([]);

  const productFields = [
    { id: "product_name", label: "Product Name", type: "text", required: true },
    {
      id: "category",
      label: "Category",
      type: "select",
      options: [
        { label: "Kitchen Supplies", value: "kitchen supplies" },
        { label: "Beverages", value: "beverages" },
        { label: "Noodles", value: "noodles" },
        { label: "Snacks", value: "snacks" },
        { label: "Household Supplies", value: "household supplies" },
        { label: "Dairy & Eggs", value: "dairy and eggs" },
        { label: "Personal Care", value: "personal care" },
        { label: "Sweets & Chocolates", value: "sweets and chocolates" },
        { label: "Others", value: "others" },
      ],
      required: true,
    },
    {
      id: "buying_price",
      label: "Price",
      type: "number",
      required: true,
      validate: (value) => {
        return value >= 0 || "Price cannot be negative";
      },
    },
    {
      id: "quantity",
      label: "Quantity",
      type: "number",
      required: true,
      validate: (value) => {
        return value >= 0 || "Quantity cannot be negative";
      },
    },
    { id: "unit", label: "Unit", type: "text", required: true },
    {
      id: "expiry_date",
      label: "Expiry Date",
      type: "date",
      slotProps: {
        inputLabel: { shrink: true },
      },
      validate: (value) => {
        const today = new Date();
        const selectedDate = new Date(value);
        return selectedDate >= today || "Expiry date cannot be in the past";
      },
      required: true,
    },
  ];
    

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    // toast.error("Cancel to Add Product", {
    //   autoClose: 1000,
    // });
  };

  const postFormData = useMutation({
    mutationKey: ["save"],
    mutationFn(formData) {
      return axios.post("http://localhost:3000/products", formData);
    },
  });

  const handleSubmit = async (formData: any) => {
    try {
      await postFormData.mutate(formData, {
        onSuccess: () => {
          toast.success("Producted Added Successfully", {
            autoClose: 1000,
          });
        },
        onError: () => {
          toast.error("Failed to Add Product!", {
            autoClose: 1000,
          });
        }
      });
    
    } catch (error) {
      console.error("Error adding product:");
      toast.error("Failed to Add Product!", {
        autoClose: 1000,
      });
    }
  };

  const fetchProductTable = async () => {
    const response = await axios.get("http://localhost:3000/getProducts");
    // console.log(response);
    setProductData(response.data);
    return response.data;
  };

  useEffect(() => {
    fetchProductTable();
  }, []);

  // const fetchCategoryCount = async () => {
  //   const response = await axios.get('http://localhost:3000/product/category/count');
  //   return response.data.no_of_category;
  // };
  // const fetchTotalProduct = async () => {
  //   const response = await axios.get('http://localhost:3000/product/count');
  //   return response.data.no_of_product;
  // };
  // const fetchTotalProductAmount = async () => {
  //   const response = await axios.get('http://localhost:3000/product/amount');
  //   return response.data.total_product_amount;
  // };
  // const fetchTotalLowStocks = async () => {
  //   const response = await axios.get('http://localhost:3000/product/stocks/low');
  //   return response.data.total_low_stocks;
  // };

  // const { data: totalCategories} = useQuery({
  //   queryKey: ['categoryCount'],
  //   queryFn: fetchCategoryCount,
  // });
  // const { data: totalProducts} = useQuery({
  //   queryKey: ['productCount'],
  //   queryFn: fetchTotalProduct,
  // });
  // const { data: totalProductsAmount} = useQuery({
  //   queryKey: ['productAmount'],
  //   queryFn: fetchTotalProductAmount,
  // });
  // const { data: totalLowStocks} = useQuery({
  //   queryKey: ['lowStocks'],
  //   queryFn: fetchTotalLowStocks,
  // });

  return (
    <>
      <OverallInventory />

      <main className="bg-white h-fit rounded-lg pt-2 px-2 mt-3">
        <header className="flex justify-between items-center h-[40px]">
          <h1 className="w-[86px] h-[28px] font-semibold text-[22px] leading-[26px] text-[#383E49]">
            Products
          </h1>
          <div className="flex gap-2">
            <button
              onClick={handleOpenDialog}
              className="bg-blue-600 hover:bg-blue-700 text-white py-[7px] px-[12px] rounded active:bg-blue-800"
            >
              Add Product
            </button>
            <GenerateExcel
              dataForExcel={prodouctData}
              fileName="Purchase Report"
            />
          </div>
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
          defaultValues={null}
        />

        <InventoryTable />
      </main>
    </>
  );
};

export default Inventory;
