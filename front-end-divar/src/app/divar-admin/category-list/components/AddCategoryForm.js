"use client";

import DialogWrapper from "@/app/components/shared/DialogWrapper";
import Message from "@/app/components/shared/Message";
import callApi from "@/services/callApi";
import { setCategoryParent } from "@/store/slice/CategoryAdminSlice";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";

const validationSchema = yup.object({
  name: yup
    .string("Enter category name")
    .min(3, "category name should be of minimum 3 characters length")
    .required("category name is required"),
  slug: yup
    .string("Enter category slug")
    .min(3, "category slug should be of minimum 3 characters length")
    .required("category slug is required"),
  icon: yup
    .string("Enter category icon")
    .min(3, "category icon should be of minimum 3 characters length")
    .required("category icon is required"),
});

const AddCategoryForm = ({ open, setOpen, selectedRow }) => {
  const [message, setMessage] = useState({ message: null, type: null });
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      slug: "",
      icon: selectedRow?.icon || "",
      parent: selectedRow?._id || null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const result = await callApi().post("/category", values, {
          headers: {
            Accept: "application/json",
          },
        });
        if (result.status == 201) {
          const categoryParent = await callApi().get("/post/new");
          dispatch(setCategoryParent(categoryParent?.data?.categories));
          setOpen(false);
          setMessage({ message: result.data.message, type: "success" });
        }
      } catch (error) {
        setMessage({
          message: error.response?.data?.message,
          type: "error",
        });
      }
    },
  });

  useEffect(() => {
    formik.setFieldValue("parent", selectedRow?._id || null);
    formik.setFieldValue("icon", selectedRow?.icon || "");
  }, [selectedRow]);

  const dialogActions = (
    <Button variant="contained" type="submit">
      تایید
    </Button>
  );

  return (
    <>
      <DialogWrapper
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={formik.handleSubmit}
        title={`ساخت دسته بندی جدید ${
          selectedRow ? `برای ${selectedRow?.name}` : ""
        }`}
        actions={dialogActions}
      >
        <div className="flex flex-col w-[380px]">
          <TextField
            id="name"
            name="name"
            label="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            sx={{ marginTop: 5 }}
            id="slug"
            name="slug"
            label="slug"
            value={formik.values.slug}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.slug && Boolean(formik.errors.slug)}
            helperText={formik.touched.slug && formik.errors.slug}
          />
          {selectedRow ? (
            <input value={selectedRow?.icon} readOnly hidden />
          ) : (
            <TextField
              sx={{ marginTop: 5 }}
              id="icon"
              name="icon"
              label="icon"
              value={formik.values.icon}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.icon && Boolean(formik.errors.icon)}
              helperText={formik.touched.icon && formik.errors.icon}
            />
          )}

          {selectedRow && <input value={selectedRow._id} readOnly hidden />}
        </div>
      </DialogWrapper>
      {message.message && (
        <Message message={message.message} variant={message.type} />
      )}
    </>
  );
};

export default AddCategoryForm;
