"use client";
import React, { useState } from "react";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import ProvinceList from "./ProvinceList";
import { useDispatch } from "react-redux";
import { clearAllCheckboxes } from "@/store/slice/provinceSlice";
import { CiLocationOn } from "react-icons/ci";
export default function SelectProvinceModal() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isAllEnabled, setIsAllEnabled] = useState(true);

  const dispatch = useDispatch();
  const handleOpen = () => {
    setOpen(!open);
  };

  const clearAllHandler = () => {
    setSelected(null);

    if (!isAllEnabled) {
      setIsAllEnabled(!isAllEnabled);
      dispatch(clearAllCheckboxes());
    }
  };

  const btnName = (selected) => {
    if (selected?.length == 1) {
      return selected;
    } else if (selected?.length > 1) {
      return `${selected?.length} شهر`;
    } else {
      return "شهر";
    }
  };
  return (
    <>
      <Button
        onClick={handleOpen}
        variant="text"
        className="ml-1 flex justify-center ">
        <CiLocationOn strokeWidth={2} className="w-4 h-4 ml-1" />
        <span>{btnName(selected)}</span>
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        size="xs"
        animate={{
          mount: { scale: 1, y: 1 },
          unmount: { scale: 0.9, y: -100 },
        }}>
        <DialogHeader className="flex justify-between">
          <span> انتخاب شهر</span>
          {selected ? (
            <Button variant="text" color="red" onClick={clearAllHandler}>
              بازگشت
            </Button>
          ) : (
            ""
          )}
        </DialogHeader>
        <DialogBody>
          <ProvinceList
            selected={selected}
            setSelected={setSelected}
            isAllEnabled={isAllEnabled}
            setIsAllEnabled={setIsAllEnabled}
          />
        </DialogBody>
        <DialogFooter>
          <div className="w-full flex">
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="ml-2 w-full">
              <span>انصراف</span>
            </Button>
            <Button
              variant="gradient"
              color="green"
              disabled={selected ? false : true}
              onClick={handleOpen}
              className="w-full">
              <span>تایید</span>
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
    </>
  );
}
