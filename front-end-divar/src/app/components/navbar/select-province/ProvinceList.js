"use client";
import {
  clearAllCheckboxes,
  enableAllCheckboxes,
  setCity,
  setProvince,
  toggleCheckbox,
} from "@/store/slice/provinceSlice";
import { Button, Card, List, ListItem } from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CityList from "./CityList";
import { v4 as uuidv4 } from "uuid";

function ProvinceList({
  selected,
  setSelected,
  isAllEnabled,
  setIsAllEnabled,
}) {
  const province = useSelector((state) => state.province.list);
  const city = useSelector((state) => state.province.city);
  const dispatch = useDispatch();

  const getProvince = async () => {
    try {
      const result = await axios.get("http://localhost:3000/province");
      dispatch(setProvince(result.data));
    } catch (error) {
      console.log(error);
    }
  };

  const getCity = async (id) => {
    try {
      const result = await axios.get(`http://localhost:3000/province/${id}`);
      const cities = result.data.cities.map((name) => ({
        name,
        checked: false,
        id: uuidv4(),
      }));
      dispatch(setCity(cities));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProvince();
  }, []);

  const setSelectedItem = (value, id) => {
    setSelected([value]);
    getCity(id);
  };
  const handleChange = (name, id, checked) => {
    dispatch(toggleCheckbox(id));
    if (!checked) selected.push(name);
    if (checked) {
      let index = selected.findLastIndex((value) => value === name);
      setSelected(selected.toSpliced(index, 1));
    }
  };
  const handleToggleAll = () => {
    if (isAllEnabled) {
      dispatch(enableAllCheckboxes());
      setSelected(selected.concat(city.map((item) => item.name)));
    } else {
      dispatch(clearAllCheckboxes());
      setSelected(selected.toSpliced(1));
    }

    setIsAllEnabled(!isAllEnabled);
  };
  return (
    <List className="max-h-80 overflow-y-scroll">
      {selected ? (
        <>
          <div className="flex justify-end">
            <Button
              variant="outlined"
              size="sm"
              color={isAllEnabled ? "green" : "red"}
              onClick={handleToggleAll}>
              {isAllEnabled ? "انتخاب همه" : "حذف همه"}
            </Button>
          </div>
          <Card className="shadow-none">
            {city.map((item) => (
              <CityList
                key={item.id}
                isChecked={item.checked}
                onChange={() => handleChange(item.name, item.id, item.checked)}>
                {item.name}
              </CityList>
            ))}
          </Card>
        </>
      ) : (
        province.map((item) => (
          <ListItem
            className="my-2"
            key={uuidv4()}
            selected={selected === item.province}
            onClick={() => setSelectedItem(item.province, item._id)}>
            {item.province}
          </ListItem>
        ))
      )}
    </List>
  );
}

export default ProvinceList;
