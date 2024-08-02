"use client";

import callApi from "@/services/callApi";
import { setCategoryParent } from "@/store/slice/create-post-slice/createPostSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import CategoryTable from "./components/CategoryTable";

export default function MyPost() {
  const dispatch = useDispatch();

  return (
    <div className=" text-white flex justify-center" dir="ltr">
      <CategoryTable />
    </div>
  );
}
