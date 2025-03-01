import axios from "axios";
import GenericTable from "../../GenericComponents/GenericTable";
import Button from "../../GenericComponents/Button";
import { Row } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import GenericFormDialog from "../../GenericComponents/GenericFormDialogue.tsx";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

const InventoryTable = () => {

  const [openDialog, setOpenDialog] = useState(false);
  const [productData, setProductData] = useState(null);

  const fetchProductTable = async () => {
    const response = await axios.get("http://localhost:3000/getProducts");
    console.log(response);
    return response.data;
  };

  const handleOpenDialog = async (data: any) => {
    // console.log("Edit button clicked");
    setProductData(data);
    console.log(data);
    setOpenDialog(true);
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
    // toast.error("Canceled", {
    //   autoClose: 1000,
    // });
    setProductData(null);
  };

  const updateProduct = useMutation({
    mutationKey: ["update"],
    mutationFn: async (formData) => {
      const response = await axios.put(`http://localhost:3000/products/${productData?.product_id}`, formData);
      return response.data;
    }
  });
  

  const handleSubmit = async (formData: any) => {
    try {
      await updateProduct.mutate(formData, {
        onSuccess: () => {
          toast.success("Product Updated Successfully", {
            autoClose: 1000,
          });
          fetchProductTable();
          setOpenDialog(false);
        }
      });
      
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to Update Product!", {
        autoClose: 1000,
      });
    }
  };
  
  useEffect(() => {
    fetchProductTable();
  })

  const productFields = [
    // { id: "image", label: "Image", type: "file",InputLabelProps: { shrink: true }, required: false },
    { id: "product_name", label: "Product Name", type: "text", required: true, disabled:true },
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
      disabled: true,
    },
    {
      id: "buying_price",
      label: "Price",
      type: "number",
      required: true,
    },
    { id: "quantity", label: "Quantity", type: "number", required: true },
    { id: "unit", label: "Unit", type: "text", required: true, disabled: true, },
    {
      id: "expiry_date",
      label: "Expiry Date",
      type: "date",
      slotProps:{
        inputLabel: { shrink: true }, 
      },
      validate: (value: any) => {
        const today = new Date();
        const selectedDate = new Date(value);
        return selectedDate >= today || "Expiry date cannot be in the past";
      },
      required: true,
    },
  ];

  const columns = [
    {
      accessorKey:'product_id',
      header: 'S.No',
      cell: ({row}) => {
        return row.index + 1;
      },
      enableColumnFilter: false,
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
      header: 'Actions',
      enableSorting: false,
      cell: ({row}:{row: Row<any>}) => {
        const data = row.original;
          return (
            <div>
            <Button handleClick={() => handleOpenDialog(data)} buttonName = {'+'}/>
              
          </div>
          )
      }
    },
  ];

  return (
    <>
    <div className="flex flex-col h-[calc(100vh-296px)]">
      <GenericTable
        columns={columns}
        getData={fetchProductTable}
        pageSize={8}
      />

    <GenericFormDialog
      open={openDialog}
      onClose={handleCloseDialog}
      onSubmit={handleSubmit}
      defaultValues={productData}
      title="Edit Product"
      fields={productFields}
      cancelButton="Discard"
      submitButton="Update"
    />
    </div>
    </>
  );
};
 
export default InventoryTable;