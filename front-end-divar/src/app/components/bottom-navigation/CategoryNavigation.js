"use client";
import React, { useState } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { IoCloseSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import useFetchCategories from "@/hooks/useFetchCategories"; // Update the import path as needed
import { RiMenu3Line } from "react-icons/ri";

const CategoryNavigation = () => {
  const [openBottom, setOpenBottom] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(0);
  const openDrawerBottom = () => setOpenBottom(true);
  const closeDrawerBottom = () => setOpenBottom(false);
  const category = useSelector((state) => state.category.list);

  // Fetch categories when the component mounts
  useFetchCategories();

  const handleOpenAccordion = (id) => {
    setOpenAccordion((prevOpen) => (prevOpen === id ? 0 : id));
  };

  return (
    <>
      <Button
        onClick={openDrawerBottom}
        className="rounded-none w-full flex flex-col justify-between gap-y-2">
        <RiMenu3Line className="w-full text-xl" />
        <span className="w-full text-nowrap">دسته ها</span>
      </Button>
      <Drawer
        placement="bottom"
        size={800}
        open={openBottom}
        onClose={closeDrawerBottom}
        className="p-4 overflow-scroll">
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            دسته بندی ها
          </Typography>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={closeDrawerBottom}>
            <IoCloseSharp
              className="h-5 w-5"
              strokeWidth={2}
              stroke="currentColor"
            />
          </IconButton>
        </div>
      </Drawer>
    </>
  );
};

export default CategoryNavigation;
