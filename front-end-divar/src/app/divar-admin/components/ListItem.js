"use client";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";

import { v4 as uuidv4 } from "uuid";
import Whoami from "@/app/components/shared/Whoami";

const ListItem = [
  {
    id: uuidv4(),
    name: <Whoami />,
    icon: <PersonOutlineOutlinedIcon />,
    href: "#",
    disabled: false,
  },
  {
    id: uuidv4(),
    name: "لیست کاربران",
    icon: <GppGoodOutlinedIcon />,
    href: "/divar-admin/users-list",
    disabled: false,
  },
  {
    id: uuidv4(),
    name: "لیست ادمین ها",
    icon: <GppGoodOutlinedIcon />,
    href: "/divar-admin/admin-list",
    disabled: false,
  },
  {
    id: uuidv4(),
    name: "آگهی های تایید نشده",
    icon: <PostAddOutlinedIcon />,
    href: "/divar-admin/not-confirmed-post",
    disabled: false,
  },
  {
    id: uuidv4(),
    name: "لیست دسته بندی ها",
    icon: <CreditCardOutlinedIcon />,
    href: "/divar-admin/category-list",
    disabled: false,
  },
  {
    id: uuidv4(),
    name: "لیست آپشن های دسته بندی",
    icon: <TurnedInNotOutlinedIcon />,
    href: "/divar-admin/option-list",
    disabled: false,
  },
];
export default ListItem;
