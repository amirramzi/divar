"use client";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import classes from "./SelectOption.module.css";
export default function SelectOption({ label, id, enumList }) {
  const [value, setValue] = useState("");
  const theme = useTheme();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className={`flex flex-col space-y-2 ${classes.div}`}>
      <label htmlFor={id} className="transition-colors duration-300">
        {label}
      </label>
      <Select
        className={`${classes.div}`}
        placeholder="انتخاب کنید"
        size="small"
      
        labelId={id}
        id={id + "-item"}
        value={value}
        onChange={handleChange}
        inputProps={{
          style: {
            color: "white",
          },
        }}
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.main,
          },
          "& .MuiSelect-select": {
            color: "white",
            display: "flex",
            justifyContent: "flex-start",
          },
          "& .MuiSelect-icon": {
            color: "white",
            position: "absolute",
            left: 0,
          },
        }}>
        {enumList.map((item, index) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}
