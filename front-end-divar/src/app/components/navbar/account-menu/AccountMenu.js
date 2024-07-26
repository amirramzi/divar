import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Whoami from "../../shared/Whoami";

import ModalLoginForm from "../../form/ModalLoginForm";
import { VscAccount } from "react-icons/vsc";
import Logout from "../../shared/Logout";
import withAuth from "@/hooks/withAuth";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Link from "next/link";
function AccountMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
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
        startIcon={<VscAccount className="w-5 h-5 ml-3" />}>
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
        style={{ transform: "translateY(15px)" }} // Adjust the value to increase the distance
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}>
        <MenuItem onClick={handleClose}>
          <Link href={"/my-divar"}>
            <Whoami icon={<AccountCircleOutlinedIcon />} />
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>
          <Logout />
        </MenuItem>
      </Menu>
    </div>
  );
}
export default withAuth(AccountMenu, ModalLoginForm);
