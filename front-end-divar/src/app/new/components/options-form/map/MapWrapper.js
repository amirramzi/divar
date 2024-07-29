"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import SelectCity from "./SelectCity";
import SelectProvince from "./SelectProvince";
const MyMap = dynamic(() => import("./MyMap"), { ssr: false });

const MapWrapper = ({
  addressValue = "",
  lngValue = "",
  latValue = "",
  error,
  touched,
  handleChange,
  handleBlur,
}) => {
  const [cityValue, setCityValue] = useState(null);
  return (
    <>
      <SelectProvince setCityValue={setCityValue} />
      <div className="pt-4">
        <SelectCity cityValue={cityValue} setCityValue={setCityValue} />
      </div>

      <MyMap />

      <input
        type="hidden"
        id="address"
        name="address"
        value={addressValue || ""}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <input type="hidden" id="lng" name="lng" value={lngValue || ""} />
      <input type="hidden" id="lat" name="lnt" value={latValue || ""} />

      {touched && error && <div className="text-red-600">{error}</div>}
    </>
  );
};

export default MapWrapper;
