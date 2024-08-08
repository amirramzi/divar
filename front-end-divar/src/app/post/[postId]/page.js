"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PostPage = ({ params }) => {
  const [options, setOptions] = useState([]);
  const posts = useSelector((state) => state.post.confirmedPost);
  const post = posts?.find((item) => item._id === params.postId);

  useEffect(() => {
    console.log("Post options:", post?.options);
    if (post?.options) {
      const optionsArray = Object.entries(post.options).map(([key, value]) => ({
        key,
        value,
      }));
      setOptions(optionsArray);
    } else {
      setOptions([]);
    }
  }, [post]);

  return (
    <div>
      <h1>{post?.content}</h1>
      <h2>{post?.address?.formatted_address}</h2>
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
