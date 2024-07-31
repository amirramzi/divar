"use client";

import DialogWrapper from "@/app/components/shared/DialogWrapper";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
const validationSchema = yup.object({
  title: yup
    .string("Enter your title")
    .required("Title is required")
    .min(5, "title should be of minimum 5 characters length"),
  subject: yup
    .string("Enter your password")
    .min(10, "subject should be of minimum 10 characters length")
    .required("Password is required"),
});
const SendSms = () => {
  const [open, setOpen] = useState(false);
  const formik = useFormik({
    initialValues: {
      title: "",
      subject: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  const dialogActions = (
    <Button variant="contained" type="submit">
      تایید
    </Button>
  );

  return (
    <div className="pl-10 pr-5 py-3 flex justify-between odd:bg-gray-300">
      <span>Message</span>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        onClick={() => setOpen(true)}
      >
        sms
      </Button>
      <DialogWrapper
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={formik.handleSubmit}
        title="ارسال پیامک به کاربران"
        actions={dialogActions}
      >
        <div className="flex flex-col w-[380px]">
          <TextField
            id="title"
            name="title"
            label="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            sx={{ marginTop: 5 }}
            id="subject"
            name="subject"
            label="subject"
            value={formik.values.subject}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.subject && Boolean(formik.errors.subject)}
            helperText={formik.touched.subject && formik.errors.subject}
          />
        </div>
      </DialogWrapper>
    </div>
  );
};

export default SendSms;
