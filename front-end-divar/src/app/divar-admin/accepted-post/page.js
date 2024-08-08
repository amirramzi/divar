"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "@/app/components/shared/post/PostCard";
import callApi from "@/services/callApi";
import { setConfirmedPost } from "@/store/slice/postSlice";

const ConfirmedPost = () => {
  const confirmedPost = useSelector((state) => state.post.confirmedPost);
  const dispatch = useDispatch();
  useEffect(() => {
    const getConfirmedPost = async () => {
      try {
        const result = await callApi().get("/post/all");
        const processedPosts = result.data.posts.map((post) => ({
          ...post,
          address: JSON.parse(post.address),
          options: JSON.parse(post.options),
        }));
        dispatch(setConfirmedPost(processedPosts));
      } catch (error) {
        console.log(error);
      }
    };
    getConfirmedPost();
  }, []);

  return (
    <div className=" flex flex-wrap justify-center space-y-5 lg:space-y-0  lg:gap-5">
      {confirmedPost?.map((post) => {
        const imageUrl = `${
          process.env.NEXT_PUBLIC_API_BASE_URL
        }/${post.images[0]?.replace(/\\/g, "/")}`;

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
          />
        );
      })}
    </div>
  );
};
export default ConfirmedPost;
