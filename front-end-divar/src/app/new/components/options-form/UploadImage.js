"use client";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useEffect, useState } from "react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function UploadImage({ formik, touched, error, handleBlur }) {
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleImageChange = (event) => {
    const files = Array.from(event.currentTarget.files);
    formik.setFieldValue("images", files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [imagePreviews]);

  return (
    <div className="space-y-2 py-6">
      <div>عکس آگهی</div>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
      >
        <CloudUploadIcon />
        <span className="pr-3">آپلود عکس</span>
        <VisuallyHiddenInput
          id="images"
          name="images"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          touched={touched}
          handleBlur={handleBlur}
        />
      </Button>
      {imagePreviews.length > 0 ? (
        <div className="flex justify-center flex-wrap py-2 px-2 gap-2 rounded-md w-fit  bg-gray-800">
          {imagePreviews.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`preview ${index}`}
              className="w-[70px] h-[70px] border border-gray-200"
            />
          ))}
        </div>
      ) : (
        <></>
      )}
      {touched && error && <div className="text-red-700">{error}</div>}
    </div>
  );
}
