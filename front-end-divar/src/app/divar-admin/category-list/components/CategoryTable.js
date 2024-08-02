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
import CategoryTableColumns from "./CategoryTableColumns";

export default function CategoryTable() {
  const [categoryChildModal, setCategoryChildModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [rowHistory, setRowHistory] = useState([]);

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
  const handleAddCategoryClick = async (params) => {
    try {
      const result = await callApi().post("/category", {
        value,
      });
      dispatch(setCategoryChild(result.data.categories));
    } catch (error) {
      console.log(error);
    }
    setCategoryChildModal(true);
  };

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

  // Updated handleDelete function
  const handleDelete = async (id, categoryType) => {
    try {
      await callApi().delete(`/category/${id}`);

      if (categoryType === "parent") {
        dispatch(
          setCategoryParent(categoryParent.filter((cat) => cat._id !== id))
        );
      } else if (categoryType === "child") {
        dispatch(
          setCategoryChild(categoryChild.filter((cat) => cat._id !== id))
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Updated handleSave function
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

      if (categoryType === "parent") {
        await callApi().put(`/category/${id}`, updatedCategory);
        const result = await callApi().get("/post/new");
        dispatch(setCategoryParent(result?.data?.categories));
      } else if (categoryType === "child") {
        await callApi().put(`/category/${id}`, {
          slug: selectedRow.slug,
          ...updatedCategory,
        });
        const result = await callApi().post("/post/new", {
          slug: selectedRow.slug,
        });
        dispatch(setCategoryChild(result.data.categories));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const columns = CategoryTableColumns(
    handleChildrenClick,
    handleAddCategoryClick
  );

  return (
    <>
      <CategoryDialog
        open={categoryChildModal}
        onClose={() => setCategoryChildModal(false)}
        selectedRow={selectedRow}
        categoryChild={categoryChild}
        columns={columns}
        onBackClick={handleBackClick}
        onDelete={(id) => handleDelete(id, "child")}
        onSave={(id, updatedRow) => handleSave(id, updatedRow, "child")}
      />
      <div className="flex flex-col gap-8 w-[72%] h-[445px] mt-14">
        <CategoryTableHeader onAddCategory={() => {}} />
        <CategoryTableBody
          columns={columns}
          rows={categoryParent}
          onDelete={(id) => handleDelete(id, "parent")}
          onSave={(id, updatedRow) => handleSave(id, updatedRow, "parent")}
        />
      </div>
    </>
  );
}
