"use client";
import { useSelector } from "react-redux";
import InputOption from "./options-form/InputOption";
import SelectOption from "./options-form/SelectOption";
import { memo } from "react";

const OptionList = ({ formik }) => {
  const options = useSelector((state) => state.createPost.option);

  const checkPrice = (key) =>
    key === "deposit" || key === "monthly_rent" || key === "price";

  return (
    <div className="flex flex-col space-y-6">
      {options?.map((item) => {
        const value = formik.values.options[item.title];
        const error = formik.errors.options?.[item.title];
        const touched = formik.touched.options?.[item.title];
        const isPrice = checkPrice(item.key);

        switch (item?.type) {
          case "number" || "string":
            return (
              <InputOption
                price={isPrice}
                type={item.type}
                key={item._id}
                label={item.title}
                id={item.title}
                value={value}
                error={error}
                touched={touched}
                handleChange={(e) =>
                  formik.setFieldValue(`options.${item.title}`, e.target.value)
                }
                handleBlur={() =>
                  formik.setFieldTouched(`options.${item.title}`, true)
                }
              />
            );

          case "array":
            return (
              <SelectOption
                key={item._id}
                label={item.title}
                id={item.title}
                enumList={item.enum}
                value={value}
                error={error}
                touched={touched}
                handleChange={(e) =>
                  formik.setFieldValue(`options.${item.title}`, e.target.value)
                }
                handleBlur={() =>
                  formik.setFieldTouched(`options.${item.title}`, true)
                }
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

export default memo(OptionList);
