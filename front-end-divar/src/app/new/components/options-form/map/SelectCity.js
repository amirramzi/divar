"use client";

import AutoComplete from "../AutoComplete";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { setProvinceLat, setProvinceLng } from "@/store/slice/provinceSlice";

const SelectCity = ({ cityValue, setCityValue }) => {
  const city = useSelector((state) => state.province.city);

  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setCityValue(newValue);
    if (newValue && newValue.title) {
      dispatch(setProvinceLng(newValue.longitude));
      dispatch(setProvinceLat(newValue.latitude));
    }
  };

  return (
    <div className="space-y-2">
      <span>شهر</span>
      <AutoComplete
        value={cityValue}
        handleChange={handleChange}
        options={city?.map((item) => ({ ...item, key: item._id }))}
        isOptionEqualToValue={(option, value) => option._id === value._id}
      />
    </div>
  );
};

export default SelectCity;
