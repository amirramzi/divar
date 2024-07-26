"use client ";
import React from "react";

import {
  Typography,
  ListItem,
  Menu,
  MenuHandler,
} from "@material-tailwind/react";
import { IoChevronDown } from "react-icons/io5";
import dynamic from "next/dynamic";

const CategoryList = dynamic(() => import("./CategoryList"), {
  ssr: false,
});

function CategoryMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        dismiss={{ referencePress: false }}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 15, crossAxis: 300 }}
        placement="bottom"
        allowHover={true}>
        <MenuHandler>
          <Typography as="div" variant="small" className="font-medium">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4 font-medium text-gray-900"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}>
              دسته بندی ها
              <IoChevronDown
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <IoChevronDown
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <CategoryList />
      </Menu>
    </React.Fragment>
  );
}

export default CategoryMenu;
