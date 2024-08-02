"use client";
import { Button } from "@mui/material";
import DialogWrapper from "@/app/components/shared/DialogWrapper";

export default function CategoryDeleteDialog({
  open,
  onClose,
  categoryToDelete,
  onDelete,
}) {
  return (
    <DialogWrapper
      open={open}
      onClose={onClose}
      title={`حذف ${categoryToDelete?.name || "دسته بندی"}`}
      actions={
        <>
          <Button
            onClick={onClose}
            color="error"
            variant="outlined"
            className="!ml-2"
          >
            لغو
          </Button>
          <Button onClick={onDelete} color="primary" variant="contained">
            تایید
          </Button>
        </>
      }
    >
      <div className="text-gray-700 py-8 w-72 text-center">
        آیا از حذف
        <span className="text-red-700">
          {" " + categoryToDelete?.name + " " || "این دسته بندی"}
        </span>
        اطمینان دارید؟
      </div>
    </DialogWrapper>
  );
}
