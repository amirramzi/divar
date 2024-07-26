"use client";
import * as React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { DialogContentText, Button } from "@mui/material";
import { closeTwoStepModal, openLoginModal } from "@/store/slice/loginSlice";
import Message from "../shared/Message";
import PinCodeInput from "./PinCodeInput";
import TimerStepTwoBtn from "./TimerStepTwoBtn";
import DialogWrapper from "../shared/DialogWrapper";
import { setUser } from "@/store/slice/authSlice";

const validationSchema = yup.object().shape({
  code: yup
    .string()
    .required("کد تأیید را وارد کنید")
    .length(5, "کد تأیید باید 5 رقمی باشد"),
});

export default function ModalStepTwoForm({ mobile }) {
  const twoStepModal = useSelector((state) => state.login.twoStepModal);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeTwoStepModal());
  };
  const changeMobileHandler = () => {
    dispatch(closeTwoStepModal());
    dispatch(openLoginModal());
  };
  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: validationSchema,
    onSubmit: async ({ code }, { setStatus }) => {
      try {
        const result = await axios.post(
          "http://localhost:3000/auth/check-otp",
          { mobile, code },
          { withCredentials: true }
        );
        if (result.status === 200) {
          setStatus({ message: result.data.message, variant: "success" });
          dispatch(setUser(mobile));
          dispatch(closeTwoStepModal());
        }
      } catch (error) {
        setStatus({ message: "خطا در ارسال کد", variant: "error" });
        console.log(error);
      }
    },
  });

  const dialogActions = (
    <>
      <TimerStepTwoBtn mobile={mobile} />
      <Button variant="contained" type="submit">
        تایید
      </Button>
    </>
  );

  return (
    <React.Fragment>
      <DialogWrapper
        open={twoStepModal}
        onClose={handleClose}
        onSubmit={formik.handleSubmit}
        title="کد تأیید را وارد کنید"
        actions={dialogActions}>
        <DialogContentText className="text-gray-400 py-8">
          کد پیامک‌ شده به شماره «{mobile}» را وارد کنید.
        </DialogContentText>

        <div>
          <PinCodeInput
            value={formik.values.code}
            onChange={(val) => formik.setFieldValue("code", val)}
            onBlur={formik.handleBlur}
            error={Boolean(formik.errors.code) || formik.touched.code}
          />
          <div className="w-full  flex justify-between  px-4 pt-2">
            {formik.errors.code ? (
              <div className="text-xs text-red-700 px-4 pt-2">
                {formik.errors.code}
              </div>
            ) : (
              <span></span>
            )}
            <Button onClick={changeMobileHandler} color="info">
              تغییر شماره
            </Button>
          </div>
        </div>
      </DialogWrapper>
      {formik.status && (
        <Message
          key={formik.status.message}
          message={formik.status.message}
          variant={formik.status.variant}
        />
      )}
    </React.Fragment>
  );
}
