"use client";

import Table from "@/app/components/shared/Table";
import callApi from "@/services/callApi";
import { setUsers } from "@/store/slice/usersSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "jalali-moment";
import DialogWrapper from "@/app/components/shared/DialogWrapper";
import { Button } from "@mui/material";
const columns = [
  { field: "_id", headerName: "ID", width: 250, resizable: false },
  {
    field: "mobile",
    headerName: "Mobile",
    width: 160,
    resizable: false,
  },
  {
    field: "isAdmin",
    headerName: "Admin",
    width: 90,
    resizable: false,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 120,
    resizable: false,
    valueFormatter: (params) =>
      moment(params.value).locale("fa").format("YYYY/MM/DD"),
  },
];
export default function UsersTable() {
  const [deleteModal, setDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null); // State to hold the user to be deleted
  const users = useSelector((state) => state.users.list);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const result = await callApi().get("/user/users?page=2&limit=10");
        dispatch(setUsers(result.data));
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, [dispatch]);

  const handleDelete = async () => {
    if (userToDelete) {
      try {
        const result = await callApi().delete(`/user/users/${userToDelete}`);
        console.log(result);
        dispatch(setUsers(users.filter((user) => user._id !== userToDelete)));
        setDeleteModal(false);
        setUserToDelete(null);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSave = async (id, updatedRow) => {
    const user = users.find((user) => user._id === id);
    const updatedUser = {
      ...user,
      isAdmin: updatedRow?.isAdmin?.value ?? user.isAdmin,
      mobile: updatedRow?.mobile?.value ?? user.mobile,
    };
    try {
      await callApi().put(`/user/users/${id}`, updatedUser);
      const result = await callApi().get("/user/users?page=2&limit=10");
      dispatch(setUsers(result.data));
    } catch (error) {
      console.log(error);
    }
  };

  const dialogActions = (
    <>
      <Button
        onClick={() => setDeleteModal(false)}
        color="error"
        variant="outlined"
        className="!ml-2"
      >
        لغو
      </Button>
      <Button onClick={handleDelete} color="primary" variant="contained">
        تایید
      </Button>
    </>
  );

  return (
    <>
      <DialogWrapper
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        title="حذف کاربر"
        actions={dialogActions}
      >
        <div className="text-red-700 py-8 w-72 text-center">
          آیا از حذف کاربر اطمینان دارید؟
        </div>
      </DialogWrapper>
      <div className="flex flex-col gap-8 w-[50%] h-[445px]">
        <h1 className="text-gray-200 font-bold text-4xl">Users List</h1>
        <Table
          columns={columns}
          rows={users}
          page={0}
          pageSize={5}
          getRowId={(row) => row._id}
          onDelete={(id) => {
            setUserToDelete(id);
            setDeleteModal(true);
          }}
          onSave={handleSave}
        />
      </div>
    </>
  );
}
