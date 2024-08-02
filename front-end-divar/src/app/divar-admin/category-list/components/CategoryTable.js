"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import callApi from "@/services/callApi";
import {
  setCategoryChild,
  setCategoryParent,
} from "@/store/slice/CategoryAdminSlice";
import CategoryTableHeader from "./CategoryTableHeader";
import CategoryTableBody from "./CategoryTableBody";
import CategoryDialog from "./CategoryDialog";
import Message from "@/app/components/shared/Message";
import CategoryDeleteDialog from "./CategoryDeleteDialog";
import AddCategoryForm from "./AddCategoryForm";
import CategoryTableColumns from "./CategoryTableColumns";

export default function CategoryTable() {
  const [categoryChildModal, setCategoryChildModal] = useState(false);
  const [addCategoryModal, setAddCategoryModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [rowHistory, setRowHistory] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [message, setMessage] = useState({
    message: null,
    type: null,
  });
  const categoryParent = useSelector((state) => state.categoryAdmin.parent);
  const categoryChild = useSelector((state) => state.categoryAdmin.child);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await callApi().get("/post/new");
        dispatch(setCategoryParent(result?.data?.categories));
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, [dispatch]);
  //child modal
  const handleChildrenClick = async (params) => {
    setRowHistory((prevHistory) => [...prevHistory, selectedRow]);
    setSelectedRow(params.row);
    try {
      const result = await callApi().post("/post/new", {
        slug: params.row.slug,
      });
      dispatch(setCategoryChild(result.data.categories));
    } catch (error) {
      console.log(error);
    }
    setCategoryChildModal(true);
  };
  //add category modal
  const handleAddCategoryClick = async (params) => {
    setSelectedRow(params.row);
    setAddCategoryModal(true);
  };
  //back child to parent
  const handleBackClick = async () => {
    const previousRow = rowHistory.pop();
    setRowHistory([...rowHistory]);
    setSelectedRow(previousRow);
    try {
      const result = await callApi().post("/post/new", {
        slug: previousRow.slug,
      });
      dispatch(setCategoryChild(result.data.categories));
    } catch (error) {
      console.log(error);
    }
    setCategoryChildModal(true);
  };
  //delete button
  const handleDelete = async () => {
    if (categoryToDelete) {
      try {
        const result = await callApi().delete(
          `/category/${categoryToDelete.id}`
        );

        if (result.status === 200) {
          setMessage({
            message: result.data.message,
            type: "success",
          });
          if (categoryToDelete.type === "parent") {
            const categoryParent = await callApi().get("/post/new");
            dispatch(setCategoryParent(categoryParent?.data?.categories));
          } else if (categoryToDelete.type === "child") {
            if (selectedRow) {
              const categoryChild = await callApi().post("/post/new", {
                slug: selectedRow.slug,
              });
              dispatch(setCategoryChild(categoryChild.data.categories));
            }
          }
          setDeleteModal(false);
          setCategoryToDelete(null);
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
  const handleSave = async (id, updatedRow, categoryType) => {
    try {
      const updatedCategory = {
        ...(categoryType === "parent"
          ? categoryParent.find((cat) => cat._id === id)
          : categoryChild.find((cat) => cat._id === id)),
        ...Object.fromEntries(
          Object.entries(updatedRow).map(([key, val]) => [key, val.value])
        ),
      };
      const result = await callApi().put(`/category/${id}`, updatedCategory);
      if (result.status === 200) {
        setMessage({ message: result.data.message, type: "success" });
        if (categoryType === "parent") {
          const categoryParent = await callApi().get("/post/new");
          dispatch(setCategoryParent(categoryParent?.data?.categories));
        } else if (categoryType === "child") {
          const categoryChild = await callApi().post("/post/new", {
            slug: selectedRow.slug,
          });
          dispatch(setCategoryChild(categoryChild?.data?.categories));
        }
      }
    } catch (error) {
      setMessage({
        message: error.response?.data?.message || "Error saving category",
        type: "error",
      });
    }
  };

  const columns = CategoryTableColumns(
    handleChildrenClick,
    handleAddCategoryClick
  );

  return (
    <>
      <AddCategoryForm
        open={addCategoryModal}
        setOpen={setAddCategoryModal}
        selectedRow={selectedRow}
      />
      <CategoryDialog
        open={categoryChildModal}
        onClose={() => setCategoryChildModal(false)}
        selectedRow={selectedRow}
        categoryChild={categoryChild}
        columns={columns}
        onBackClick={handleBackClick}
        onDelete={(id) => {
          const categoryToDelete = categoryChild.find((cat) => cat._id === id);
          setCategoryToDelete({
            id,
            type: "child",
            name: categoryToDelete.name,
          });
          setDeleteModal(true);
        }}
        onSave={(id, updatedRow) => handleSave(id, updatedRow, "child")}
      />
      <CategoryDeleteDialog
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        categoryToDelete={categoryToDelete}
        onDelete={handleDelete}
      />
      <div className="flex flex-col gap-8 w-[72%] h-[445px] mt-14">
        <CategoryTableHeader />
        <CategoryTableBody
          columns={columns}
          rows={categoryParent}
          onDelete={(id) => {
            const categoryToDelete = categoryParent.find(
              (cat) => cat._id === id
            );
            setCategoryToDelete({
              id,
              type: "parent",
              name: categoryToDelete.name,
            });
            setDeleteModal(true);
          }}
          onSave={(id, updatedRow) => handleSave(id, updatedRow, "parent")}
        />
      </div>
      {message.message && (
        <Message message={message.message} variant={message.type} />
      )}
    </>
  );
}
