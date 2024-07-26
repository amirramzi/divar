"use client";

import { Divider, List } from "@mui/material";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ListItem from "./ListItem";
import ItemBtn from "./ItemBtn";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import callApi from "@/services/callApi";
import { clearUser } from "@/store/slice/authSlice";

const SidebarItem = ({ open }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const logoutHandler = async () => {
    await callApi().get("/auth/logout");
    router.push("/");
    dispatch(clearUser());
  };
  return (
    <>
      <List>
        {ListItem.map((item) => (
          <ItemBtn
            key={item.id}
            name={item.name}
            href={item.href}
            icon={item.icon}
            disabled={item.disabled}
            open={open}
          />
        ))}
        <Divider />
        <ItemBtn
          name="دیوار برای کسب و کار ها"
          href=""
          icon={<SupportAgentOutlinedIcon />}
          disabled={true}
          open={open}
        />
        <Divider />
        <ItemBtn
          onClick={logoutHandler}
          name="خروج"
          href=""
          icon={<LogoutOutlinedIcon color="error" />}
          disabled={false}
          open={open}
        />
      </List>
    </>
  );
};

export default SidebarItem;
