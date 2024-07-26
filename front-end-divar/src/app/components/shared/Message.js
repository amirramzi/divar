"use client";
import { useEffect } from "react";
import { useSnackbar } from "notistack";

function Message({ message, variant }) {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (message) {
      enqueueSnackbar(message, { variant });
    }
  }, [message, variant, enqueueSnackbar]);

  return null;
}

export default Message;
