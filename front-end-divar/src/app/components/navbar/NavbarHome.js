"use client";
import React from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@material-tailwind/react";

import SearchInput from "./SearchInput";

// Dynamic imports
const NavList = dynamic(() => import("./NavList"), { ssr: false });
const SelectProvinceModal = dynamic(
  () => import("./select-province/SelectProvinceModal"),
  { ssr: false }
);
const CategoryMenu = dynamic(() => import("./select-category/CategoryMenu"), {
  ssr: false,
});

export function NavbarHome() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <Navbar className="mx-auto w-screen px-4 py-2 mt-5 block">
      <div className="flex items-center justify-between text-blue-gray-900">
        <div className="flex items-center justify-between">
          {/* <SelectProvinceModal /> */}
          <CategoryMenu />
          <SearchInput />
        </div>
        <NavList />
      </div>
    </Navbar>
  );
}
