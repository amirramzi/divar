"use client";

import { useState } from "react";
import CategoryHaveOptionsTable from "./components/CategoryHaveOptionsTable";
import OptionTableDialog from "./components/OptionTableDialog";
import callApi from "@/services/callApi";
import { setEnum, setOptions } from "@/store/slice/CategoryAdminSlice";
import { useDispatch, useSelector } from "react-redux";
import OptionTableColumns from "./components/OptionTableColumns";
import EnumTableDialog from "./components/EnumTableDialog";
import AddOptionForm from "./components/AddOptionForm";
import OptionDeleteDialog from "./components/OptionDeleteDialog";
import Message from "@/app/components/shared/Message";

export default function MyPost() {
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedRowOption, setSelectedRowOption] = useState(null);
  const [optionModal, setOptionModal] = useState(false);
  const [enumModal, setEnumModal] = useState(false);
  const [addOptionModal, setAddOptionModal] = useState(false);
  const [optionToDelete, setOptionToDelete] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [message, setMessage] = useState({ message: null, type: null });
  const options = useSelector((state) => state.categoryAdmin.options);
  const enumRow = useSelector((state) => state.categoryAdmin.enum);
  const dispatch = useDispatch();
  //option modal
  const handleOptionClick = async (params) => {
    setSelectedRow(params.row);
    try {
      const result = await callApi().post("/post/new", {
        slug: params.row.slug,
      });
      dispatch(setOptions(result.data.options));
    } catch (error) {
      console.log(error);
    }
    setOptionModal(true);
  };
  const handleEnumClick = (params) => {
    setSelectedRowOption(params.row);
    dispatch(setEnum(params.row.enum));
    setEnumModal(true);
  };
  //add option modal
  const handleAddOptionClick = async (params) => {
    setSelectedRow(params.row);
    setAddOptionModal(true);
  };

  //delete button
  const handleDelete = async () => {
    if (optionToDelete) {
      try {
        const result = await callApi().delete(`/option/${optionToDelete.id}`);
        if (result.status === 200) {
          setMessage({
            message: result.data.message,
            type: "success",
          });
          let newOptions = options.filter((opt) => {
            return opt._id != optionToDelete.id;
          });
          dispatch(setOptions(newOptions));
          setDeleteModal(false);
          setOptionToDelete(null);
        }
      } catch (error) {
        console.log(error);
        setMessage({
          message: error.response?.data?.message || "Error deleting category",
          type: "error",
        });
      }
    }
  };
  //save button
  const handleSave = async (id, updatedRow) => {
    try {
      const updateOption = {
        ...options.find((opt) => opt._id === id),
        ...Object.fromEntries(
          Object.entries(updatedRow).map(([key, val]) => [key, val.value])
        ),
      };
      console.log(updateOption, id);
      const result = await callApi().put(
        `/option/${updateOption._id}`,
        updateOption
      );
      console.log(result);
    } catch (error) {}
  };

  const columns = OptionTableColumns(handleEnumClick);
  return (
    <div className=" text-white " dir="ltr">
      <CategoryHaveOptionsTable
        handleOptionClick={handleOptionClick}
        handleAddOptionClick={handleAddOptionClick}
      />
      <OptionTableDialog
        open={optionModal}
        onClose={() => setOptionModal(false)}
        selectedRow={selectedRow}
        options={options}
        columns={columns}
        onDelete={(id) => {
          const OptionToDelete = options.find((opt) => opt._id === id);
          setOptionToDelete({
            id,
            title: OptionToDelete.title,
          });
          setDeleteModal(true);
        }}
        onSave={(id, updatedRow) => handleSave(id, updatedRow)}
      />
      <OptionDeleteDialog
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        optionToDelete={optionToDelete}
        onDelete={handleDelete}
      />
      <EnumTableDialog
        open={enumModal}
        onClose={() => setEnumModal(false)}
        selectedRow={selectedRowOption}
        rows={enumRow}
      />
      <AddOptionForm
        open={addOptionModal}
        setOpen={setAddOptionModal}
        selectedRow={selectedRow}
      />
      {message.message && (
        <Message message={message.message} variant={message.type} />
      )}
    </div>
  );
}
