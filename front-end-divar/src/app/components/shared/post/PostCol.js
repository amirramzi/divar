"use client";

import { useDispatch, useSelector } from "react-redux";
import PostCard from "./PostCard";
import { useEffect } from "react";
import callApi from "@/services/callApi";
import { setConfirmedPost } from "@/store/slice/postSlice";

const PostCol = () => {
  const posts = useSelector((state) => state.post.confirmedPost);
  const dispatch = useDispatch();

  useEffect(() => {
    const get = async () => {
      try {
        const result = await callApi().get("/post/all");
        const processedPosts = result.data.posts.map((post) => ({
          ...post,
          address: JSON.parse(post.address),
          options: JSON.parse(post.options),
        }));
        dispatch(setConfirmedPost(processedPosts));
      } catch (error) {
        console.error(error);
      }
    };
    get();
  }, [dispatch]);

  return (
    <div className="w-full flex flex-wrap justify-center space-y-5 lg:space-y-0 lg:w-3/4 lg:gap-3 overflow-x-auto">
      {posts?.map((post) => {
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

export default PostCol;
