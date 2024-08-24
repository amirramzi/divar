"use client";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
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
import AccountNavigation from "./AccountNavigation";

export default function Navigation() {
  const [value, setValue] = useState("recent");
  const [openCategory, setOpenCategory] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const openDrawer = () => {
    dispatch(setSecondCategory(null));
    dispatch(setThirdCategory(null));
    setOpenCategory(true);
  };

  const addPostHandler = () => {
    if (user) {
      router.push("/new");
    } else {
      dispatch(openLoginModal());
    }
  };
  const openAccountHandler = () => {
    if (user) {
      setOpenAccount(true);
    } else {
      dispatch(openLoginModal());
    }
  };
  return (
    <div className="fixed bottom-0 w-full bg-gray-200 lg:hidden">
      <BottomNavigation showLabels value={value} onChange={handleChange}>
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
          open={openCategory}
          setOpen={setOpenCategory}
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
          onClick={openAccountHandler}
        />
        <AccountNavigation
          open={openAccount}
          setOpen={setOpenAccount}
          openDrawer={() => setOpenAccount(true)}
        />
      </BottomNavigation>
    </div>
  );
}
