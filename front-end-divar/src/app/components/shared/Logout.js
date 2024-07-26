"use client";

import callApi from "@/services/callApi";
import { clearUser } from "@/store/slice/authSlice";

import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
function Logout({ icon }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const logoutHandler = async () => {
    await callApi().get("/auth/logout");
    router.push("/");
    dispatch(clearUser());
  };
  return (
    <div
      onClick={logoutHandler}
      className="flex content-center text-sm gap-x-2 text-gray-700 hover:text-black w-full">
      <LogoutOutlinedIcon fontSize="small" />
      {icon}
      <span>خروج</span>
    </div>
  );
}

export default Logout;
