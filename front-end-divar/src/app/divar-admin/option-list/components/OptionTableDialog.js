"use client";

import DialogWrapper from "@/app/components/shared/DialogWrapper";
import Table from "@/app/components/shared/Table";

const OptionTableDialog = ({
  open,
  onClose,
  selectedRow,
  options,
  columns,
  onDelete,
  onSave,
}) => {
  return (
    <DialogWrapper
      open={open}
      onClose={onClose}
      title={` آپشن های ${selectedRow?.name}`}
      maxWidth={"xl"}
    >
      {selectedRow ? (
        <div className="space-y-4 h-fit overflow-hidden">
          {options?.length > 0 ? (
            <Table
              actionMode={true}
              columns={columns}
              rows={options}
              page={0}
              pageSize={5}
              getRowId={(row) => row._id}
              onDelete={onDelete}
              onSave={onSave}
            />
          ) : (
            <div className="p-4">
              {" " + selectedRow?.name + " "}هیچ آپشنی ندارد
            </div>
          )}
        </div>
      ) : (
        "Loading..."
      )}
    </DialogWrapper>
  );
};

export default OptionTableDialog;
