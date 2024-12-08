import axios from "axios";
import GenericTable from "../../GenericComponents/GenericTable";
import UpdateButton from "../../GenericComponents/UpdateButton";
import DeleteButton from "../../GenericComponents/DeleteButton";

const UsersTable = () => {
  const fetchUsers = async () => {
    const response = await axios.get("http://localhost:3000/signup/get/users");
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
      accessorKey: 'NAME',
      header: 'Name',
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
        return <span className="text-[#10A760]">{value}</span>;
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
          return <div className="flex flex-row gap-2"><UpdateButton/> <DeleteButton/></div>
        }
      }
    },
  ]
  return (  
    <>
    <main className="flex flex-col h-[calc(100%-30px)]">
      <GenericTable
      columns={columns}
      getData={fetchUsers}
      pageSize={10}
      />
    </main>
    </>
  );
}
 
export default UsersTable;