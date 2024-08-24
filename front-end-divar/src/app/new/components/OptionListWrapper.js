"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  clearCategoryPost,
  setCategoryChild1,
  setCategoryChild2,
  setCategoryOption,
  setCities,
} from "@/store/slice/create-post-slice/createPostSlice";
import { useEffect, useState } from "react";
import PostForm from "./PostForm";
import callApi from "@/services/callApi";

const OptionListWrapper = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [currentState, setCurrentState] = useState(null);

  useEffect(() => {
    const getCities = async () => {
      try {
        const result = await callApi().get("/province/cities");
        dispatch(setCities(result.data));
      } catch (error) {
        console.log(error);
      }
    };
    getCities();
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const state = JSON.parse(localStorage.getItem("createPostState"));
      setCurrentState(state);
    }
  }, []);

  

  return (
    <div className="w-full max-w-[480px] flex flex-col space-y-2">
      <div className="bg-gray-900 rounded-md overflow-hidden px-10 py-4">
        <PostForm />
      </div>
    </div>
  );
};

export default OptionListWrapper;
