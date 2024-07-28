"use client";
import { setAddress, setLat, setLng } from "@/store/slice/createPostSlice";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import FindMyAddress from "./FindMyAddress";

export default function LocationInput({
  saveAddress,
  setSaveAddress,
  cancelAddress,
  setCancelAddress,
  markerPosition,
}) {
  const dispatch = useDispatch();
  const address = useSelector((state) => state.createPost.address);
  const setAddressHandler = async () => {
    dispatch(setLng(markerPosition.lng));
    dispatch(setLat(markerPosition.lat));
    // const newAddress = await FindMyAddress(
    //   markerPosition.lng,
    //   markerPosition.lat
    // );
    // dispatch(
    //   setAddress({
    //     province: newAddress.state,
    //     city: newAddress.city,
    //     formatted_address: newAddress.formatted_address,
    //     neighbourhood: newAddress.neighbourhood,
    //     route_name: newAddress.route_name,
    //   })
    // );
    setSaveAddress(false);
    setCancelAddress(true);
  };
  const setCancelAddressHandler = () => {
    setCancelAddress(false);
    setAddress({
      state: null,
      city: null,
      formatted_address: null,
      neighbourhood: null,
      route_name: null,
    });
  };
  return (
    <>
      <div
        className={`w-full my-4 bg-gray-800  justify-between items-center px-4 py-2 rounded-md ${
          saveAddress ? "flex" : "hidden"
        }`}
      >
        <span>آیا میخواهید آگهی شما در این مکان ثبت شود؟</span>
        <Button
          color="primary"
          variant="contained"
          size="small"
          onClick={setAddressHandler}
        >
          تایید
        </Button>
      </div>
      <div
        className={`w-full my-4 bg-gray-800  justify-between items-center px-4 py-2 rounded-md ${
          cancelAddress ? "flex" : "hidden"
        }`}
      >
        <span>آگهی شما در {address.neighbourhood} ثبت شد</span>
        <Button
          color="error"
          variant="contained"
          size="small"
          onClick={setCancelAddressHandler}
        >
          لغو
        </Button>
      </div>
    </>
  );
}
// city
// :
// "تهران"
// county
// :
// "شهرستان تهران"
// district
// :
// "بخش مرکزی شهرستان تهران"
// formatted_address
// :
// "تهران، بزرگراه علامه جعفری، شقایق، ششم پرواز"
// in_odd_even_zone
// :
// false
// in_traffic_zone
// :
// false
// municipality_zone
// :
// "5"
// neighbourhood
// :
// "سازمان برنامه شمالی"
// place
// :
// null
// route_name
// :
// "ششم پرواز"
// route_type
// :
// "residential"
// state
// :
// "استان تهران"
// status
// :
// "OK"
// village
// :
// null
// // :
// // "تهران"
// // county
// // :
// // "شهرستان تهران"
// // district
// // :
// // "بخش مرکزی شهرستان تهران"
// // formatted_address
// // :
// // "تهران، بزرگراه شهید همت، جنت آباد جنوبی، چهار باغ شرقی"
// // in_odd_even_zone
// // :
// // false
// // in_traffic_zone
// // :
// // false
// // municipality_zone
// // :
// // "5"
// // neighbourhood
// // :
// // "جنت‌ آباد جنوبی"
// // place
// // :
// // null
// // route_name
// // :
// // "چهار باغ شرقی"
// // route_type
// // :
// // "secondary"
// // state
// // :
// // "استان تهران"
// // status
// // :
// // "OK"
// // village
// // :
// // null
