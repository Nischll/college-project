import axios from "axios";
import GenericTable from "../../GenericComponents/GenericTable";
import Button from "../../GenericComponents/Button";
import TrashButton from "../../GenericComponents/TrashButton";
import { useState } from "react";
import { toast } from "react-toastify";
import GenericFormDialog from "../../GenericComponents/GenericFormDialogue.tsx";
import { Row } from "@tanstack/react-table";
import { useMutation } from "@tanstack/react-query";
import ConfirmDialog from "../../GenericComponents/ConfirmDialog.tsx";

const UsersTable = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [usersData, setUsersData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);

  const fetchUsers = async () => {
    const response = await axios.get("http://localhost:3000/signup/get/users");
    return response.data;
  };

  const handleOpenDialog = (data: any) => {
    setUsersData(data);
    console.log("edit clicked", data);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setUsersData(null);
  };

  const postFormData = useMutation({
    mutationKey: ["update"],
    mutationFn(formData) {
      return axios.put(
        `http://localhost:3000/signup/update/${usersData?.id}`,
        formData
      );
    },
  });

  const deleteUsersData = useMutation({
    mutationKey: ["delete"],
    mutationFn() {
      return axios.delete(`http://localhost:3000/signup/delete/${deleteData?.id}`);
    },
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

  const handleDeleteDialog = (data: any) => {
    console.log("delete", data.id);
    setDeleteData(data);
    setOpenDeleteDialog(true);
  };

  const handleDeleteUsers = () => {
    deleteUsersData.mutate(
      deleteData,
      {
        onSuccess: () => {
          toast.success("User Deleted Successfully", {
            autoClose: 1000,
          });
          setOpenDeleteDialog(false);
          setDeleteData(null);
        },
        onError: () => {
          toast.error("Failed to Delete User!", {
            autoClose: 1000,
          });
        },
      }
    );
  };

  const columns = [
    {
      header: "S.No",
      cell: ({ row }) => {
        return row.index + 1;
      },
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "username",
      header: "Username",
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
      accessorKey: "role",
      header: "Role",
      cell: ({ getValue }) => {
        const value = getValue();
        return <span className="text-[#10A760]">{value}</span>;
      },
      enableSorting: false,
      enableColumnFilter: false,
    },
    {
      header: "Actions",
      enableSorting: false,
      cell: ({ row }: { row: Row<any> }) => {
        const data = row.original;
        return (
          <div className="flex flex-row gap-2">
            <Button
              handleClick={() => handleOpenDialog(data)}
              buttonName={"Edit"}
            />
            <TrashButton
              handleClick={() => handleDeleteDialog(data)}
              buttonName={"Remove"}
            />
          </div>
        );
      },
    },
  ];

  const fields = [
    {
      name: "NAME",
      id: "name",
      label: "Fullname",
      type: "text",
      required: true,
    },
    {
      name: "USERNAME",
      id: "username",
      label: "Username",
      type: "text",
      required: true,
    },
    // { name: "PASSWORD", id: "password", label: "Password", type: "text", required: true },
    {
      name: "ROLE",
      id: "role",
      label: "Role",
      type: "select",
      required: true,
      options: [
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
      ],
    },
  ];

  return (
    <>
      <main className="flex flex-col h-[calc(100%-30px)]">
        <GenericTable columns={columns} getData={fetchUsers} pageSize={10} />

        <GenericFormDialog
          open={openDialog}
          onClose={handleCloseDialog}
          onSubmit={handleSubmit}
          defaultValues={usersData}
          title="Edit Admin Details"
          fields={fields}
          cancelButton="Discard"
          submitButton="Update"
        />

        <ConfirmDialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
          onConfirm={() => {
            handleDeleteUsers(deleteData);
            
          }}
          title="Delete User"
          description="Are you sure you want remove this user!"
          cancellationText="Discard"
          confirmationText="Remove"
        />
      </main>
    </>
  );
};

export default UsersTable;
