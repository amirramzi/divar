"use client";
import React from "react";
import { MenuItem, MenuList, Typography } from "@material-tailwind/react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "@/store/slice/categorySlice";
import iconMapping from "./categoryIcon";
import { IoChevronBackOutline } from "react-icons/io5";

const CategoryList = React.forwardRef((props, ref) => {
  const { list: category, activeTab } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  return (
    <div className="flex">
      <MenuList className="w-1/2 h-[465px] rounded-xl flex">
        <ul
          ref={ref}
          className="flex flex-col space-y-1 w-1/4 outline-none outline-0"
        >
          {category.map((item) => {
            const IconComponent = iconMapping[item.icon];

            return (
              <li
                className={`max-h-10 `}
                href="#"
                key={item._id}
                onMouseEnter={() => dispatch(setActiveTab(item._id))}
              >
                <MenuItem
                  className={`flex items-center gap-3 rounded-lg ${
                    activeTab === item._id
                      ? "bg-gray-400 hover:bg-gray-400 "
                      : ""
                  }`}
                >
                  <div
                    className={`flex items-center justify-center rounded-lg bg-blue-gray-50 p-2 ${
                      activeTab === item._id
                        ? "!bg-blue-500 hover:bg-blue-500 "
                        : ""
                    }`}
                  >
                    {IconComponent &&
                      (activeTab === item._id ? (
                        <IconComponent
                          strokeWidth={2}
                          className="h-4 text-gray-900 w-4"
                        />
                      ) : (
                        <IconComponent
                          strokeWidth={1}
                          className="h-4 text-gray-900 w-4"
                        />
                      ))}
                  </div>
                  <div className="flex justify-between w-full">
                    <Typography
                      variant="p"
                      color="blue-gray"
                      className="flex items-center text-xs font-bold"
                    >
                      {item.name}
                    </Typography>
                    {activeTab === item._id ? (
                      <IoChevronBackOutline
                        strokeWidth={1}
                        className="h-4 text-blue-800 w-4"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </MenuItem>
              </li>
            );
          })}
        </ul>
        <div className="w-1/4 flex flex-col flex-wrap space-x-14   pr-8 ">
          {category.map(
            (item) =>
              activeTab === item._id &&
              item.children.map((child) => (
                <div
                  key={uuidv4()}
                  className="transition-opacity duration-300 ease-in-out w-full "
                >
                  <p className="font-bold text-xs text-black py-2 hover:text-blue-900">
                    {child.name}
                  </p>
                  <ul className="w-full" key={uuidv4()}>
                    {child?.children.map((child2) => (
                      <li
                        key={uuidv4()}
                        className="text-gray-700 text-xs font-bold  py-1 pr-6 w-full hover:text-blue-800 last:mb-3"
                      >
                        {child2?.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
          )}
        </div>
      </MenuList>
    </div>
  );
});

CategoryList.displayName = "CategoryList";

export default CategoryList;
