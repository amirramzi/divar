"use client";
import callApi from "@/services/callApi";

import { Container, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import PostInformation from "./components/PostInformation";
import ImageSwiper from "./components/ImageSwiper";
import dynamic from "next/dynamic";

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
        console.log("Processed Post:", processedPost);

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
    <Container maxWidth="md" className=" p-4">
      <Stack direction="row" justifyContent="space-between">
        <PostInformation post={post} options={options} />
        <div className="w-2/4">
          <ImageSwiper images={images} alt={post[0]?.title} />
          <PostLocation lng={post[0]?.lng} lat={post[0]?.lat} />
        </div>
      </Stack>
    </Container>
  );
};

export default PostPage;
