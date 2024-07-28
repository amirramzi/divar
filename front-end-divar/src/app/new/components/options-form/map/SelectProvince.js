"use client";

import AutoComplete from "../AutoComplete";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  setCity,
  setProvinceLat,
  setProvinceLng,
} from "@/store/slice/provinceSlice";
import callApi from "@/services/callApi";

const SelectProvince = ({ setCityValue }) => {
  const province = useSelector((state) => state.province.list);
  const [value, setValue] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (province) {
      const defaultProvince = province.find((item) => item.id === 24);
      setValue(defaultProvince || null);
    }
  }, [province]);

  const handleChange = async (event, newValue) => {
    setValue(newValue);
    if (newValue && newValue.title) {
      const result = await callApi().get(`/province/cities/${newValue.id}`);
      dispatch(setCity(result.data));
      setCityValue(null);
      dispatch(setProvinceLng(newValue.longitude));
      dispatch(setProvinceLat(newValue.latitude));
    }
  };

  return (
    <div className="space-y-2">
      <span>استان</span>
      <AutoComplete
        value={value}
        handleChange={handleChange}
        options={province?.map((item) => ({ ...item, key: item.id }))}
        isOptionEqualToValue={(option, value) => option.id === value.id}
      />
    </div>
  );
};

export default SelectProvince;
