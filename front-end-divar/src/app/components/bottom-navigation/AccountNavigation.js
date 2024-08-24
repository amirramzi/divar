"use client";

import { MenuList } from "@mui/material";
import DrawerWrapper from "../shared/DrawerWrapper";
import AdminMenu from "../navbar/account-menu/AdminMenu";
import { useSelector } from "react-redux";
import UserMenu from "../navbar/account-menu/UserMenu";

const AccountNavigation = ({ open, setOpen, openDrawer }) => {
  const closeDrawer = () => setOpen(false);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <DrawerWrapper
        open={open}
        openDrawer={openDrawer}
        closeDrawer={closeDrawer}
        title="دیوار من"
      >
        <MenuList className="flex flex-col space-y-2">
          {isAdmin ? (
            <AdminMenu handleClose={handleClose} />
          ) : (
            <UserMenu handleClose={handleClose} />
          )}
        </MenuList>
      </DrawerWrapper>
    </>
  );
};

export default AccountNavigation;
