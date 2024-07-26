"use client";

import { BiSupport } from "react-icons/bi";
import { BiChat } from "react-icons/bi";
import Button from "@mui/material/Button";
import AccountMenu from "./account-menu/AccountMenu";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { openLoginModal } from "@/store/slice/loginSlice";

export default function NavList() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const addPostHandler = () => {
    if (user) {
      router.push("/new");
    } else {
      dispatch(openLoginModal());
    }
  };

  return (
    <div className=" gap-2 lg:flex">
      <AccountMenu />
      <Button
        variant="text"
        size="sm"
        startIcon={<BiChat className="w-5 h-5 ml-3" />}>
        <span>چت</span>
      </Button>
      <Button
        variant="text"
        size="sm"
        startIcon={<BiSupport className="w-5 h-5 ml-3" />}>
        <span>پشتیبانی</span>
      </Button>
      <Button variant="contained" size="sm" onClick={addPostHandler}>
        ثبت آگهی
      </Button>
    </div>
  );
}
