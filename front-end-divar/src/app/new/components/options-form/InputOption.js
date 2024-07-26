"use client";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";

export default function InputOption({ label, id }) {
  const [isFocused, setIsFocused] = useState(false);
  const theme = useTheme();

  return (
    <div className="flex flex-col space-y-2">
      <label
        htmlFor={id}
        className="transition-colors duration-300"
        style={{ color: isFocused ? theme.palette.primary.main : "white" }}>
        {label}
      </label>
      <TextField
        size="small"
        placeholder={label}
        id={id}
        variant="outlined"
        color="primary"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: theme.palette.primary.main,
            },
            "& input": {
              color: "white",
            },
          },
        }}
      />
    </div>
  );
}
