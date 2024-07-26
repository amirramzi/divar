"use client";
import {
  Checkbox,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";

export default function CityList({ children, isChecked, onChange }) {
  return (
    <ListItem className="p-0 my-2">
      <label
        htmlFor="vertical-list-react"
        className="flex w-full cursor-pointer items-center px-3 py-2">
        <ListItemPrefix className="mr-3">
          <Checkbox
            id="vertical-list-react"
            ripple={false}
            checked={isChecked}
            onChange={onChange}
            className="hover:before:opacity-0"
            containerProps={{
              className: "p-0",
            }}
          />
        </ListItemPrefix>
        <Typography color="blue-gray" className="font-medium pr-3">
          {children}
        </Typography>
      </label>
    </ListItem>
  );
}
