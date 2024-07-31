"use client";

import { Button } from "@mui/material";
import * as XLSX from "xlsx"; // Use named imports

const ExcelFile = ({ data }) => {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    XLSX.writeFile(workbook, "DataSheet.xlsx");
  };

  return (
    <Button
      variant="contained"
      size="small"
      color="success"
      onClick={exportToExcel}
    >
      Excel
    </Button>
  );
};

export default ExcelFile;
