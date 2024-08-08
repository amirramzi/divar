"use client";

import { Checkbox, ListItem, ListItemButton } from "@mui/material";

const CityList = ({ children, isChecked, onChange }) => {
  return (
    <ListItem
      secondaryAction={
        <Checkbox edge="end" onChange={onChange} checked={isChecked} />
      }
      disablePadding
    >
      <ListItemButton>{children}</ListItemButton>
    </ListItem>
  );
};
export default CityList;
