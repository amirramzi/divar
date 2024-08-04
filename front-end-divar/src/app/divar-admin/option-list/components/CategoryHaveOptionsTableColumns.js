"use client";

import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";

const CategoryHaveOptionsTableColumns = (
  handleChildrenClick,
  handleAddCategoryClick
) => {
  return [
    { field: "_id", headerName: "ID", width: 250, resizable: false },
    { field: "name", headerName: "Name", width: 250, resizable: false },
    { field: "slug", headerName: "Slug", width: 250, resizable: false },
    {
      field: "option",
      headerName: "Option",
      width: 90,
      resizable: false,
      renderCell: (params) => (
        <IconButton
          aria-hidden="true"
          color="secondary"
          onClick={() => handleChildrenClick(params)}
        >
          <VisibilityIcon />
        </IconButton>
      ),
    },
    {
      field: "add option",
      headerName: "Add Option",
      width: 90,
      resizable: false,
      renderCell: (params) => (
        <IconButton
          aria-hidden="true"
          color="success"
          onClick={() => handleAddCategoryClick(params)}
        >
          <AddIcon />
        </IconButton>
      ),
    },
  ];
};

export default CategoryHaveOptionsTableColumns;
