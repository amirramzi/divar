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
      title={`فرزندهای ${selectedRow?.name}`}
      maxWidth={"xl"}
    >
      {selectedRow ? (
        <div className="space-y-4 h-fit overflow-hidden">
          {selectedRow?.parents?.length > 0 ? (
            <Button variant="outlined" color="warning" onClick={onBackClick}>
              Back
            </Button>
          ) : (
            ""
          )}
          {categoryChild?.length > 0 ? (
            <Table
              columns={columns}
              rows={categoryChild}
              page={0}
              pageSize={10}
              getRowId={(row) => row._id}
              onDelete={onDelete}
              onSave={onSave}
            />
          ) : (
            <div className="p-4">
              {" " + selectedRow?.name + " "}هیچ فرزندی ندارد
            </div>
          )}
        </div>
      ) : (
        "Loading..."
      )}
    </DialogWrapper>
  );
};

export default CategoryDialog;
