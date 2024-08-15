"use client";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FolderIcon from "@mui/icons-material/Folder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CategoryNavigation from "./CategoryNavigation";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ChatIcon from "@mui/icons-material/Chat";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  setSecondCategory,
  setThirdCategory,
} from "@/store/slice/navigationCategory";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { openLoginModal } from "@/store/slice/loginSlice";

export default function Navigation() {
  const [value, setValue] = useState("recent");
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const openDrawer = () => {
    dispatch(setSecondCategory(null));
    dispatch(setThirdCategory(null));
    setOpen(true);
  };

  const addPostHandler = () => {
    if (user) {
      router.push("/new");
    } else {
      dispatch(openLoginModal());
    }
  };
  return (
    <BottomNavigation
      showLabels
      className="fixed bottom-0 w-full bg-gray-200 lg:hidden"
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        onClick={() => router.push("/")}
        label="خانه"
        value="home"
        icon={<HomeIcon color="primary" />}
      />
      <BottomNavigationAction
        onClick={openDrawer}
        label="دسته بندی ها"
        value="category"
        icon={<CategoryIcon color="primary" />}
      />
      <CategoryNavigation
        open={open}
        setOpen={setOpen}
        openDrawer={openDrawer}
      />
      <BottomNavigationAction
        onClick={addPostHandler}
        label="ثبت آگهی"
        value="addPost"
        icon={<AddCircleIcon color="primary" />}
      />
      <BottomNavigationAction
        label="چت"
        value="Chat"
        icon={<ChatIcon color="primary" />}
      />
      <BottomNavigationAction
        label="دیوار من"
        value="account"
        icon={<AccountCircleIcon color="primary" />}
      />
    </BottomNavigation>
  );
}
