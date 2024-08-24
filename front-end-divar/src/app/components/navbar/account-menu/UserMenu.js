"use client";

import { MenuItem } from "@material-tailwind/react";
import Whoami from "../../shared/Whoami";
import Logout from "../../shared/Logout";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Link from "next/link";
import { useCallback } from "react";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
const UserMenu = ({ handleClose }) => {
  const closeHandler = useCallback(() => {
    handleClose();
  }, [handleClose]);
  const menuList = [
    {
      id: 1,
      name: "آگهی های من",
      icon: <PostAddOutlinedIcon color="primary" />,
      href: "/my-divar/my-posts",
    },
    {
      id: 2,
      name: "پرداخت های من",
      icon: <CreditCardOutlinedIcon color="primary" />,
      href: "/my-divar/my-posts",
    },
    {
      id: 3,
      name: "نشان ها",
      icon: <TurnedInNotOutlinedIcon color="primary" />,
      href: "/my-divar/my-posts",
    },
    {
      id: 4,
      name: "یادداشت ها",
      icon: <EditNoteOutlinedIcon color="primary" />,
      href: "/my-divar/my-posts",
    },
    {
      id: 5,
      name: "بازدید های اخیر",
      icon: <AccessTimeOutlinedIcon color="primary" />,
      href: "/my-divar/my-posts",
    },

    {
      id: 6,
      name: "گزارش کلاه برداری",
      icon: <SupportAgentOutlinedIcon color="primary" />,
      href: "/my-divar/my-posts",
    },
  ];
  return (
    <>
      <MenuItem onClick={closeHandler} >
        <Link href="/divar-admin/users-list">
          <Whoami icon={<AccountCircleOutlinedIcon color="primary" />} />
        </Link>
      </MenuItem>
      {menuList?.map((item) => (
        <MenuItem key={item.id} onClick={closeHandler}>
          <Link
            href={item.href}
            className="flex justify-start items-center gap-2"
          >
            {item.icon} <span> {item.name} </span>
          </Link>
        </MenuItem>
      ))}
      <MenuItem onClick={closeHandler}>
        <Logout />
      </MenuItem>
    </>
  );
};

export default UserMenu;
