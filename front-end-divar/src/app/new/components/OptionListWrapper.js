"use client";

import { Button, List } from "@mui/material";
import OptionList from "./OptionList";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  setCategoryChild1,
  setCategoryChild2,
  setCategoryOption,
} from "@/store/slice/createPostSlice";

import { useEffect, useState } from "react";

import MapWrapper from "./options-form/map/MapWrapper";
import UploadImage from "./options-form/UploadImage";
import InputOption from "./options-form/InputOption";
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
    if (currentState) {
      currentState.child1 = null;
      currentState.child2 = null;
      currentState.option = null;
      localStorage.setItem("createPostState", JSON.stringify(currentState));
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
