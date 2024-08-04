"use client";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

export default function SelectOption({
  label,
  id,
  enumList,
  value,
  error,
  touched,
  handleChange,
  handleBlur,
  setFieldTouched,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const theme = useTheme();

  const handleSelectChange = (event) => {
    handleChange(event); // Formik handleChange

    setFieldTouched(id, false, true); // Explicitly set the field as touched
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
      <Select
        size="small"
        labelId={id}
        id={id + "-item"}
        name={id} // Ensure the name attribute is added
        value={value || ""}
        onChange={handleSelectChange}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          handleBlur(e);
        }}
        inputProps={{
          style: {
            color: "white",
          },
        }}
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: touched && error ? theme.palette.error.main : "white",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.main,
          },
          "& .MuiSelect-select": {
            color: "white !important",
            display: "flex",
            justifyContent: "flex-start",
          },
          "& .MuiSelect-icon": {
            color: "white",
            position: "absolute",
            left: 0,
          },
        }}
      >
        {enumList.map((item) => (
          <MenuItem key={item.id} value={item.name}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
      {touched && error && (
        <div style={{ color: theme.palette.error.main }}>{error}</div>
      )}
    </div>
  );
}
