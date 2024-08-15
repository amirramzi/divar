"use client";

import { IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
export default function SearchInput() {
  return (
    <OutlinedInput
      id="search"
      variant="outlined"
      fullWidth
      size="small"
      endAdornment={
        <InputAdornment position="end">
          <IconButton aria-label="search icon" edge="end">
            <SearchIcon color="primary" />
          </IconButton>
        </InputAdornment>
      }
    />
  );
}
