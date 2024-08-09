"use client";
import { Box, Button, IconButton, Typography } from "@mui/material";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import ShareIcon from "@mui/icons-material/Share";
const PostInformation = ({ post, options }) => {
  return (
    <div className="w-2/5 divide-y divide-gray-800 space-y-3">
      <Box>
        <Typography variant="h4" gutterBottom>
          {post[0]?.title}
        </Typography>
        <Typography variant="body2" color="InactiveCaptionText">
          دقایقی پیش در {post[0]?.address?.city} ,
          {post[0]?.address?.neighbourhood}
        </Typography>
      </Box>
      <div className="pt-3 flex justify-between">
        <div>
          <Button variant="contained" size="small" className="ml-2">
            اطلاعات تماس
          </Button>
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
