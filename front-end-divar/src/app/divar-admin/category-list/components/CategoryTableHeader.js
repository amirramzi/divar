"use client";

import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const CategoryTableHeader = ({ onAddCategory }) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-gray-200 font-bold text-4xl">Category List</h1>
      <Button
        startIcon={<AddIcon />}
        variant="contained"
        onClick={onAddCategory}
      >
        add category
      </Button>
    </div>
  );
};

export default CategoryTableHeader;
