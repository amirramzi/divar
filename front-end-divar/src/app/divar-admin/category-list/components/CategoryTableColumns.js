"use client";

import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";

const CategoryTableColumns = (handleChildrenClick, handleAddCategoryClick) => {
  return [
    { field: "_id", headerName: "ID", width: 250, resizable: false },
    { field: "name", headerName: "Name", width: 250, resizable: false },
    { field: "slug", headerName: "Slug", width: 250, resizable: false },
    {
      field: "children",
      headerName: "Children",
      width: 90,
      resizable: false,
      renderCell: (params) => (
        <IconButton
          color="secondary"
          onClick={() => handleChildrenClick(params)}
        >
          <VisibilityIcon />
        </IconButton>
      ),
    },
    {
      field: "add child",
      headerName: "Add Child",
      width: 90,
      resizable: false,
      renderCell: (params) => (
        <IconButton
          color="success"
          onClick={() => handleAddCategoryClick(params)}
        >
          <AddIcon />
        </IconButton>
      ),
    },
  ];
};

export default CategoryTableColumns;
