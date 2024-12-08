import axios from "axios";
import GenericTable from "../../GenericComponents/GenericTable";
import Button from "../../GenericComponents/Button";
import TrashButton from "../../GenericComponents/TrashButton";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import GenericFormDialog from "../../GenericComponents/GenericFormDialogue.tsx";

const UsersTable = () => {
  const [openDialog, setOpenDialog] = useState(false);

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
          return <div className="flex flex-row gap-2">
            <Button handleClick={handleOpenDialog} buttonName = {'Edit'}/> 
            <TrashButton buttonName={'Remove'}/>
          </div>
        }
      }
    },
  ];

  const handleOpenDialog =() => {
    console.log('edit clicked');
    setOpenDialog(true);
  }
  
  const {data} = useQuery({
    queryKey: ['get'],
    queryFn: async () => {
      try{
        const response = await axios.get(`http://localhost:3000/signup/get/5`);
        // setData(response.data);
        return response.data;
      } catch{
        console.error('Error fetching data:');
      }
    }
  });
  
  const fields = [
    { name: "NAME", id: "name", label: "Fullname", type: "text", required: true },
    { name: "USERNAME", id: "username", label: "Username", type: "text", required: true },
    { name: "PASSWORD", id: "password", label: "Password", type: "text", required: true },
    { name: "ROLE", id: "role", label: "Role", type: "select", required: true,
      options: [
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
      ],
    },
  ];

  const handleCloseDialog = () => {
    setOpenDialog(false);
    toast.error("Canceled", {
      autoClose: 1000,
    });
  };


  return (  
    <>
    <main className="flex flex-col h-[calc(100%-30px)]">
      <GenericTable
      columns={columns}
      getData={fetchUsers}
      pageSize={10}
      />
    </main>

    <GenericFormDialog
      open={openDialog}
      onClose={handleCloseDialog}
      // onSubmit={handleSubmit}
      defaultValues={data}
      title="Edit Admin Details"
      fields={fields}
      cancelButton="Discard"
      submitButton="Update"
    />
    </>
  );
}
 
export default UsersTable;