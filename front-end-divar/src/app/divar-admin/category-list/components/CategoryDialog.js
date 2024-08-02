"use client";

import { Button } from "@mui/material";
import DialogWrapper from "@/app/components/shared/DialogWrapper";
import Table from "@/app/components/shared/Table";

const CategoryDialog = ({
  open,
  onClose,
  selectedRow,
  categoryChild,
  columns,
  onBackClick,
  onDelete,
  onSave,
}) => {
  return (
    <DialogWrapper
      open={open}
      onClose={onClose}
      title="Children Dialog"
      maxWidth={"xl"}
    >
      {selectedRow ? (
        <div className="space-y-4 h-[430px] overflow-hidden">
          {selectedRow?.parents?.length > 0 ? (
            <Button variant="outlined" color="warning" onClick={onBackClick}>
              Back
            </Button>
          ) : (
            ""
          )}
          <Table
            columns={columns}
            rows={categoryChild}
            page={0}
            pageSize={10}
            getRowId={(row) => row._id}
            onDelete={onDelete}
            onSave={onSave}
          />
        </div>
      ) : (
        "Loading..."
      )}
    </DialogWrapper>
  );
};

export default CategoryDialog;
