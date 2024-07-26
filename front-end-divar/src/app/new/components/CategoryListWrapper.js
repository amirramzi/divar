"use client";

import { Button, List } from "@mui/material";
const CategoryListWrapper = ({ children, back, btnName }) => {
  return (
    <div
      className={`w-full max-w-[380px] ${
        back ? "flex flex-col space-y-2" : " "
      }`}>
      {back ? (
        <Button variant="contained" onClick={back}>
          بازگشت به همه {btnName ? btnName : "دسته ها"}
        </Button>
      ) : (
        ""
      )}
      <div className=" bg-gray-900 rounded-md overflow-hidden px-4 ">
        <List>{children} </List>
      </div>
    </div>
  );
};

export default CategoryListWrapper;
