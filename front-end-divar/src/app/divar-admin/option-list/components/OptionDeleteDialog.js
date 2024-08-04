"use client";
import { Button } from "@mui/material";
import DialogWrapper from "@/app/components/shared/DialogWrapper";

export default function OptionDeleteDialog({
  open,
  onClose,
  optionToDelete,
  onDelete,
}) {
  return (
    <DialogWrapper
      open={open}
      onClose={onClose}
      title={`حذف ${optionToDelete?.title || "آپشن"}`}
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
          {" " + optionToDelete?.title + " " || "این دسته بندی"}
        </span>
        اطمینان دارید؟
      </div>
    </DialogWrapper>
  );
}
