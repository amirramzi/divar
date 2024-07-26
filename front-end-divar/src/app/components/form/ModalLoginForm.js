import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  Button,
  DialogContentText,
  InputAdornment,
  TextField,
} from "@mui/material";
import {
  closeLoginModal,
  openLoginModal,
  openTwoStepModal,
  setPhone,
} from "@/store/slice/loginSlice";
import { VscAccount } from "react-icons/vsc";

import ModalStepTwoForm from "./ModalStepTwoForm";
import Message from "../shared/Message";
import DialogWrapper from "../shared/DialogWrapper";

const phoneRegExp = /^(0|0098|\+98||)9(0[1-5]|[1 3]\d|2[0-2]|98)\d{7}$/;

const validationSchema = yup.object().shape({
  mobile: yup
    .string()
    .matches(phoneRegExp, "شماره موبایل شما درست نیست")
    .required("شماره موبایل را وارد کنید"),
});

const ModalLoginForm = () => {
  const dispatch = useDispatch();
 
  const { loginModal, phone } = useSelector((state) => state.login);

  const handleClickOpen = () => {
    if (!phone) {
      dispatch(openLoginModal());
    } else {
      dispatch(closeLoginModal());
      dispatch(openTwoStepModal());
    }
  };

  const handleClose = () => {
    dispatch(closeLoginModal());
  };

  const formik = useFormik({
    initialValues: {
      mobile: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setStatus }) => {
      try {
        if (!phone) {
          const result = await axios.post(
            "http://localhost:3000/auth/send-otp",
            values
          );
          if (result.status === 200) {
            setStatus({ message: result.data.message, variant: "success" });
            dispatch(setPhone(values.mobile));
            dispatch(closeLoginModal());
            dispatch(openTwoStepModal());
          }
        } else {
          dispatch(closeLoginModal());
          dispatch(openTwoStepModal());
        }
      } catch (error) {
        setStatus({ message: "خطا در ارسال کد ", variant: "error" });
        console.log("error");
      }
    },
  });

  const dialogActions = (
    <Button variant="contained" type="submit">
      تایید
    </Button>
  );

  return (
    <>
      <Button
        variant="text"
        onClick={handleClickOpen}
        startIcon={<VscAccount className="w-5 h-5 ml-3" />}>
        دیوار من
      </Button>
      <DialogWrapper
        open={loginModal}
        onClose={handleClose}
        onSubmit={formik.handleSubmit}
        title="ورود به حساب کاربری"
        actions={dialogActions}>
        <DialogContentText className="text-gray-400 py-8">
          برای استفاده از امکانات دیوار، لطفاً شمارهٔ موبایل خود را وارد کنید.
          <br />
          کد تأیید به این شماره پیامک خواهد شد.
        </DialogContentText>
        <div>
          <TextField
            autoFocus
            fullWidth
            dir="ltr"
            placeholder="شماره همراه"
            margin="dense"
            id="mobile"
            name="mobile"
            type="text"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+98</InputAdornment>
              ),
            }}
            value={formik.values.mobile}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
          />
          {formik.errors.mobile ? (
            <div className="text-xs text-red-700  py-1">
              {formik.errors.mobile}
            </div>
          ) : null}
        </div>
        <div className="pt-4">
          <Button variant="text" color="error">
            شرایط استفاده از خدمات
          </Button>
          <span className="px-1">و</span>
          <Button variant="text" color="error">
            حریم خصوصی
          </Button>
          <span className="px-1">دیوار را می پذیرم.</span>
        </div>
      </DialogWrapper>

      {formik.values && <ModalStepTwoForm mobile={formik.values.mobile} />}
      {formik.status && (
        <Message
          key={formik.status.message}
          message={formik.status.message}
          variant={formik.status.variant}
        />
      )}
    </>
  );
};

export default ModalLoginForm;
