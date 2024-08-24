"use client";

import PostCard from "@/app/components/shared/post/PostCard";
import callApi from "@/services/callApi";
import { setMyPost } from "@/store/slice/postSlice";
import { Button, Chip } from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function MyPost() {
  const myPost = useSelector((state) => state.post.myPost);
  const dispatch = useDispatch();
  useEffect(() => {
    const getMyPost = async () => {
      try {
        const result = await callApi().get("/post/my");
        const processedPosts = result.data.posts.map((post) => ({
          ...post,
          address: JSON.parse(post.address),
          options: JSON.parse(post.options),
        }));
        dispatch(setMyPost(processedPosts));
      } catch (error) {
        console.log(error);
      }
    };
    getMyPost();
  }, []);
  const checkSituation = (situation) => {
    if (situation === "accepted")
      return <Chip label="تایید" color="success" variant="outlined" />;
    if (situation === "pending")
      return (
        <Chip label="در انتظار تایید" color="secondary" variant="outlined" />
      );
    if (situation === "failed")
      return <Chip label="عدم تایید" color="error" variant="outlined" />;
  };
  return (
    <div className="w-full h-full overflow-x-auto">
      {myPost?.length == 0 ? (
        <div className="flex justify-center mt-56">
          <Link href="/new">
            <Button variant="contained">ثبت آگهی</Button>
          </Link>
        </div>
      ) : (
        <div className=" flex flex-wrap justify-center space-y-5 lg:space-y-0  lg:gap-5">
          {myPost?.map((post) => {
            const imageUrl = `${
              process.env.NEXT_PUBLIC_API_BASE_URL
            }/${post.images[0]?.replace(/\\/g, "/")}`;
            const situation = checkSituation(post.confirm);
            return (
              <PostCard
                key={post._id}
                title={post.title}
                deposit={post.options.ودیعه}
                rent={post.options["اجاره\u0654 ماهانه"]}
                img={imageUrl}
                id={post._id}
                time={post.createdAt}
                city={post.address.city}
                situation={situation}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
