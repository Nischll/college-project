import axios from "axios";
import GenericProductTable from "../extraComponents/GenericProductTable";

const InventoryTable = () => {

  const fetchProductTable = async () => {
    const response = await axios.get("http://localhost:3000/getProducts");
    // console.log(response);
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
      accessorKey:'PRODUCT_NAME',
      header: 'Products',
      cell: ({ getValue }) => {
        const value = getValue();
        return !value ? <span className="text-red-600">No Value</span> : <span>{value}</span>;
      },
    },
    {
      accessorKey: 'CATEGORY',
      header: 'Categories'
    },
    {
      accessorKey: 'BUYING_PRICE',
      header: 'Price',
      cell: ({getValue}) => {
        const value = getValue();
        return !value ? <span className='text-red-600'>Null</span> : <span>&#8377; {value}</span>
      },
      enableColumnFilter: false
    },
    {
      accessorKey: 'UNIT',
      header: 'Quantity',
      cell: ({ row }) => {
        const quantity = row.original.QUANTITY;
        const unit = row.original.UNIT;
        return `${quantity} ${unit}s`;
      },
      enableColumnFilter: false
    },
    {
      accessorKey: 'EXPIRY_DATE',
      header: 'Expiry Date',
      enableColumnFilter: false
    },
    {
      accessorKey: 'QUANTITY',
      header: 'Availability',
      cell: ({ getValue }) => {
        const value = getValue();
        // return !value ? <span>Out of Stock</span> : <span className="text-[#10A760]">In Stock</span>
        if(value === 0){
          return <span className="text-[#DA3E33]">Out of stock</span>;
        }else if(value < 10){
          return <span className="text-[#E19133]">Low stock</span>;
        }else{
          return <span className="text-[#10A760]">In stock</span>;
        }
      },
      enableColumnFilter: false,
      enableSorting: false,
    }
  ];

  return (
    <>
    <GenericProductTable
    columns={columns}
    getData={fetchProductTable}
    pageSize={8}
    />
    </>
  );
}
 
export default InventoryTable;