"use client";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import RecommendIcon from "@mui/icons-material/Recommend";
import CategoryIcon from "@mui/icons-material/Category";
import TuneIcon from "@mui/icons-material/Tune";
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
    icon: <PeopleOutlineIcon />,
    href: "/divar-admin/users-list",
    disabled: false,
  },
  {
    id: uuidv4(),
    name: "لیست دسته بندی ها",
    icon: <CategoryIcon />,
    href: "/divar-admin/category-list",
    disabled: false,
  },
  {
    id: uuidv4(),
    name: "لیست آپشن های دسته بندی",
    icon: <TuneIcon />,
    href: "/divar-admin/option-list",
    disabled: false,
  },
  {
    id: uuidv4(),
    name: "آگهی های تایید نشده",
    icon: <RecommendIcon />,
    href: "/divar-admin/not-confirmed-post",
    disabled: false,
  },
];
export default ListItem;
