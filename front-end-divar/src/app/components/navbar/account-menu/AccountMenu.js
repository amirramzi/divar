"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import ModalLoginForm from "../../form/ModalLoginForm";
import { VscAccount } from "react-icons/vsc";
import withAuth from "@/hooks/withAuth";
import { useSelector } from "react-redux";
import AdminMenu from "./AdminMenu";
import UserMenu from "./UserMenu";
function AccountMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        variant="text"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        startIcon={<VscAccount className="w-5 h-5 ml-3" />}
      >
        دیوار من
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        style={{ transform: "translateY(15px)" }} 
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {isAdmin ? (
          <AdminMenu handleClose={handleClose} />
        ) : (
          <UserMenu handleClose={handleClose} />
        )}

      
      </Menu>
    </div>
  );
}
export default withAuth(AccountMenu, ModalLoginForm);
