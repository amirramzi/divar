"use client";
import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
} from "@mui/material";
import { IoCloseSharp } from "react-icons/io5";

const DialogWrapper = ({
  open,
  onClose,
  onSubmit,
  title,
  children,
  actions,
  maxWidth,
  headerAction,
}) => {
  return (
    <Dialog
      maxWidth={maxWidth}
      open={open}
      onClose={onClose}
      PaperProps={{ component: "form", onSubmit: onSubmit }}
    >
      <DialogTitle className="font-bold flex justify-between ">
        <span>{title}</span>
        {headerAction ? (
          headerAction
        ) : (
          <IconButton color="error" onClick={onClose}>
            <IoCloseSharp />
          </IconButton>
        )}
      </DialogTitle>
      <Divider />
      <DialogContent className="overflow-x-hidden">{children}</DialogContent>
      <Divider />
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  );
};

export default DialogWrapper;
