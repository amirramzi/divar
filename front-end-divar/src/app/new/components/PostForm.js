"use client";
import * as yup from "yup";
import { Button, List } from "@mui/material";
import { useFormik } from "formik";
import MapWrapper from "./options-form/map/MapWrapper";
import UploadImage from "./options-form/UploadImage";
import OptionList from "./OptionList";
import InputOption from "./options-form/InputOption";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const generateInitialValuesAndSchema = (options, address) => {
  const initialValues = {
    title: "",
    content: "",
    address: address || {
      province: null,
      city: null,
      formatted_address: null,
      neighbourhood: null,
      route_name: null,
    },
    images: [],
  };

  const validationSchema = {
    title: yup
      .string()
      .min(3, "طول عنوان آگهی نباید کمتر از ۳ حرف باشد")
      .required(),
    content: yup
      .string()
      .min(10, "طول توضیحات آگهی نباید کمتر از ۱۰ حرف باشد.")
      .required(),
    address: yup
      .object()
      .shape({
        province: yup.string().nullable(),
        city: yup.string().nullable(),
        formatted_address: yup.string().nullable(),
        neighbourhood: yup.string().nullable(),
        route_name: yup.string().nullable(),
      })
      .test(
        "at-least-one-key",
        "انتخاب آدرس آگهی الزامی است",
        (value) =>
          value &&
          Object.values(value).some((val) => val !== null && val !== "")
      ),
    images: yup.array(),
  };

  options.forEach((item) => {
    initialValues[item.key] = "";
    validationSchema[item.key] = yup
      .string()
      .required(`وارد کردن ${item.title} الزامی است`);
  });

  return { initialValues, validationSchema: yup.object(validationSchema) };
};

const PostForm = () => {
  const options = useSelector((state) => state.createPost.option);
  const address = useSelector((state) => state.createPost.address);
  const [initialValues, setInitialValues] = useState({});
  const [validationSchema, setValidationSchema] = useState(yup.object({}));

  useEffect(() => {
    const { initialValues, validationSchema } = generateInitialValuesAndSchema(
      options,
      address
    );
    setInitialValues(initialValues);
    setValidationSchema(validationSchema);
  }, [options, address]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <List>
        <MapWrapper
          value={formik.values.address}
          error={formik.errors.address}
          touched={formik.touched.address}
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
        />
        <UploadImage
          value={formik.values.images}
          error={formik.errors.images}
          touched={formik.touched.images}
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
        />
        <OptionList formik={formik} />
        <div className="py-6 space-y-6">
          <InputOption
            label="عنوان آگهی"
            id="title"
            value={formik.values.title}
            error={formik.errors.title}
            touched={formik.touched.title}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
          />
          <InputOption
            label="توضیحات آگهی"
            id="content"
            multiline
            rows={4}
            value={formik.values.content}
            error={formik.errors.content}
            touched={formik.touched.content}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
          />
        </div>
        <div className="flex justify-end">
          <Button variant="outlined" color="error" className="!ml-4">
            انصراف آگهی
          </Button>
          <Button variant="contained" color="primary" type="submit">
            ثبت آگهی
          </Button>
        </div>
      </List>
    </form>
  );
};

export default PostForm;
