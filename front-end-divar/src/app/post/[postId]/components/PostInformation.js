"use client";

import { Box, Button, IconButton, Typography } from "@mui/material";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import ShareIcon from "@mui/icons-material/Share";
import callApi from "@/services/callApi";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { openLoginModal } from "@/store/slice/loginSlice";
import DialogWrapper from "@/app/components/shared/DialogWrapper";

const PostInformation = ({ post, options }) => {
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [mobile, setMobile] = useState(null);
  const dispatch = useDispatch();

  const showMobile = async () => {
    try {
      const result = await callApi().get("/user/whoami");
      console.log(result.data);

      if (result.status == 200) {
        setMobile(result?.data.mobile);
        setShowMobileModal(true);
      } else {
        dispatch(openLoginModal());
      }
    } catch (error) {
      dispatch(openLoginModal());
      console.log(error);
    }
  };

  return (
    <div className=" divide-y divide-gray-800 space-y-3">
      <DialogWrapper
        maxWidth="xl"
        open={showMobileModal}
        onClose={() => setShowMobileModal(false)}
        title="شماره تماس آگهی کننده"
      >
        <div className="w-96 flex justify-between items-center">
          <div>شماره تماس : {mobile}</div>
          <a href={`tel:${mobile}`}>
            <Button variant="contained" color="primary">
              تماس
            </Button>
          </a>
        </div>
      </DialogWrapper>
      <Box>
        <Typography variant="h4" gutterBottom>
          {post[0]?.title}
        </Typography>
        <Typography variant="body2" color="InactiveCaptionText">
          دقایقی پیش در {post[0]?.address?.city} ,{" "}
          {post[0]?.address?.neighbourhood}
        </Typography>
      </Box>
      <div className="pt-3 flex justify-between">
        <div className="flex justify-center items-center">
          <div className="ml-4">
            <Button variant="contained" size="small" onClick={showMobile}>
              اطلاعات تماس
            </Button>
          </div>
          <Button variant="outlined" size="small" color="error">
            چت
          </Button>
        </div>
        <div>
          <IconButton color="primary">
            <TurnedInNotIcon />
          </IconButton>
          <IconButton color="primary">
            <ShareIcon />
          </IconButton>
        </div>
      </div>
      {Array.isArray(options) &&
        options.map((item, index) => (
          <div key={index} className="flex justify-between pt-3 ">
            <p className="text-gray-500 font-bold"> {item.key}</p>
            <p>
              {item.value}
              <span className="mr-1">
                {item.key === "ودیعه" ? "تومان" : ""}
                {item.key === "اجاره\u0654 ماهانه" ? "تومان" : ""}
              </span>
            </p>
          </div>
        ))}
      <div className="pt-3">
        <h5 className="font-bold">توضیحات</h5>
        <p className="whitespace-pre-wrap ">{post[0]?.content}</p>
      </div>
    </div>
  );
};

export default PostInformation;
