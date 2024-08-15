import React, { useState } from "react";
import { Button } from "@mui/material";
import callApi from "@/services/callApi";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Message from "@/app/components/shared/Message";

const AdminAction = ({ post }) => {
  const [message, setMessage] = useState({
    message: null,
    variant: null,
  });
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const router = useRouter();
  const acceptedPostHandler = async () => {
    try {
      const result = await callApi().put(`/post/${post?._id}`, {
        confirm: "accepted",
      });
      if (result.status == 200) {
        setMessage({
          message: "آگهی مورد نظر تایید شد",
          variant: "success",
        });
        router.push("/divar-admin/pending-post");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const failedPostHandler = async () => {
    try {
      const result = await callApi().put(`/post/${post?._id}`, {
        confirm: "failed",
      });
      if (result.status == 200) {
        setMessage({
          message: "آگهی مورد نظر رد شد",
          variant: "success",
        });
        router.push("/divar-admin/pending-post");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deletePostHandler = async () => {
    try {
      const result = await callApi().delete(`/post/${post?._id}`);
      if (result.status == 200) {
        setMessage({
          message: result.data.message,
          variant: "success",
        });
        router.push("/divar-admin/pending-post");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {isAdmin && (
        <div className="flex justify-center w-full pb-8">
          <div className="bg-gray-800 rounded-md gap-4 px-4 py-2 flex justify-between">
            {post?.confirm == "accepted" ? (
              ""
            ) : (
              <Button
                variant="contained"
                color="success"
                onClick={acceptedPostHandler}
              >
                تایید آگهی
              </Button>
            )}
            {post?.confirm == "failed" ? (
              ""
            ) : (
              <Button
                variant="contained"
                color="warning"
                onClick={failedPostHandler}
              >
                رد آگهی
              </Button>
            )}
            <Button
              variant="contained"
              color="error"
              onClick={deletePostHandler}
            >
              حذف آگهی
            </Button>
          </div>
          <Message message={message.message} variant={message.variant} />
        </div>
      )}
    </>
  );
};

export default AdminAction;
