"use client";

import Table from "@/app/components/shared/Table";

const CategoryTableBody = ({ columns, rows, onDelete, onSave }) => {
  return (
    <Table
      columns={columns}
      rows={rows}
      page={0}
      pageSize={5}
      getRowId={(row) => row._id}
      onDelete={onDelete}
      onSave={onSave}
    />
  );
};

export default CategoryTableBody;
