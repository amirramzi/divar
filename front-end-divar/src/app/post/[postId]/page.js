"use client";
import callApi from "@/services/callApi";

import { Container, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import PostInformation from "./components/PostInformation";
import ImageSwiper from "./components/ImageSwiper";
import dynamic from "next/dynamic";
import PostAddress from "./components/PostAddress";
import AdminAction from "./components/AdminAction";
import { NavbarHome } from "@/app/components/navbar/NavbarHome";

const PostLocation = dynamic(() => import("./components/PostLocation"), {
  ssr: false,
});

const PostPage = ({ params }) => {
  const [post, setPost] = useState([]);
  const [options, setOptions] = useState([]);
  const [images, setImages] = useState(null);
  useEffect(() => {
    const getPost = async () => {
      try {
        const result = await callApi().get(`/post/one/${params.postId}`);
        const processedPost = result.data.post.map((post) => ({
          ...post,
          address: JSON.parse(post.address),
          options: JSON.parse(post.options),
        }));
        setPost(processedPost);
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, [params.postId]);

  useEffect(() => {
    if (post.length > 0) {
      if (post[0]?.options) {
        const optionsArray = Object.entries(post[0].options).map(
          ([key, value]) => ({
            key,
            value,
          })
        );
        setOptions(optionsArray);
      } else {
        setOptions([]);
      }
      if (post[0]?.images) {
        setImages(post[0]?.images);
      } else {
        setImages([]);
      }
    }
  }, [post]);

  return (
    <>
      <NavbarHome />
      <Container maxWidth="md" className="mt-5 p-4">
        <AdminAction post={post[0]} />

        <div className="flex flex-col lg:flex-row lg:justify-between lg:space-y-0">
          <div className="hidden lg:block w-full lg:w-2/5">
            <PostInformation post={post} options={options} />
          </div>
          <div className="w-full lg:w-2/4">
            <ImageSwiper images={images} alt={post[0]?.title} />
            <div className="block lg:hidden">
              <PostInformation post={post} options={options} />
            </div>
            <PostLocation
              lng={post[0]?.lng}
              lat={post[0]?.lat}
              address={post[0]?.address}
            />
            <PostAddress address={post[0]?.address} />
          </div>
        </div>
      </Container>
    </>
  );
};

export default PostPage;
