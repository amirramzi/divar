"use client";

import { useDispatch, useSelector } from "react-redux";
import callApi from "@/services/callApi";
import {
  clearCategoryPost,
  setCategoryChild1,
  setCategoryChild2,
  setCategoryOption,
  setCategoryPost,
} from "@/store/slice/create-post-slice/createPostSlice";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useState, useEffect, memo } from "react";
import CategoryList from "./components/CategoryList";

import iconMapping from "../components/navbar/select-category/categoryIcon";
import CategoryListWrapper from "./components/CategoryListWrapper";
import OptionListWrapper from "./components/OptionListWrapper";

function NewPost() {
  const [url, setUrl] = useState(null);
  const [btnName, setBtnName] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const path = usePathname();
  const categoryParent = useSelector((state) => state.createPost.parent);
  const categoryChild1 = useSelector((state) => state.createPost.child1);
  const categoryChild2 = useSelector((state) => state.createPost.child2);
  const categoryOption = useSelector((state) => state.createPost.option);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentState = JSON.parse(localStorage.getItem("createPostState"));
      // Use currentState as needed
    }
  }, []);

  const sendSlugHandler = async (slug, name, categoryId) => {
    try {
      const result = await callApi().post("/post/new", { slug });
      setUrl(`${path}?slug=${slug}`);
      setBtnName(name);
      dispatch(setCategoryPost(categoryId));
      dispatch(setCategoryChild1(result.data.categories));
    } catch (error) {
      console.log(error);
    }
  };

  const sendChild1SlugHandler = async (slug, categoryId) => {
    try {
      const result = await callApi().post("/post/new", { slug });
      dispatch(setCategoryPost(categoryId));
      dispatch(setCategoryChild2(result.data.categories));
    } catch (error) {
      console.log(error);
    }
  };

  const sendChild2SlugHandler = async (slug, categoryId) => {
    try {
      const result = await callApi().post("/post/new", { slug });
      dispatch(setCategoryPost(categoryId));
      console.log(categoryId);
      console.log(categoryChild2);
      dispatch(setCategoryOption(result.data?.options));
    } catch (error) {
      console.log(error);
    }
  };

  const backParent = () => {
    dispatch(setCategoryChild1(null));
    dispatch(clearCategoryPost());
    if (typeof window !== "undefined") {
      const currentState = JSON.parse(localStorage.getItem("createPostState"));
      currentState.child1 = null;
      currentState.child2 = null;
      currentState.option = null;
      currentState.categoryPost = [];

      localStorage.setItem("createPostState", JSON.stringify(currentState));
    }
    router.push("/new");
  };

  const backChild1 = () => {
    dispatch(setCategoryChild2(null));
    if (typeof window !== "undefined") {
      const currentState = JSON.parse(localStorage.getItem("createPostState"));
      currentState.child2 = null;
      currentState.option = null;
      currentState.categoryPost.pop();
      localStorage.setItem("createPostState", JSON.stringify(currentState));
    }
    router.push(url);
  };

  return (
    <div className="w-full h-full text-white flex justify-center pt-10">
      {!categoryOption ? (
        !categoryChild1 ? (
          <CategoryListWrapper>
            {categoryParent?.map((item) => {
              const Icon = iconMapping[item.icon];
              return (
                <CategoryList
                  key={item._id}
                  name={item.name}
                  href={`?slug=${item.slug}`}
                  icon={
                    <Icon strokeWidth={2} className="h-6 w-6 text-blue-800" />
                  }
                  onClick={() =>
                    sendSlugHandler(item?.slug, item?.name, item?._id)
                  }
                />
              );
            })}
          </CategoryListWrapper>
        ) : !categoryChild2 ? (
          <CategoryListWrapper back={backParent}>
            {categoryChild1?.map((item) => (
              <CategoryList
                key={item._id}
                name={item.name}
                href={`?slug=${item.slug}`}
                onClick={() => sendChild1SlugHandler(item?.slug, item?._id)}
              />
            ))}
          </CategoryListWrapper>
        ) : (
          <CategoryListWrapper back={backChild1} btnName={btnName}>
            {categoryChild2?.map((item) => (
              <CategoryList
                key={item._id}
                name={item.name}
                href={`?slug=${item.slug}`}
                onClick={() => sendChild2SlugHandler(item?.slug, item._id)}
              />
            ))}
          </CategoryListWrapper>
        )
      ) : (
        <OptionListWrapper />
      )}
    </div>
  );
}
export default memo(NewPost);
