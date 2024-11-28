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
      header: 'Product',
      cell: ({ getValue }) => {
        const value = getValue();
        return !value ? <span className="text-red-600">No Value</span> : <span className="font-semibold">{value}</span>;
      },
    },
    {
      accessorKey: 'CATEGORY',
      header: 'Category'
    },
    {
      accessorKey: 'BUYING_PRICE',
      header: 'Price',
      cell: ({getValue}) => {
        const value = getValue();
        return !value ? <span className='text-red-600'>Null</span> : <span>&#8377; {value}</span>
      },
    },
    {
      accessorKey: 'QUANTITY',
      header: 'Available'
    },
    {
      accessorKey: 'UNIT',
      header: 'Unit'
    },
    {
      accessorKey: 'EXPIRY_DATE',
      header: 'Expiry Date'
    }
  ];

  return (
    <>
    <GenericProductTable
    columns={columns}
    getData={fetchProductTable}
    />
    </>
  );
}
 
export default InventoryTable;