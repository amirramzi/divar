"use client";
import * as React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";

export default function Table({
  rows,
  columns,
  page,
  pageSize,
  getRowId,
  onDelete,
  onSave,
}) {
  const [editRowId, setEditRowId] = React.useState(null);
  const [editRowsModel, setEditRowsModel] = React.useState({});

  const handleEditClick = (id) => () => {
    setEditRowId(id);
  };

  const handleDeleteClick = (id) => () => {
    onDelete(id);
  };

  const handleSaveClick = (id) => () => {
    onSave(id, editRowsModel[id]);
    setEditRowId(null);
  };

  const handleCancelClick = () => {
    setEditRowId(null);
    setEditRowsModel({});
  };

  const handleEditRowsModelChange = (model) => {
    setEditRowsModel(model);
  };

  const actionColumn = {
    field: "actions",
    headerName: "Actions",
    width: 80,
    renderCell: (params) => {
      const isInEditMode = params.id === editRowId;
      return isInEditMode ? (
        <>
          <GridActionsCellItem
            icon={<SaveIcon />}
            label="Save"
            onClick={handleSaveClick(params.id)}
          />
          <GridActionsCellItem
            icon={<CancelIcon />}
            label="Cancel"
            onClick={handleCancelClick}
          />
        </>
      ) : (
        <>
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={handleEditClick(params.id)}
          />
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(params.id)}
          />
        </>
      );
    },
  };

  const editableColumns = columns.map((col) => {
    if (col.field === "isAdmin") {
      return {
        ...col,
        renderCell: (params) => {
          const isInEditMode = params.id === editRowId;
          return (
            <Switch
              checked={editRowsModel[params.id]?.isAdmin?.value ?? params.value}
              onChange={(e) => {
                const newValue = e.target.checked;
                setEditRowsModel((prev) => ({
                  ...prev,
                  [params.id]: {
                    ...prev[params.id],
                    isAdmin: { value: newValue },
                  },
                }));
              }}
              disabled={!isInEditMode}
            />
          );
        },
      };
    }
    if (col.field === "mobile") {
      return {
        ...col,
        renderCell: (params) => {
          const isInEditMode = params.id === editRowId;
          return (
            <TextField
              value={editRowsModel[params.id]?.mobile?.value ?? params.value}
              onChange={(e) => {
                const newValue = e.target.value;
                setEditRowsModel((prev) => ({
                  ...prev,
                  [params.id]: {
                    ...prev[params.id],
                    mobile: { value: newValue },
                  },
                }));
              }}
              disabled={!isInEditMode}
            />
          );
        },
      };
    }
    return col;
  });

  return (
    <div style={{ height: 380, width: "54%" }} dir="ltr">
      <DataGrid
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: grey[200],
            color: "black",
          },
          "& .MuiDataGrid-cell": {
            "&:nth-of-type(odd)": {
              backgroundColor: "white",
            },
            "&:nth-of-type(even)": {
              backgroundColor: grey[200],
            },
          },
          "& .MuiDataGrid-row": {
            "&:nth-of-type(odd) .MuiDataGrid-cell": {
              backgroundColor: "white",
            },
            "&:nth-of-type(even) .MuiDataGrid-cell": {
              backgroundColor: grey[200],
            },
          },
        }}
        className="bg-white"
        rows={rows}
        columns={[...editableColumns, actionColumn]}
        getRowId={getRowId}
        initialState={{
          pagination: {
            paginationModel: { page: page, pageSize: pageSize },
          },
        }}
        pageSizeOptions={[5, 10]}
        editRowsModel={editRowsModel}
        onEditRowsModelChange={handleEditRowsModelChange}
      />
    </div>
  );
}
