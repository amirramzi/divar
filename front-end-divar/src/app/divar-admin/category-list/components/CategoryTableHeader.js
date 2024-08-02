"use client";

import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddCategoryForm from "./AddCategoryForm";
import { useState } from "react";

const CategoryTableHeader = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-gray-200 font-bold text-4xl">Category List</h1>
      <Button
        startIcon={<AddIcon />}
        variant="contained"
        onClick={() => {
          setOpen(true);
        }}
      >
        add category
      </Button>
      <AddCategoryForm open={open} setOpen={setOpen} />
    </div>
  );
};

export default CategoryTableHeader;
