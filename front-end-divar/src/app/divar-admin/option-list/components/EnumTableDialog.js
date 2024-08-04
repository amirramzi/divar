"use client";

import DialogWrapper from "@/app/components/shared/DialogWrapper";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const EnumTableDialog = ({
  open,
  onClose,
  selectedRow,
  rows,
}) => {
  const columns = [{ field: "name", headerName: "Enum" }];
  return (
    <DialogWrapper
      open={open}
      onClose={onClose}
      title={` اینام های ${selectedRow?.title}`}
      maxWidth={"xl"}
    >
      {selectedRow ? (
        <div className="space-y-4 max-h-[250px] w-fit overflow-y-scroll overflow-x-hidden">
          <TableContainer component={Paper}>
            <Table
              sx={{
                minWidth: 250,
                overflowX: "hidden",
              }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  {columns.map((col) => (
                    <TableCell key={col.headerName}>{col.headerName}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows?.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        "Loading..."
      )}
    </DialogWrapper>
  );
};

export default EnumTableDialog;
