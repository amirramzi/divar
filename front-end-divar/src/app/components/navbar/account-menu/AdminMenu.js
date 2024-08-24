"use client";

import { MenuItem } from "@material-tailwind/react";
import Whoami from "../../shared/Whoami";
import Logout from "../../shared/Logout";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import RecommendIcon from "@mui/icons-material/Recommend";
import CategoryIcon from "@mui/icons-material/Category";
import TuneIcon from "@mui/icons-material/Tune";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import Link from "next/link";
import { useCallback } from "react";

const AdminMenu = ({ handleClose }) => {
  const closeHandler = useCallback(() => {
    handleClose();
  }, [handleClose]);
  const menuList = [
    {
      id: 1,
      name: "لیست کاربران",
      icon: <PeopleOutlineIcon color="primary" />,
      href: "/divar-admin/users-list",
    },
    {
      id: 2,
      name: "لیست دسته بندی ها",
      icon: <CategoryIcon color="primary" />,
      href: "/divar-admin/category-list",
    },
    {
      id: 3,
      name: "لیست آپشن ها",
      icon: <TuneIcon color="primary" />,
      href: "/divar-admin/option-list",
    },
    {
      id: 4,
      name: "آگهی های تایید شد",
      icon: <RecommendIcon color="primary" />,
      href: "/divar-admin/accepted-post",
    },
    {
      id: 5,
      name: "آگهی های در انتظار تایید",
      icon: <PendingActionsIcon color="primary" />,
      href: "/divar-admin/pending-post",
    },
    {
      id: 6,
      name: "آگهی های رد شده",
      icon: <NotInterestedIcon color="primary" />,
      href: "/divar-admin/failed-post",
    },
  ];
  return (
    <>
      <MenuItem onClick={closeHandler}>
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

export default AdminMenu;
