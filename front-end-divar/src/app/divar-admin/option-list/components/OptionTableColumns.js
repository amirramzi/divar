"use client";

import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

const OptionTableColumns = (handleEnumClick) => {
  return [
    { field: "_id", headerName: "ID", width: 250, resizable: false },
    { field: "title", headerName: "Title", width: 150, resizable: false },
    { field: "key", headerName: "Key", width: 180, resizable: false },
    { field: "required", headerName: "Required", width: 90, resizable: false },
    {
      field: "type",
      headerName: "Type",
      width: 120,
      resizable: false,
    },
    {
      field: "enum",
      headerName: "Enum",
      width: 90,
      resizable: false,
      renderCell: (params) => {
        if (params.row.type === "array") {
          return (
            <IconButton
              aria-hidden="true"
              color="secondary"
              onClick={() => handleEnumClick(params)}
            >
              <VisibilityIcon />
            </IconButton>
          );
        }
        return null; // Return null if the type is not an array
      },
    },
  ];
};

export default OptionTableColumns;
