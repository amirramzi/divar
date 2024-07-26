"use client";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import React from "react";

const ItemBtn = ({ name, icon, href, disabled, open, onClick }) => {
  return (
    <ListItem disablePadding sx={{ display: "block" }} onClick={onClick}>
      <Link href={href}>
        <ListItemButton
          disabled={disabled}
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
            gap: 1,
          }}>
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}>
            {icon}
          </ListItemIcon>
          <ListItemText
            sx={{
              opacity: open ? 1 : 0,
              textAlign: "right",
            }}>
            {name}
          </ListItemText>
        </ListItemButton>
      </Link>
    </ListItem>
  );
};

export default ItemBtn;
