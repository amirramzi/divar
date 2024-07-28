"use client";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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

export default function UploadImage({ value = [], error, touched, handleChange, handleBlur }) {
  const handleImageChange = (event) => {
    const files = event.target.files;
    handleChange({ target: { name: "images", value: files } });
  };

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
          type="file"
          id="images"
          name="images"
          multiple
          onChange={handleImageChange}
          onBlur={handleBlur}
        />
      </Button>
      {touched && error && <div className="error">{error}</div>}
    </div>
  );
}
