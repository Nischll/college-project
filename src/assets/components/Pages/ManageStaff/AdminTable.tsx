import axios from "axios";
import GenericTable from "../../GenericComponents/GenericTable";
import Button from "../../GenericComponents/Button";
import GenericFormDialog from "../../GenericComponents/GenericFormDialogue.tsx";
import { useState } from "react";
import { toast } from "react-toastify";
import { Row } from "@tanstack/react-table";
import { useMutation } from "@tanstack/react-query";


const AdminTable = () => {

  const [openDialog, setOpenDialog] = useState(false);
  const [adminData, setAdminData] = useState(null);
  // const [data, setData] = useState([]);

  const fetchAdmin = async () => {
    const response = await axios.get("http://localhost:3000/signup/get/admins");
    // console.log(response.data);
    return response.data;
  };

  
  const handleOpenDialog = async (data: any) => {
    // console.log("Edit button clicked");
    setAdminData(data);
    console.log(data);
    setOpenDialog(true);
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
    // toast.error("Canceled", {
    //   autoClose: 1000,
    // });
    setAdminData(null);
  };
  
  const postFormData = useMutation({
    mutationKey:["update"],
    mutationFn(formData){
      return axios.put(`http://localhost:3000/signup/update/${adminData?.id}`, formData)
    }
  });

  const handleSubmit = async (formData: any) => {
    try {
      await postFormData.mutate(formData);
      toast.success("Data Updated Successfully", {
        autoClose: 1000,
      }); 
      setOpenDialog(false);
    } catch (error) {
      console.error("Error adding product:");
      toast.error("Failed to Update Data!", {
        autoClose: 1000,
      }); 
    }
  };
  
  const columns =[
    {
      header: 'S.No',
      cell: ({row}) => {
        return row.index + 1;
      },
    },
    // {
    //   accessorKey: 'ID',
    //   header: 'ID',
    // },
    {
      accessorKey: 'name',
      header: 'Name',
      enableColumnFilter: false,
    },
    {
      accessorKey: 'username',
      header: 'Username',
      enableSorting: false,
      enableColumnFilter: false,
    },
    // {
    //   accessorKey: 'password',
    //   header: 'Password',
    //   enableSorting: false,
    //   enableColumnFilter: false,
    //   cell: () => {
    //     // const value = getValue();
    //     return <span className="text-[#E19133]">**********</span>;
    //   },
    // },
    {
      accessorKey: 'role',
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
      cell: ({row}:{row: Row<any>}) => {
        const data = row.original;
          return (
            <div>
            <Button handleClick={() =>handleOpenDialog(data)} buttonName = {'Edit'}/>
              
          </div>
          )
      }
    },
  ];

  
  // FOR EDIT
  const fields = [
    { name: "NAME", id: "name", label: "Fullname", type: "text", required: true },
    { name: "USERNAME", id: "username", label: "Username", type: "text", required: true },
    // { name: "PASSWORD", id: "password", label: "Password", type: "text", required: true },
    { name: "ROLE", id: "role", label: "Role", type: "select", required: true,
      options: [
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
      ],
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

    <GenericFormDialog
      open={openDialog}
      onClose={handleCloseDialog}
      onSubmit={handleSubmit}
      defaultValues={adminData}
      title="Edit Admin Details"
      fields={fields}
      cancelButton="Discard"
      submitButton="Update"
    />
    </>
  );
}
 
export default AdminTable;