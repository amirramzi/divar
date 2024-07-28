"use client";
import { useSelector } from "react-redux";
import InputOption from "./options-form/InputOption";
import SelectOption from "./options-form/SelectOption";

const OptionList = ({ formik }) => {
  const options = useSelector((state) => state.createPost.option);

  return (
    <div className="flex flex-col space-y-6">
      {options?.map((item) => {
        switch (item?.type) {
          case "number":
          case "string":
            return (
              <InputOption
                key={item._id}
                label={item.title}
                id={item.key}
                value={formik.values[item.key]}
                error={formik.errors[item.key]}
                touched={formik.touched[item.key]}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
              />
            );
          case "array":
            return (
              <SelectOption
                key={item._id}
                label={item.title}
                id={item.key}
                enumList={item.enum}
                value={formik.values[item.key]}
                error={formik.errors[item.key]}
                touched={formik.touched[item.key]}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                setFieldTouched={formik.setFieldTouched}
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
