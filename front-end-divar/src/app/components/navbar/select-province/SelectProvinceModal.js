"use client";

import { useDispatch } from "react-redux";
import ProvinceList from "./ProvinceList";
import DialogWrapper from "../../shared/DialogWrapper";
import { Button } from "@mui/material";
import { useState } from "react";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import { clearAllCheckboxes } from "@/store/slice/provinceSlice";

const SelectProvinceModal = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isAllEnabled, setIsAllEnabled] = useState(true);
  const dispatch = useDispatch();
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
  //cancel select city or province and call all post
  const cancelHandler = () => {
    setSelected(null);
    setOpen(false);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setOpen(false);
  };
  const actionsButton = (
    <>
      <Button
        variant="text"
        color="error"
        className="!ml-3"
        onClick={cancelHandler}
      >
        انصراف
      </Button>
      <Button variant="contained" type="submit">
        تایید
      </Button>
    </>
  );
  const headerAction = (
    <Button variant="text" color="error" onClick={clearAllHandler}>
      بازگشت
    </Button>
  );
  return (
    <>
      <Button
        variant="outlined"
        className="!ml-4"
        onClick={() => setOpen(true)}
      >
        <FmdGoodOutlinedIcon fontSize="small" />
        <span className="mr-1">{btnName(selected)}</span>
      </Button>
      <DialogWrapper
        title="انتخاب شهر"
        open={open}
        onSubmit={submitHandler}
        onClose={() => setOpen(false)}
        actions={actionsButton}
        headerAction={selected && headerAction}
      >
        <ProvinceList
          selected={selected}
          setSelected={setSelected}
          isAllEnabled={isAllEnabled}
          setIsAllEnabled={setIsAllEnabled}
        />
      </DialogWrapper>
    </>
  );
};

export default SelectProvinceModal;
