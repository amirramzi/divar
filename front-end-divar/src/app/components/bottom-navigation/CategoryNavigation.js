"use client";
import React, { useEffect, useState } from "react";
import RestoreIcon from "@mui/icons-material/Restore";
import { BottomNavigationAction } from "@mui/material";
import callApi from "@/services/callApi";
import {
  setFirstCategory,
  setSecondCategory,
  setThirdCategory,
} from "@/store/slice/navigationCategory";
import DrawerWrapper from "../shared/DrawerWrapper";
import CategoryList from "@/app/new/components/CategoryList";
import { useDispatch, useSelector } from "react-redux";
import iconMapping from "../navbar/select-category/categoryIcon";

const CategoryNavigation = ({ open, setOpen, openDrawer }) => {
  const dispatch = useDispatch();
  const firstCategory = useSelector(
    (state) => state.navigationCategory.firstCategory
  );
  const secondCategory = useSelector(
    (state) => state.navigationCategory.secondCategory
  );
  const thirdCategory = useSelector(
    (state) => state.navigationCategory.thirdCategory
  );

  const closeDrawer = () => setOpen(false);

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
  const sendSlugFirstCategoryHandler = async (slug) => {
    try {
      const result = await callApi().post("/post/new", { slug });
      if (result.data.categories.length === 0) {
        closeDrawer();
      } else {
        dispatch(setSecondCategory(result.data.categories));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const sendSlugSecondCategoryHandler = async (slug) => {
    try {
      const result = await callApi().post("/post/new", { slug });

      if (result.data.categories.length === 0) {
        closeDrawer();
      } else {
        dispatch(setThirdCategory(result.data.categories));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendSlugThirdCategoryHandler = async (slug) => {
    try {
      closeDrawer();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <DrawerWrapper
        open={open}
        openDrawer={openDrawer}
        closeDrawer={closeDrawer}
        title="دسته بندی ها"
      >
        {!secondCategory
          ? firstCategory?.map((item) => {
              const Icon = iconMapping[item?.icon || ""];
              return (
                <CategoryList
                  key={item._id}
                  name={item.name}
                  href={`?slug=${item.slug}`}
                  icon={
                    <Icon strokeWidth={2} className="h-6 w-6 text-blue-800" />
                  }
                  onClick={() => sendSlugFirstCategoryHandler(item?.slug)}
                />
              );
            })
          : !thirdCategory
          ? secondCategory?.map((item) => {
              return (
                <CategoryList
                  key={item._id}
                  name={item.name}
                  href={`?slug=${item.slug}`}
                  onClick={() => sendSlugSecondCategoryHandler(item?.slug)}
                />
              );
            })
          : thirdCategory?.map((item) => {
              return (
                <CategoryList
                  key={item._id}
                  name={item.name}
                  href={`?slug=${item.slug}`}
                  onClick={() => sendSlugThirdCategoryHandler(item?.slug)}
                />
              );
            })}
      </DrawerWrapper>
    </>
  );
};

export default CategoryNavigation;
