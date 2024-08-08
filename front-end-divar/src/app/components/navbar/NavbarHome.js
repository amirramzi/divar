"use client";
import React from "react";
import { Navbar } from "@material-tailwind/react";
import NavList from "./NavList";
import CategoryMenu from "./select-category/CategoryMenu";
import SelectProvinceModal from "./select-province/SelectProvinceModal";
import { Stack } from "@mui/material";

export function NavbarHome() {
  return (
    <Navbar className="mx-auto w-screen px-4 py-2 mt-5 block ">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Stack direction="row" spacing={8}>
          <SelectProvinceModal />
          <CategoryMenu />
        </Stack>
        <NavList />
      </div>
    </Navbar>
  );
}
