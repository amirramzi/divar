"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  clearCategoryPost,
  setCategoryChild1,
  setCategoryChild2,
  setCategoryOption,
} from "@/store/slice/create-post-slice/createPostSlice";
import { useEffect, useState } from "react";
import PostForm from "./PostForm";

const OptionListWrapper = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [currentState, setCurrentState] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const state = JSON.parse(localStorage.getItem("createPostState"));
      setCurrentState(state);
    }
  }, []);

  const backHandler = () => {
    dispatch(setCategoryChild1(null));
    dispatch(setCategoryChild2(null));
    dispatch(setCategoryOption(null));
    dispatch(clearCategoryPost());
    if (currentState) {
      currentState.child1 = null;
      currentState.child2 = null;
      currentState.option = null;
      currentState.categoryPost = [];
      const state = JSON.parse(localStorage.getItem("createPostState"));
      state.child1 = null;
      state.child2 = null;
      state.option = null;
      state.categoryPost = [];
    }
    router.push("/new");
  };

  return (
    <div className="w-full max-w-[480px] flex flex-col space-y-2">
      <Button variant="contained" onClick={backHandler}>
        بازگشت به همه دسته ها
      </Button>
      <div className="bg-gray-900 rounded-md overflow-hidden px-10 py-4">
        <PostForm />
      </div>
    </div>
  );
};

export default OptionListWrapper;
