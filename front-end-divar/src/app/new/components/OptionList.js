"use client";

import { useSelector } from "react-redux";
import InputOption from "./options-form/InputOption";
import SelectOption from "./options-form/SelectOption";

const OptionList = () => {
  const options = useSelector((state) => state.createPost.option);

  return (
    <div className="flex flex-col space-y-6">
      {options?.map((item) => {
        switch (item?.type) {
          case "number":
          case "string":
            return (
              <InputOption key={item._id} label={item.title} id={item.key} />
            );
          case "array":
            return (
              <SelectOption
                key={item._id}
                label={item.title}
                id={item.key}
                enumList={item.enum}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default OptionList;
