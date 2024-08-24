"use client";

import { useSelector } from "react-redux";
function Whoami({ icon }) {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="flex flex-col pl-10 ">
      <div className="flex content-center text-sm ">
        {icon ?? ""}
        <span className={`${icon ? "" : ""}`}>کاربر دیوار</span>
      </div>
      <div className={`flex text-[10px]  ${icon ? "gap-x-2 pr-7 " : ""}`}>
        <span className="text-xs font-bold">تلفن </span>
        <span>{user}</span>
      </div>
    </div>
  );
}

export default Whoami;
