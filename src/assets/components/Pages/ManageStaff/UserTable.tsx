import axios from "axios";
import GenericTable from "../../extraComponents/GenericTable";

const UserTable = () => {

  const fetchSignupTable = async () => {
    const response = await axios.get("http://localhost:3000/signup/get/details");
    // console.log(response);
    return response.data;
  };

  const columns =[
    {
      header: 'S.No',
      cell: ({row}) => {
        return row.index + 1;
      },
    },
    {
      accessorKey: 'NAME',
      header: 'Name',
    },
    {
      accessorKey: 'EMAIL',
      header: 'Email',
    },
    {
      accessorKey: 'ROLE',
      header: 'Role',
      // cell: ({ getValue }) => {
      //   const value = getValue();
      //   return !value ? <span className="text-red-600">No Value</span> : <span>{value}</span>;
      // },
    },
    {
      header: 'Actions',
      
    }
  ];

  return (  
    <>
    <main className="flex flex-col bg-white h-full rounded-lg py-2 px-2">
      <GenericTable
      columns={columns}
      getData={fetchSignupTable}
      pageSize={10}
      />
    </main>
    </>
  );
}
 
export default UserTable;