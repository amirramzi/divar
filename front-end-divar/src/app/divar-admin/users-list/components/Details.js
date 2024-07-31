"use client";

import { useSelector } from "react-redux";
import { Badge } from "@mui/material";
import ExcelFile from "@/app/components/shared/ExcelFile";
import SendSms from "./SendSms";

const Details = () => {
  const users = useSelector((state) => state.users.list);

  const adminCount = users.filter((user) => user.isAdmin).length;
  const userCount = users.filter((user) => !user.isAdmin).length;
  const mobilePhones = users.map((user) => ({ mobile: user.mobile })); // Convert to array of objects
  const list = [
    { id: 1, name: "admin", count: adminCount },
    { id: 2, name: "user", count: userCount },
  ];
  return (
    <div className="flex flex-col gap-8 w-[300px] h-[445px]   ">
      <h1 className="text-gray-200 font-bold text-4xl">Details </h1>
      <div className="w-full h-full bg-gray-50 rounded-sm overflow-hidden">
        {list.map((item) => (
          <div
            key={item.id}
            className="px-10 py-3 flex justify-between odd:bg-gray-300"
          >
            <span>{item.name}</span>
            <div>
              <Badge badgeContent={item.count} color="warning" />
            </div>
          </div>
        ))}

        <div className="pl-10 pr-5 py-3 flex justify-between odd:bg-gray-300">
          <span>Mobile</span>
          <ExcelFile data={mobilePhones} />
        </div>
        <SendSms />
      </div>
    </div>
  );
};

export default Details;
