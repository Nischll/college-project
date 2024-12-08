import axios from "axios";
import GenericTable from "../../GenericComponents/GenericTable";
import UpdateButton from "../../GenericComponents/UpdateButton";

const AdminTable = () => {

  const fetchAdmin = async () => {
    const response = await axios.get("http://localhost:3000/signup/get/admins");
    console.log(response);
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
      enableColumnFilter: false,
    },
    {
      accessorKey: 'USERNAME',
      header: 'Username',
      enableSorting: false,
      enableColumnFilter: false,
    },
    {
      accessorKey: 'PASSWORD',
      header: 'Password',
      enableSorting: false,
      enableColumnFilter: false,
      cell: () => {
        // const value = getValue();
        return <span className="text-[#E19133]">**********</span>;
      },
    },
    {
      accessorKey: 'ROLE',
      header: 'Role',
      cell: ({ getValue }) => {
        const value = getValue();
        return <span className="text-[#DA3E33]">{value}</span>;
      },
      enableSorting: false,
      enableColumnFilter: false,
    },
    {
      header: 'Actions',
      enableSorting: false,
      cell: ({getValue}) => {
        const value = getValue();
        if(!value){
          return <div><UpdateButton/></div>
        }
      }
    },
  ];

  return (  
    <>
    <main className="flex flex-col h-[calc(100%-30px)]">
      <GenericTable
      columns={columns}
      getData={fetchAdmin}
      pageSize={50}
      enablePagination={false}
      />
    </main>
    </>
  );
}
 
export default AdminTable;