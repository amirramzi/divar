"use client ";
import React from "react";
import {
  Typography,
  ListItem,
  Menu,
  MenuHandler,
} from "@material-tailwind/react";
import { IoChevronDown } from "react-icons/io5";
import CategoryList from "./CategoryList";
import { Button } from "@mui/material";

const CategoryMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="hidden lg:block">
      <Menu
        open={isMenuOpen}
        dismiss={{ referencePress: false }}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 15, crossAxis: 325 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Button variant="outlined">
            <span className="!ml-2"> دسته بندی ها</span>
            <IoChevronDown
              strokeWidth={2.5}
              className={`hidden h-3 w-3 transition-transform lg:block ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
            <IoChevronDown
              strokeWidth={2.5}
              className={`block h-3 w-3 transition-transform lg:hidden ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        </MenuHandler>
        <CategoryList />
      </Menu>
    </div>
  );
};

export default CategoryMenu;
