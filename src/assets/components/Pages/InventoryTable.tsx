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
      accessorKey: 'QUANTITY',
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
    }
  ];

  return (
    <>
    <GenericProductTable
    columns={columns}
    getData={fetchProductTable}
    pageSize={9}
    />
    </>
  );
}
 
export default InventoryTable;