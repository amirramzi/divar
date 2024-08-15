"use client";
import { SwipeableDrawer, Typography } from "@mui/material";
import DragHandleIcon from "@mui/icons-material/DragHandle";
const DrawerWrapper = ({ open, closeDrawer, openDrawer, title, children }) => {
  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={closeDrawer}
      onOpen={openDrawer}
      swipeAreaWidth={0}
      disableSwipeToOpen
      sx={{
        "& .MuiDrawer-paper": {
          width: "100%",
          height: "70%",
          maxHeight: "100%",
          borderTopRightRadius: "40px",
          borderTopLeftRadius: "40px",
          backgroundColor: "#111827",
        },
      }}
    >
      <div className="flex flex-col items-center justify-between">
        <DragHandleIcon color="primary" sx={{ fontSize: 60, mx: "auto" }} />

        <Typography variant="h5" color="white">
          {title}
        </Typography>
        <div className=" w-full px-10 py-5 text-white">{children}</div>
      </div>
    </SwipeableDrawer>
  );
};

export default DrawerWrapper;
