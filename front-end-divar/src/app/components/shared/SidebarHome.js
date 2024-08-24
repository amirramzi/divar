"use client";

import callApi from "@/services/callApi";
import { setFirstCategory } from "@/store/slice/navigationCategory";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import iconMapping from "../navbar/select-category/categoryIcon";
import CategoryList from "@/app/new/components/CategoryList";

const SidebarHome = () => {
  const dispatch = useDispatch();
  const firstCategory = useSelector(
    (state) => state.navigationCategory.firstCategory
  );
  useEffect(() => {
    const navigationCategory = async () => {
      try {
        const result = await callApi().get("/post/new");
        dispatch(setFirstCategory(result?.data?.categories));
      } catch (error) {
        console.log(error);
      }
    };
    navigationCategory();
  }, [dispatch]);
  return (
    <div className="w-1/6 hidden lg:block pr-5 ">
      <div className="fixed right-20 w-1/6">
        {firstCategory?.map((item) => {
          const Icon = iconMapping[item?.icon || ""];
          return (
            <CategoryList
              key={item._id}
              name={item.name}
              href={`?slug=${item.slug}`}
              icon={
                <Icon strokeWidth={2} className="h-6 w-6 -ml-5 text-gray-200" />
              }
              disableArrowIcon={true}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SidebarHome;
