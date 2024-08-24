"use client";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export default function CategoryList({
  name,
  href,
  onClick,
  icon,
  disableArrowIcon,
}) {
  return (
    <>
      <Link href={href} onClick={onClick}>
        <ListItem disablePadding>
          <ListItemButton>
            {icon ? <ListItemIcon>{icon}</ListItemIcon> : ""}
            <ListItemText
              primary={name}
              sx={{
                textAlign: "right",
              }}
            />
            {disableArrowIcon ? (
              ""
            ) : (
              <ListItemIcon className="-ml-8">
                <ArrowBackIosIcon color="primary" />
              </ListItemIcon>
            )}
          </ListItemButton>
        </ListItem>
      </Link>
    </>
  );
}
