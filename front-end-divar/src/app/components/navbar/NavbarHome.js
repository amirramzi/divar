"use client";
import React from "react";
import { Navbar } from "@material-tailwind/react";
import NavList from "./NavList";
import CategoryMenu from "./select-category/CategoryMenu";
import SelectProvinceModal from "./select-province/SelectProvinceModal";
import { Stack } from "@mui/material";
import SearchInput from "./SearchInput";

export function NavbarHome() {
  return (
    <div className="w-full lg:w-fit bg-gray-200 mx-auto lg:bg-transparent">
      <Navbar className=" w-screen px-4 py-2 lg:mt-5 block bg-gray-200 ">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Stack direction="row" className="order-2 lg:-order-1">
            <SelectProvinceModal />
            <CategoryMenu />
          </Stack>
          <div className="lg:flex-grow lg:px-10">
            <SearchInput />
          </div>

          <NavList />
        </div>
      </Navbar>
    </div>
  );
}
