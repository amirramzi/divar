"use client";
import * as yup from "yup";
import { Button, List } from "@mui/material";
import { useFormik } from "formik";
import MapWrapper from "./options-form/map/MapWrapper";
import UploadImage from "./options-form/UploadImage";
import OptionList from "./OptionList";
import InputOption from "./options-form/InputOption";
import { useDispatch, useSelector } from "react-redux";
import { memo, useMemo } from "react";
import callApi from "@/services/callApi";
import { useRouter } from "next/navigation";
import {
  clearCategoryPost,
  setCategoryChild1,
  setCategoryChild2,
  setCategoryOption,
} from "@/store/slice/create-post-slice/createPostSlice";

const generateInitialValuesAndSchema = (
  options,
  address,
  lng,
  lat,
  categoryPost
) => {
  const optionInitialValue = options.reduce((initial, item) => {
    initial[item.title] = item.defaultValue || null;
    return initial;
  }, {});

  const optionValidationSchema = options.reduce((schema, item) => {
    let validator;
    switch (item.type) {
      case "number":
        validator = yup.string().nullable();
        break;
      case "string":
        validator = yup.string().nullable();
        break;
      case "array":
        validator = yup.string().nullable(); // Assuming array fields are handled as strings
        break;
      default:
        validator = yup.string().nullable();
    }
    if (item.required) {
      validator = validator.required(`وارد کردن ${item.title} الزامی است`);
    }
    schema[item.title] = validator;
    return schema;
  }, {});

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
    lng: lng || null,
    lat: lat || null,
    images: [],
    options: optionInitialValue,
    category: categoryPost,
  };
  const FILE_SIZE = 10 * 1024 * 1024; // 10 MB
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/webp",
    "image/png",
  ];
  const validationSchema = yup.object({
    title: yup
      .string()
      .min(3, "حداقل باید 3 حرف باشد")
      .required("عنوان آگهی الزامی است"),
    content: yup
      .string()
      .min(10, "حداقل باید 10 حرف باشد")
      .required("توضیحات آگهی الزامی است"),
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
    options: yup.object().shape(optionValidationSchema),
    images: yup
      .array()
      .max(5, "حداکثر 5 عکس میتوانید بارگذاری کنید")
      .test("fileSize", "حجم عکس باید کمتر از 10 مگابایت باشد", (files) =>
        files.every((file) => file.size <= FILE_SIZE)
      )
      .test("fileFormat", "Unsupported File Format", (files) =>
        files.every((file) => SUPPORTED_FORMATS.includes(file.type))
      ),
  });

  return { initialValues, validationSchema };
};

const PostForm = () => {
  const options = useSelector((state) => state.createPost.option);
  const { address, lng, lat } = useSelector((state) => state.addressCreatePost);
  const categoryPost = useSelector((state) => state.createPost.categoryPost);
  const router = useRouter();
  const dispatch = useDispatch();
  const { initialValues, validationSchema } = useMemo(() => {
    return generateInitialValuesAndSchema(
      options,
      address,
      lat,
      lng,
      categoryPost
    );
  }, [options, address]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const formData = new FormData();

      formData.append("title", values.title);
      formData.append("content", values.content);
      formData.append("address", JSON.stringify(values.address));
      formData.append("lng", values.lng);
      formData.append("lat", values.lat);
      formData.append("category", values.category);
      values.images.forEach((image) => {
        formData.append("images", image);
      });
      formData.append("options", JSON.stringify(values.options));

      try {
        const result = await callApi().post("/post/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(values);
        if (result.status == 200) {
          router.push("/my-divar/my-posts");
        }
      } catch (error) {
        console.error(error);
      }
    },
  });
  const backHandler = () => {
    dispatch(setCategoryChild1(null));
    dispatch(setCategoryChild2(null));
    dispatch(setCategoryOption(null));
    dispatch(clearCategoryPost());
    if (typeof window !== "undefined") {
      const currentState = JSON.parse(localStorage.getItem("createPostState"));
      currentState.child1 = null;
      currentState.child2 = null;
      currentState.option = null;
      currentState.categoryPost = [];
    }
    router.push("/new");
  };
  return (
    <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
      <List>
        <MapWrapper
          addressValue={formik.values.address}
          lngValue={formik.values.lng}
          latValue={formik.values.lat}
          error={formik.errors.address}
          touched={formik.touched.address}
          handleChange={(value) => formik.setFieldValue("address", value)}
          handleBlur={formik.handleBlur}
        />
        <UploadImage
          formik={formik}
          error={formik.errors.images}
          touched={formik.touched.images}
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
          <Button
            variant="outlined"
            color="error"
            className="!ml-4"
            onClick={backHandler}
          >
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

export default memo(PostForm);
