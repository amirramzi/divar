"use client";
import callApi from "@/services/callApi";
import { useEffect, useState } from "react";

const PostPage = ({ params }) => {
  const [post, setPost] = useState([]);
  const [options, setOptions] = useState([]);

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
      console.log("Post options:", post[0]?.options);
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
    }
  }, [post]);

  return (
    <div>
      <div className="whitespace-pre-wrap">{post[0]?.content}</div>
      <h2>{post[0]?.address?.formatted_address}</h2>
      {Array.isArray(options) &&
        options.map((item, index) => (
          <div key={index} className="flex">
            <p>{item.key}</p>
            <p>{item.value}</p>
          </div>
        ))}
    </div>
  );
};

export default PostPage;
