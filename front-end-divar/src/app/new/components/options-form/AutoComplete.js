"use client";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useTheme } from "@mui/material";

export default function AutoComplete({
  options,
  handleChange,
  value,
  isOptionEqualToValue,
}) {
  const theme = useTheme();

  return (
    <Autocomplete
      disablePortal
      fullWidth
      id="combo-box-demo"
      options={options}
      autoComplete
      includeInputInList
      value={value}
      onChange={handleChange}
      getOptionLabel={(option) => option?.title || ""}
      isOptionEqualToValue={isOptionEqualToValue}
      renderOption={(props, option) => (
        <li {...props} key={option.key}>
          {option.title}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.primary.main,
            },
            "& .MuiInputBase-input": {
              color: "white", // Ensures the text inside the input is white
            },
            "& .MuiAutocomplete-clearIndicator": {
              color: "white", // Ensures the clear icon is white
            },
            "& .MuiAutocomplete-popupIndicator": {
              color: "white", // Ensures the dropdown icon is white
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "white !important", // Keeps the border white on hover
            },
            "&:hover .MuiInputBase-input": {
              color: "white !important", // Keeps the text white on hover
            },
            "&:hover .MuiAutocomplete-clearIndicator": {
              color: "white !important", // Keeps the clear icon white on hover
            },
            "&:hover .MuiAutocomplete-popupIndicator": {
              color: "white !important", // Keeps the dropdown icon white on hover
            },
            "&.Mui-focused:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.primary.main, // Keeps the border blue on focus hover
            },
            "&.Mui-focused:hover .MuiInputBase-input": {
              color: "white", // Keeps the text white on focus hover
            },
            "&.Mui-focused:hover .MuiAutocomplete-clearIndicator": {
              color: "white", // Keeps the clear icon white on focus hover
            },
            "&.Mui-focused:hover .MuiAutocomplete-popupIndicator": {
              color: "white", // Keeps the dropdown icon white on focus hover
            },
          }}
        />
      )}
    />
  );
}
