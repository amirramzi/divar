"use client";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import { InputAdornment } from "@mui/material";

const formatNumber = (num) => {
  if (isNaN(num)) return num; // Return the original value if it's not a number
  return Number(num).toLocaleString("en-US");
};

export default function InputOption({
  label,
  id,
  value,
  error,
  touched,
  handleChange,
  handleBlur,
  multiline,
  rows,
  type,
  price,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const theme = useTheme();

  useEffect(() => {
    if (price && type === "number") {
      setInputValue(formatNumber(value));
    } else {
      setInputValue(value);
    }
  }, [value, price, type]);

  const handleInputChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, ""); // Remove commas for raw value
    if (type === "number" && /^\d*$/.test(rawValue)) {
      // Ensure only digits are entered
      const formattedValue = price ? formatNumber(rawValue) : rawValue;
      setInputValue(formattedValue);
      handleChange({ ...e, target: { ...e.target, value: formattedValue } });
    } else if (type !== "number") {
      setInputValue(e.target.value);
      handleChange(e);
    }
  };

  const handleInputBlur = (e) => {
    setIsFocused(false);
    handleBlur(e);
    if (price && type === "number") {
      setInputValue(formatNumber(e.target.value));
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <label
        htmlFor={id}
        className="transition-colors duration-300"
        style={{
          color:
            touched && error
              ? theme.palette.error.main
              : isFocused
              ? theme.palette.primary.main
              : "white",
        }}
      >
        {label}
      </label>
      <TextField
        type="text"
        size="small"
        placeholder={label}
        id={id}
        variant="outlined"
        color="primary"
        onFocus={() => setIsFocused(true)}
        onBlur={handleInputBlur}
        onChange={handleInputChange}
        value={inputValue || ""}
        error={touched && Boolean(error)}
        multiline={multiline || false}
        rows={rows || 1}
        InputProps={
          price &&
          type === "number" && {
            endAdornment: (
              <InputAdornment position="end">
                <span className="text-white">تومان</span>
              </InputAdornment>
            ),
          }
        }
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
            "& input, & textarea": {
              color: "white !important",
            },
          },
        }}
      />
      {touched && error && (
        <div style={{ color: theme.palette.error.main }}>{error}</div>
      )}
    </div>
  );
}
