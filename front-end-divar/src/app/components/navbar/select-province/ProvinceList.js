"use client";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, List, ListItemButton } from "@mui/material";
import {
  clearAllCheckboxes,
  enableAllCheckboxes,
  setCity,
  toggleCheckbox,
} from "@/store/slice/provinceSlice";
import CityList from "./CityList";
import callApi from "@/services/callApi";

const ProvinceList = ({
  selected,
  setSelected,
  isAllEnabled,
  setIsAllEnabled,
}) => {
  const province = useSelector((state) => state.province.list);
  const city = useSelector((state) => state.province.city);
  const dispatch = useDispatch();

  const getCity = async (id) => {
    try {
      const result = await callApi().get(`/province/cities/${id}`);
      const cities = result.data.map((item) => ({
        ...item,
        checked: false,
      }));
      dispatch(setCity(cities));
    } catch (error) {
      console.log(error);
    }
  };

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
    <Box
      sx={{
        width: 290,
        height: 400,
        maxWidth: 360,
        backgroundColor: "background.paper",
      }}
    >
      <List component="ul" aria-label="secondary mailbox folder">
        {selected ? (
          <>
            <div className="flex justify-end">
              <Button
                variant="outlined"
                size="sm"
                color={isAllEnabled ? "success" : "error"}
                onClick={handleToggleAll}
              >
                {isAllEnabled ? "انتخاب همه" : "حذف همه"}
              </Button>
            </div>
            {city.map((item) => (
              <CityList
                key={item._id}
                isChecked={item.checked}
                onChange={() => handleChange(item.title, item.id, item.checked)}
              >
                {item.title}
              </CityList>
            ))}
          </>
        ) : (
          province?.map((item) => (
            <ListItemButton
              key={item._id}
              selected={selected === item.title}
              onClick={() => setSelectedItem(item.title, item.id)}
            >
              <span className="text-black">{item.title}</span>
            </ListItemButton>
          ))
        )}
      </List>
    </Box>
  );
};

export default ProvinceList;
