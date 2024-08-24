"use client";

import callApi from "@/services/callApi";
import { clearUser } from "@/store/slice/authSlice";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Link from "next/link";
import { useDispatch } from "react-redux";
function Logout({ icon }) {
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    await callApi().get("/auth/logout");

    dispatch(clearUser());
  };
  return (
    <Link
      href="/"
      onClick={logoutHandler}
      className="flex justify-start items-center gap-2"
    >
      <LogoutOutlinedIcon color="error" />
      {icon}
      <span>خروج</span>
    </Link>
  );
}

export default Logout;
