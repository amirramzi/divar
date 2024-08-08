"use client";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";

import { v4 as uuidv4 } from "uuid";
import Whoami from "@/app/components/shared/Whoami";
import Logout from "@/app/components/shared/Logout";
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
    name: "تایید هویت",
    icon: <GppGoodOutlinedIcon />,
    href: "#",
    disabled: true,
  },
  {
    id: uuidv4(),
    name: "آگهی های من",
    icon: <PostAddOutlinedIcon />,
    href: "/my-divar/my-posts",
    disabled: false,
  },
  {
    id: uuidv4(),
    name: "پرداخت های من",
    icon: <CreditCardOutlinedIcon />,
    href: "#",
    disabled: true,
  },
  {
    id: uuidv4(),
    name: "نشان ها",
    icon: <TurnedInNotOutlinedIcon />,
    href: "#",
    disabled: true,
  },
  {
    id: uuidv4(),
    name: "یادداشت ها",
    icon: <EditNoteOutlinedIcon />,
    href: "#",
    disabled: true,
  },
  {
    id: uuidv4(),
    name: "بازدید های اخیر",
    icon: <AccessTimeOutlinedIcon />,
    href: "#",
    disabled: true,
  },
  {
    id: uuidv4(),
    name: "گزارش کلاه برداری",
    icon: <SupportAgentOutlinedIcon />,
    href: "#",
    disabled: true,
  },
];
export default ListItem;
